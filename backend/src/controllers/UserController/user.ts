import Stripe from "stripe"
import { PrismaPromise, User, UserEmailRequests } from "@prisma/client"
import { Request, Response } from "express"
import crypto from "crypto"

import prisma from "../../libs/prisma"
import hashValue from "../../utils/hashString"
import { existsOrNot, iqualOrNot } from "../../validations"
import { sendConfEmail } from "../../utils/sendEmail"
import { createToken } from "./Auth/token"
import dayjs from "dayjs"
import { sendEmailQueue } from "../../libs/queue"
import { error500Msg, sendEmailErrorMsg } from "../../utils/msgs"

export const postUser = async (req: Request, res: Response) => {
  const { email, name, password, nickname, confPassword }: User & { confPassword: string } = req.body
  try {
    try {
      existsOrNot(name, "Nome de usuário inválido!", "Username")
      existsOrNot(email, "Email do usuário inválido!", "Email")
      existsOrNot(nickname, "Nick de usuário inválido!", "Nickname")
      existsOrNot(password, "Senha inválida!", false)

      iqualOrNot(password, confPassword, "As senhas não conferem!")

      if (password.trim().length < 6) throw "A Senha deve conter pelo menos 6 caracteres!"

      const emailExists = await prisma.user.findUnique({ where: { email } })
      const nicknameExists = await prisma.user.findUnique({ where: { nickname } })

      if (emailExists) return res.status(400).json({ type: "error", response: "E-mail existente!!" })
      if (nicknameExists) return res.status(400).json({ type: "error", response: "Nickname existente!!" })

    } catch (e) {
      return res.status(400).send({ type: "error", response: e })
    }

    const encryptedPassword: string = hashValue(password)

    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        name: name.trim(),
        password: encryptedPassword,
        nickname: nickname.trim(),
        privacity: {
          create: {
            friendList: "PUBLIC",
            gamesPrivacy: "PUBLIC",
            groupList: "PUBLIC"
          }
        }
      }
    })

    const sendEmail = await sendConfEmail(user.id, user.email)

    if (sendEmail) {
      return res.status(201).json({ type: "success", response: user })
    } else {
      return res.status(400).json({ type: "error", response: sendEmailErrorMsg })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const SendConfEmail = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.confEmail)
      return res.status(400).json({ type: "success", respomse: error500Msg })

    const sendEmail = await sendConfEmail(user.id, user.email)

    if (sendEmail) {
      return res.status(201).json({ type: "success", response: user })
    } else {
      return res.status(400).json({ type: "error", response: sendEmailErrorMsg })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const sendNewEmail = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(500).json({ type: "error", response: error500Msg });

    const lastEmail = await prisma.userEmailRequests.findFirst({ where: { AND: [{ userId }, { actived: true }] } })
    if (lastEmail) {
      await prisma.userEmailRequests.update({ where: { id: lastEmail.id }, data: { actived: false } });
    }

    sendConfEmail(user.id, user.email)
      .then((sendEmail) => {
        if (sendEmail) {
          return res.status(200).json({ type: "success", response: "OK" });
        } else {
          return res.status(400).json({ type: "error", response: sendEmailErrorMsg });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ type: "error", response: error500Msg });
      });
  } catch (e) {
    return res.status(500).json({ type: "error", response: error500Msg });
  }
}

export const confEmail = async (req: Request, res: Response) => {
  const { code }: UserEmailRequests = req.body;
  const userId = req.params.userId

  try {
    const userAlredyExists = await prisma.user.findUnique({ where: { id: userId } })
    if (!userAlredyExists) return res.status(500).json({ type: "error", response: error500Msg })

    const emailRequest = await prisma.userEmailRequests.findFirst({
      where: { AND: [{ userId }, { actived: true }] }
    })

    if (!emailRequest) return res.status(400).json({ type: "error", response: "Nenhuma requesição com este email achada" })

    const currentDate = new Date()
    if (currentDate > emailRequest.expiresIn) return res.status(404).json({ type: "error", response: "Código expirado!" })

    if (emailRequest.code !== code) {
      return res.status(404).json({ type: "error", response: "Código inválido" })
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        confEmail: true
      }
    })

    const token = createToken(userId)
    const expiresIn = dayjs().add(3, "milliseconds").unix()
    await prisma.refreshToken.deleteMany({ where: { userId: userId } })

    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        userId: userId,
        expiresIn
      }
    })

    return res.status(200).json({ type: "success", response: { token, refreshToken: newRefreshToken } })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const GetUserByRecoverKey = async (req: Request, res: Response) => {
  const { key } = req.params

  if (!key) return res.status(400).json({ type: "error", response: "Chave inválida" })

  try {
    const user = await prisma.user.findFirst({ where: { recoverKey: key } })
    if (!user) return res.status(400).json({ type: "error", response: "Chave inválida" })

    return res.status(200).json({ type: "success", response: user })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const RecoverPasswordEmail = async (req: Request, res: Response) => {
  const email = req.body.email

  if (!email) return res.status(400).json({ type: "error", response: "Email Inválido" })

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ type: "error", response: "E-email não encontrado" })

    const key = crypto.randomBytes(16).toString("hex")

    await prisma.user.update({
      where: { id: user.id },
      data: { recoverKey: key }
    })

    await sendEmailQueue.add("recover_password", { email, key })

    return res.status(200).json({ type: "success", response: "E-mail enviado com sucesso!!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      cart: true,
      favorites: true,
      userAchievements: {
        select: { achievement: true }
      },
      image: { select: { name: true, originalName: true, url: true, size: true } }
    },

  })
  return res.status(200).json({ type: "success", response: users })
}

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const token = req.body.token
  let user: null | User = null
  try {
    const getUserProfile = async () => {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          image: true,
          privacity: true
        }
      });
    }

    const getGamesAndAchievements = async () => {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          games: {
            where: { status: "ACEPTED" },
            include: {
              achievements: true,
              horizontalCap: true,
              verticalCap: true
            },
            take: 3,
          },
          favorites: { include: { horizontalCap: true, achievements: { include: { image: true } } } },
          wishList: { include: { horizontalCap: true } },
          userAchievements: { select: { achievement: { include: { image: true } } } }
        }
      });
    }

    const getGroups = async () => {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          groups: { include: { image: true, users: true } },
          adminGroups: { include: { image: true, users: true } }
        }
      });
    }

    const getFriends = async (): Promise<any> => {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          friends: { include: { user: { include: { image: true } } } }
        }
      });
    }
    let [userProfile, gamesAndAchievements, groups, friends] = await Promise.all([
      getUserProfile(),
      getGamesAndAchievements(),
      getGroups(),
      getFriends()
    ]);

    if (!userProfile || !gamesAndAchievements || !groups || !friends) {
      return res.status(404).json({ type: "error", response: "Perfil não encontrado" });
    }

    friends = friends.friends.map((friend: any) => ({ ...friend.user }))

    const { privacity } = userProfile;

    const profile = {
      ...userProfile,
      ...gamesAndAchievements,
      ...groups,
      ...friends
    }

    if (token && token.userId) {
      const tokenUserId = token.userId
      user = await prisma.user.findUnique({
        where: { id: tokenUserId }
      })

      if (user && user.id === userProfile.id) {
        return res.status(200).json({ type: "success", response: profile })
      }
    }

    if (privacity) {
      if (privacity.friendList === "PRIVATE") delete profile.friends;
      if (privacity.gamesPrivacy === "PRIVATE") {
        delete profile.games;
        delete profile.favorites;
        delete profile.wishList;
        delete profile.userAchievements;
      }
      if (privacity.groupList === "PRIVATE") {
        delete profile.groups;
        delete profile.adminGroups;
      }
    }

    if (user !== null) {
      const userIsFriend = friends.find((u: any) => u.id === user!.id);

      if (friends && privacity?.friendList === "FRIENDS" && !userIsFriend) {
        delete profile.friends;
      }

      if (profile.games && privacity?.gamesPrivacy === "FRIENDS" && !userIsFriend) {
        delete profile.games;
        delete profile.favorites;
        delete profile.wishList;
        delete profile.userAchievements;
      }

      if (profile.groups && privacity?.groupList === "FRIENDS" && !userIsFriend) {
        delete profile.groups;
        delete profile.adminGroups;
      }
    }
    return res.status(200).json({ type: "success", response: profile })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

interface UpdateUserType extends User {
  description?: string | null
  token?: { userId: string }
}

export const updateUser = async (req: Request, res: Response) => {
  const userData: UpdateUserType = req.body

  // const confPassword = req.body.confPassword
  const userId = req.body.token.userId

  try {

    try {
      existsOrNot(userData.name, "Nome de usuário inválido!", "Username")
      existsOrNot(userData.email, "Email do usuário inválido!", "Email")
      existsOrNot(userData.nickname, "Nick de usuário inválido!", "Nickname")

      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) throw "Algo deu errado, tente novamente mais tarde!!"

      const existsEmailOrNickname = await prisma.user.findFirst({
        where: {
          AND: [{
            OR: [{ email: { equals: userData.email } }, { nickname: userData.nickname }],
            id: { not: { equals: userId } }
          }]
        }
      })
      if (existsEmailOrNickname) {
        if (existsEmailOrNickname.nickname === userData.nickname) throw "Nickname já em uso!"
        else if (existsEmailOrNickname.email === userData.email) throw "E-mail já em uso!"
      }
    } catch (e) {
      return res.status(400).json({ type: "error", response: e })
    }

    // userData.password = hashValue(userData.password)

    if (userData.token !== undefined) {
      delete userData.token
    }

    delete userData.description

    const putUser = await prisma.user.update({
      where: { id: userId },
      data: { ...userData },
      select: {
        bio: true,
        nickname: true,
        age: true,
        name: true,
        email: true
      }
    })

    return res.status(200).json({ type: "success", response: putUser })
  } catch (err) {
    return res.status(500).json({ type: "error", resposne: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const updateUserPrivacy = async (req: Request, res: Response) => {
  const { friendList, gamesPrivacy, groupList } = req.body
  const userId = req.body.token.userId


  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    if (friendList !== "FRIENDS" && friendList !== "PUBLIC" && friendList !== "PRIVATE")
      return res.status(400).json({ type: "error", response: "Opção de privacidade da lista de amigos inválida!!" })

    if (gamesPrivacy !== "FRIENDS" && gamesPrivacy !== "PUBLIC" && gamesPrivacy !== "PRIVATE")
      return res.status(400).json({ type: "error", response: "Opção de privacidade dos jogos inválida!!" })

    if (groupList !== "FRIENDS" && groupList !== "PUBLIC" && groupList !== "PRIVATE")
      return res.status(400).json({ type: "error", response: "Opção de privacidade da lista de grupos inválida!!" })

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { privacity: { update: { friendList, gamesPrivacy, groupList } } },
      include: { privacity: true }
    })

    return res.status(200).json({ type: "success", response: updatedUser })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const updateUserPassword = async (req: Request, res: Response) => {
  const { newPassword, confPassword, key, userId }: { password: string, newPassword: string, confPassword: string, key: string, userId: string }
    = req.body

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return res.status(400).json({ type: "error", response: error500Msg })
    if (user.recoverKey !== key) return res.status(400).json({ type: "error", response: "Chave inválida!" })

    try {
      iqualOrNot(newPassword, confPassword, "As senhas não conferem")
    } catch (e) {
      return res.status(400).json({ type: "error", response: e })
    }

    const newPasswordHash: string = hashValue(newPassword)

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: newPasswordHash,
        recoverKey: null
      }
    })
    return res.status(200).json({ type: "success", response: "Senha atualizada com sucesso!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const GetDetails = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const token = req.body.token

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        image: true,
        privacity: true,
        games: {
          where: { users: { some: { id: userId } }, status: "ACEPTED" },
          include: { horizontalCap: true, achievements: { include: { image: true } } }
        },
        favorites: { where: { status: "ACEPTED" }, include: { horizontalCap: true, achievements: { include: { image: true } } } },
        userAchievements: {
          select: { achievement: { include: { image: true } } }
        },
        gamesAvaliations: { include: { game: { include: { horizontalCap: true } } }, where: { game: { status: "ACEPTED" }, deleted: false } },
        friends: { include: { user: { include: { image: true } } } },
        groups: { include: { image: true } },
        adminGroups: { include: { image: true } }
      }
    });

    if (user) {
      const userIsPrivate = user.privacity!.gamesPrivacy === "PRIVATE"
      const isUserFriendsOnly = user.privacity!.gamesPrivacy === "FRIENDS"
      const tokenUserId = token ? token.userId : false
      const userIsFriend = token ? user.friends.some(f =>
        f.friendId === tokenUserId || f.userId === tokenUserId
      ) : false

      const GetDetails = async () => {
        let {
          games,
          favorites,
          userAchievements,
          gamesAvaliations,
          friends,
          groups: userInGroups,
          adminGroups
        } = user

        const groups = adminGroups.concat(userInGroups)

        const achievements = userAchievements.map(e => e.achievement)

        return { games, favorites, achievements, avaliations: gamesAvaliations, friends, groups, user }
      }

      if (tokenUserId) {
        if (tokenUserId !== userId) {
          if (userIsPrivate) {
            return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
          } else if (isUserFriendsOnly) {
            if (userIsFriend) {
              let details = await GetDetails()
              details.friends = details.friends.map((f: any) => f.user)
              return res.status(200).json({ type: "success", response: details })
            } else {
              return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
            }
          }
        } else {
          let details = await GetDetails()
          details.friends = details.friends.map((f: any) => f.user)
          return res.status(200).json({ type: "success", response: details })
        }
      } else if (userIsPrivate || isUserFriendsOnly) {
        return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
      }
      let details = await GetDetails()
      details.friends = details.friends.map((f: any) => f.user)
      return res.status(200).json({ type: "success", response: details })
    } else {
      return res.status(400).json({ type: "error", response: "Usuário não encontrado" })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const Social = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        friends: { select: { user: { include: { image: true } } } },
        blocks: { select: { blockedUser: { include: { image: true } } } },
        UserBlockId: { select: { blockedUser: { include: { image: true } } } },
        groups: { include: { image: true } },
        groupRequests: { select: { date: true, group: { include: { image: true } } }, where: { status: { equals: "PENDING" } } },
        friendRequestsReceived: { include: { sender: { include: { image: true } } }, where: { status: "PENDING" } },
        friendRequestsSent: { include: { receiver: { include: { image: true } } }, where: { status: "PENDING" } },
        adminGroups: { include: { image: true } }
      }
    })


    const data = {
      friends: user?.friends.map(f => f.user),
      blockedByUsers: user?.blocks.map(f => f.blockedUser),
      userBlocks: user?.UserBlockId.map(b => b.blockedUser),
      groupRequests: user?.groupRequests.map(f => ({ date: f.date, group: f.group })),
      friendRequestsReceived: user?.friendRequestsReceived,
      friendRequestsSent: user?.friendRequestsSent,
      adminGroups: user?.adminGroups,
      groups: user?.groups
    }


    if (user) {
      return res.status(200).json({ type: "success", response: data })
    } else {
      return res.status(400).json({ type: "error", response: "Usuário não encontrado" })
    }

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const Edit = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: { include: { horizontalCap: true } },
        games: { include: { horizontalCap: true } },
        image: true,
        privacity: true
      }
    })

    if (user) {
      return res.status(200).json({ type: "success", response: user })
    } else {
      return res.status(400).json({ type: "error", response: "Usuário não encontrado" })
    }

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const SearchUsers = async (req: Request, res: Response) => {
  const nickname = req.params.nickname

  try {
    const users = await prisma.user.findMany({
      where: { nickname: { mode: "insensitive", contains: nickname } },
      include: { image: true }
    })

    return res.status(200).json({ type: "success", response: users })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const PostCreditCard = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const { cvc, cardNumber, expYear, expMonth } = req.body
  const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: "2023-10-16"
  })
  try {
    const result = await stripe.paymentMethods.create({
      type: "card",
      card: {
        exp_month: expMonth,
        exp_year: expYear,
        number: cardNumber,
        cvc: cvc
      }
    })
    return true;
  } catch (error: any) {
    return false;
  }
}

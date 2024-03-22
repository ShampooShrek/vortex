import { homedir } from 'os';
import { exec } from "child_process"
import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import path from "path"
import { downloadFile } from '../../utils/downloadFile';
import { error500Msg, noAuthorizationMsg } from '../../utils/msgs';

export const userConnectAchievement = async (req: Request, res: Response) => {
  const achievementId = Number(req.params.achievementId)
  const userId = req.params.userId

  try {
    const achievement = await prisma.gameAchievements.findUnique({ where: { id: achievementId } })
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { games: true } })

    if (!achievement || !user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const userHaveGame = user.games.some(game => game.id === achievement.gameId)

    if (!userHaveGame)
      return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.usersAndAchievements.create({
      data: {
        achievementId,
        userId
      }
    })
    return res.status(200).send({ type: "error", response: "Conquista Adicionada" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getUserAchievements = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const gameId = Number(req.params.gameId)
  const token = req.body.token

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { privacity: true, friends: true },
    });

    if (!user) {
      return res.status(404).json({ type: "error", response: "Perfil não encontrado" });
    }

    const isTokenProvided = !!token
    const isUserPrivate = user.privacity?.gamesPrivacy === "PRIVATE"
    const isUserFriendsOnly = user.privacity?.gamesPrivacy === "FRIENDS"
    const isUserFriend = token ? user.friends.some(friend =>
      friend.friendId === token?.userId || friend.userId === token?.userId
    ) : false

    const getAchievements = async () => {
      const achievements = await prisma.usersAndAchievements.findMany({
        where: { userId, achievement: { gameId } },
        select: {
          dateConquist: true,
          achievement: { include: { image: true } },
        },
      })

      const game = await prisma.games.findFirst({
        where: { id: gameId, users: { some: { id: userId } } },
        include: { achievements: { include: { image: true } }, imageCap: true },
      })

      if (!game) {
        return res.status(400).json({ type: "error", response: "O usuário não tem esse jogo" })
      }

      return { achievements, game }
    }

    if (isTokenProvided) {
      if (token.userId !== userId) {
        if (isUserPrivate) {
          return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
        } else if (isUserFriendsOnly && !isUserFriend) {
          return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
        } else {
          const achievements = await getAchievements()
          return res.status(200).send({ type: "success", response: achievements })
        }
      } else {
        const achievements = await getAchievements()
        return res.status(200).send({ type: "success", response: achievements })
      }
    } else if ((isUserPrivate || isUserFriendsOnly)) {
      return res.status(401).json({ type: "error", response: "Conta do usuário privada!" })
    }

    const achievements = await getAchievements()
    return res.status(200).send({ type: "success", response: achievements })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


export const disconnectAchievement = async (req: Request, res: Response) => {
  const achievementId = Number(req.params.achievementId)
  const userId = req.params.userId

  try {
    await prisma.usersAndAchievements.deleteMany({
      where: {
        AND: [{ achievementId }, { userId }]
      }
    })
    return res.status(200).send({ type: "error", response: "OK!!" })
  } catch (err) {
    return res.status(400).json({ type: "error", response: error500Msg })
  }


}

export const connectGame = async (req: Request, res: Response) => {
  try {
    const userId = req.body.token.userId
    const gameId = Number(req.params.gameId)

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user) return res.status(400).json({ type: "error", respomse: "Usuário não encontrado!" })
    if (!game) return res.status(400).json({ type: "error", response: "Jogo não encontrado!" })

    await prisma.user.update({
      where: { id: userId },
      data: { games: { connect: { id: gameId } } }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const GetGamesBox = async (req: Request, res: Response) => {
  const { userId } = req.body.token

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        gamesBoxs: {
          include: {
            games: {
              include: {
                horizontalCap: true,
                verticalCap: true,
                arquive: true,
                gameIconImage: true,
                gameBackgroundImage: true,
                UserGameStatus: { where: { userId } },
              }
            }
          }
        },
        games: {
          include: {
            horizontalCap: true,
            verticalCap: true,
            arquive: true,
            gameIconImage: true,
            gameBackgroundImage: true,
            UserGameStatus: { where: { userId } }
          }
        },
        favorites: {
          include: {
            horizontalCap: true,
            verticalCap: true,
            arquive: true,
            gameIconImage: true,
            gameBackgroundImage: true,
            UserGameStatus: { where: { userId } }
          }
        }
      }
    })

    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    const userGamesBox = []

    userGamesBox.push({ description: "", hidden: false, name: "Todos", games: user.games, userId: user.id })

    userGamesBox.push({ description: "", hidden: false, name: "Favoritos", games: user.favorites, userId: user.id })

    userGamesBox.push(...user.gamesBoxs)

    return res.status(200).json({ type: "success", response: userGamesBox })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const createGameBox = async (req: Request, res: Response) => {
  const { name }: { name: string, description: string | undefined } = req.body
  const userId = req.body.token.userId

  try {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        gamesBoxs: true
      }
    })

    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    if (user.gamesBoxs.some(g => g.name === name)) return res.status(400).json({ type: "error", response: error500Msg })

    const gameBox = await prisma.userGamesBox.create({
      data: {
        name,
        hidden: false,
        userId
      },
      include: { games: true }
    })

    return res.status(201).json({ type: "success", response: gameBox })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const updateGameBox = async (req: Request, res: Response) => {
  const { action, gameId, id }: { id: number, gameId: number, action: "remove" | "add" } = req.body
  const userId = req.body.token.userId

  try {

    if (action !== "add" && action !== "remove") {
      return res.status(400).json({ type: "error", response: "Tipo de ação inválida!" })
    }

    const gameExists = await prisma.games.findUnique({ where: { id: gameId } })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        gamesBoxs: { include: { games: true } }
      }
    })
    if (!user || !gameExists) return res.status(500).json({ type: "error", response: error500Msg })

    if (!user.gamesBoxs.some(g => g.id === id)) return res.status(500).json({ type: "error", response: "Box não encontrada!!" })

    const gameBox = await prisma.userGamesBox.update({
      where: { id },
      data: {
        games: action === "add" ? { connect: { id: gameId } }
          : { disconnect: { id: gameId } }
      },
      include: {
        games: {
          include: {
            horizontalCap: true,
            verticalCap: true,
            arquive: true,
            gameIconImage: true,
            UserGameStatus: { where: { userId } },
            pathGames: { where: { userId } }
          }
        }
      }
    })

    return res.status(201).json({ type: "success", response: gameBox })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const downloadGame = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const gameId = Number(req.params.gameId)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { games: true } })
    const game = await prisma.games.findUnique({ where: { id: gameId }, include: { arquive: true } })

    if (!user || !game || !game.arquive)
      return res.status(500).json({ type: "error", response: error500Msg })

    const userHaveGame = user.games.some(games => games.id === gameId)
    if (!userHaveGame) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    const gameName = game.name.includes(" ") ?
      game.name.replace(" ", "_") : game.name

    const outputFolder = user.downloadPathDefault ??
      path.join(homedir(), "MY_GAMES", gameName)

    const chunkSize = 1024 * 1024

    const result = await downloadFile(chunkSize, outputFolder, game.arquive.url)

    if (result) {
      await prisma.gamePath.create({
        data: {
          pathGame: path.join(outputFolder, game.arquive.execFile),
          gameId,
          userId
        }
      })

      return res.status(200).json({ type: "success", response: "OK!!" })
    } else {
      return res.status(500).json({ type: "error", response: error500Msg })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const execGame = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.userId

  try {
    const game = await prisma.games.findUnique({ where: { id: gameId }, include: { arquive: true } })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    const pathGame = await prisma.gamePath.findFirst({ where: { AND: [{ gameId }, { userId }] } })
    if (!pathGame) return res.status(500).json({ type: "error", response: error500Msg })

    if (!user || !game || !game.arquive)
      return res.status(500).json({ type: "error", response: error500Msg })

    exec(`"${pathGame.pathGame}" /S`, (err, stdout, sterr) => {
      return res.status(400).json({ type: "error", response: "Não foi possivel executar o jogo, tente novamente mais tarde!" })
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

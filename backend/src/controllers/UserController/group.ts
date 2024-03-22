import { Request, Response } from "express"
import { existsOrNot } from "../../validations"
import prisma from "../../libs/prisma"
import { Group, PrismaClient } from "@prisma/client"
import { GroupMessages } from "../../schemas"
import { error500Msg, noAuthorizationMsg } from "../../utils/msgs"
import FileType from "../../models/FileType"

interface GroupMessage {
  sender: string
  group: number
  type: string
  content: string
  date: Date
}

export const createGroup = async (req: Request, res: Response) => {
  const { name, type, groupLink }: Group = req.body
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return res.status(500).json({ type: "error", response: "Ops, algo deu errado, tente novamente mais tarde!" })
    if (type !== "PRIVATE" && type !== "PUBLIC" && type !== "RESTRICT") res.status(400).json({ type: "error", response: "Tipo de grupo inválido!" })

    try {
      existsOrNot(name, "Nome de grupo inválido!")
      existsOrNot(groupLink, "Link de grupo inválido!", "Group")

    } catch (err) {
      return res.status(400).json({ type: "error", response: err })
    }

    const groupExists = await prisma.group.findFirst({ where: { name: { equals: name } } })
    if (groupExists) return res.status(400).json({ type: "error", response: "Nome de grupo ja utilizado!" })

    const group = await prisma.group.create({
      data: {
        name,
        type,
        userId,
        admins: { connect: { id: userId } },
        groupLink,
        // gameRelation: { connect: gameRelations.map(id => ({ id: Number(id) })) } 
      }
    })

    await prisma.groupHistoric.create({
      data: {
        message: "Grupo Criado",
        groupId: group.id,
        userId: group.userId
      }
    })

    return res.status(200).json({ type: "success", response: group })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getGroups = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        groups: { include: { image: true, banner: true, gameRelation: { include: { imageCap: true } } } },
        adminGroups: { include: { banner: true, gameRelation: { include: { gameIconImage: true } }, image: true } },
      }
    })


    if (!user) return res.status(400).send({ type: "error", response: "Usuario não encontrado" })

    const groups = user?.groups
    const adminGroups = user.adminGroups

    return res.status(200).json({ type: "success", response: { groups, adminGroups } })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


export const getGroup = async (req: Request, res: Response) => {
  const { groupLink } = req.params

  try {
    const group = await prisma.group.findUnique({
      where: { groupLink },
      include: {
        banner: true,
        image: true,
        users: { include: { image: true } },
        creator: { include: { image: true } },
        admins: { include: { image: true } },
        gameRelation: { include: { gameIconImage: true } },
        groupRequests: { where: { status: { equals: "PENDING" } }, include: { requestUser: { include: { image: true } } } },
        groupBans: { where: { status: { equals: "BANNED" } }, include: { user: { include: { image: true } } } },
        groupHistoric: { include: { user: true }, orderBy: { date: "desc" } }
      }
    }) as any

    const membersLength = (group?.users.length ?? 0) + 1
    group.membersLength = membersLength

    group.groupBans = group.groupBans.map((b: any) => { b.user })

    if (!group) return res.status(400).json({ type: "error", response: "Grupo não encontrado" })

    return res.status(200).json({ type: "success", response: group })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const updateGroup = async (req: Request, res: Response) => {
  const { name, description, type, header, groupLink }: Group = req.body
  const userId = req.body.token.userId
  const groupId = Number(req.params.groupId)
  const gameRelations: string[] = req.body.gameRelations || []

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId }, include: { gameRelation: { select: { id: true } } } })

    if (!user) return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })
    if (!group) return res.status(400).json({ type: "error", response: "Grupo não encontrado!" })
    if (type !== "PRIVATE" && type !== "PUBLIC") res.status(400).json({ type: "error", response: "Tipo de grupo inválido!" })

    try {
      existsOrNot(name, "Nome Inválido")
      existsOrNot(groupLink, "Link Inválido", "Group")

    } catch (e) {
      return res.status(400).json({ type: "error", response: e })
    }
    if (gameRelations.length > 0) {
      await Promise.all(
        gameRelations.map(async id => {
          const game = await prisma.games.findUnique({ where: { id: Number(id) } })
          if (!game) return res.status(500).json({ type: "error", response: error500Msg })
        })
      )
    }

    const groupExists = await prisma.group.findFirst({
      where: {
        AND: [
          { name: { equals: name } },
          { id: { not: groupId } }
        ]
      }
    })

    const userIdAdm = await prisma.group.findFirst({
      where: {
        OR: [
          { admins: { some: { id: { equals: userId } } } },
          { creator: { id: { equals: userId } } }
        ]
      }
    })


    if (groupExists) return res.status(400).json({ type: "error", response: "Nome de grupo ja utilizado!" })
    if (userIdAdm === null)
      return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    await prisma.group.update({
      where: { id: groupId },
      data: {
        gameRelation: { disconnect: group.gameRelation.map(id => (id)) }
      }
    })

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        groupLink,
        header,
        name,
        type,
        description,
        gameRelation: { connect: gameRelations.map(id => ({ id: Number(id) })) },
        groupHistoric: {
          create: {
            message: `${user.nickname} alterou os detalhes do grupo`,
            userId: user.id
          }
        },
      },
      include: { gameRelation: { include: { gameIconImage: true } }, groupHistoric: { include: { user: true }, orderBy: { date: "desc" } } }
    })

    return res.status(200).json({ type: "success", response: updatedGroup })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: err })
  }
}

export const updateGroupImages = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const { tag, groupId } = req.params
  const userId = req.body.token.userId

  try {
    if (tag !== "image" && tag !== "banner")
      return res.status(400).json({ type: "error", response: "Tag Inválida" })

    const userExists = await prisma.user.findUnique({ where: { id: userId } })
    const groupExists = await prisma.group.findUnique({ where: { id: Number(groupId) }, include: { creator: true, admins: true } })


    if (!userExists || !groupExists)
      return res.status(400).json({ type: "error", response: "Usuário ou Grupo não encontrado" })

    const userHavePermission = [...groupExists.admins, groupExists.creator].find(u =>
      u.id === userExists.id
    )

    if (!userHavePermission) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    let group;

    if (tag === "image") {
      group = await prisma.group.update({
        where: { id: Number(groupId) },
        data: {
          image: {
            upsert: {
              create: {
                name,
                originalName,
                size,
                url: `${process.env.API_URL}/api/uploads/images/${name}`,
              },
              update: {
                name,
                originalName,
                size,
                url: `${process.env.API_URL}/api/uploads/images/${name}`,
              }
            }
          },
          groupHistoric: {
            create: {
              message: `${userExists.nickname} alterou a imagem do grupo`,
              userId: userExists.id
            }
          }
        },
        include: {
          groupHistoric: { include: { user: true }, orderBy: { date: "desc" } },
          image: true
        }
      })
    } else {
      group = await prisma.group.update({
        where: { id: Number(groupId) },
        data: {
          banner: {
            upsert: {
              create: {
                name,
                originalName,
                size,
                url: `${process.env.API_URL}/api/uploads/images/${name}`,
              },
              update: {
                name,
                originalName,
                size,
                url: `${process.env.API_URL}/api/uploads/images/${name}`,
              }
            }
          },
          groupHistoric: {
            create: {
              message: `${userExists.nickname} alterou o banner do grupo`,
              userId: userExists.id
            }
          }
        },
        include: {
          groupHistoric: { include: { user: true }, orderBy: { date: "desc" } },
          banner: true
        }
      })
    }

    return res.status(200).json({ type: "success", response: group })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const disconnectGroupGame = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const groupId = Number(req.params.groupId)

  const gameDisconnectId = Number(req.body.gameDisconnected)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    const gameDisconnectedExists = await prisma.games.findUnique({ where: { id: gameDisconnectId } })

    if (!user || !group || gameDisconnectedExists)
      return res.status(500).json({ type: "error", response: error500Msg })

    const userIdAdm = await prisma.group.findFirst({
      where: {
        OR: [
          { admins: { some: { id: { equals: userId } } } },
          { creator: { id: { equals: userId } } }
        ]
      }
    })

    if (!userIdAdm) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    prisma.group.update({
      where: { id: groupId },
      data: {
        gameRelation: { disconnect: { id: gameDisconnectId } }
      }
    })
    return res.status(200).json({ type: "success", response: "OK" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const connectGroupGame = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const groupId = Number(req.params.groupId)

  const gameConnectId = Number(req.body.gameDisconnected)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    const gameConnectExists = await prisma.games.findUnique({ where: { id: gameConnectId } })

    if (!user || !group || gameConnectExists)
      return res.status(500).json({ type: "error", response: error500Msg })

    const userIdAdm = await prisma.group.findFirst({
      where: {
        OR: [
          { admins: { some: { id: { equals: userId } } } },
          { creator: { id: { equals: userId } } }
        ]
      }
    })

    if (!userIdAdm) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    prisma.group.update({
      where: { id: groupId },
      data: {
        gameRelation: { connect: { id: gameConnectId } }
      }
    })
    return res.status(200).json({ type: "success", response: "OK" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const userGroupRequest = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const groupId = Number(req.params.groupId)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })

    const isBanned = await prisma.groupBans.findFirst({ where: { userId } })

    if (isBanned && isBanned.status === "BANNED")
      return res.status(400).json({ type: "error", response: "Você não pode enviar pedidos para um grupo que foi banido" })

    const haveRequests = await prisma.groupRequests.findFirst({
      where: {
        groupId,
        status: "PENDING",
        requestUserId: userId
      }
    })

    if (haveRequests)
      return res.status(400).json({ type: "error", response: "Você pode enviar apenas um pedido por vez" })


    if (!user || !group)
      return res.status(500).json({ type: "error", response: error500Msg })

    if (group.type === "PRIVATE") {
      await prisma.groupRequests.create({
        data: {
          status: "PENDING",
          groupId,
          requestUserId: userId
        }
      })
      return res.status(200).json({ type: "success", response: "OK" })
    } else {
      await prisma.groupRequests.create({
        data: {
          status: "ACCEPTED",
          groupId,
          requestUserId: userId
        }
      })
      await prisma.group.update({
        where: { id: groupId },
        data: { users: { connect: { id: userId } } }
      })

      return res.status(200).json({ type: "success", response: "OK" })
    }
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const requestAction = async (req: Request, res: Response) => {
  const admId = req.body.token.userId
  const type: "ACCEPTED" | "DECLINED" = req.body.type
  const requestId = Number(req.params.requestId)

  try {
    const user = await prisma.user.findUnique({ where: { id: admId } })
    const request = await prisma.groupRequests.findUnique({ where: { id: requestId }, include: { group: { include: { admins: true } }, requestUser: true } })

    const userIsAdm = request?.group.admins.find(u => u.id === admId)

    let group = null;

    if (!user || !request)
      return res.status(500).json({ type: "error", response: error500Msg })

    if (type !== "ACCEPTED" && type !== "DECLINED")
      return res.status(500).json({ type: "error", response: error500Msg })

    if (!userIsAdm) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    else if (type === "ACCEPTED") {
      await prisma.groupRequests.update({
        where: { id: requestId },
        data: {
          status: "ACCEPTED",
          admId
        }
      })
      group = await prisma.group.update({
        where: { id: request.groupId },
        data: {
          users: { connect: { id: request.requestUserId } },
          groupHistoric: {
            create: {
              message: `${user.nickname} aceitou o pedido de ${request.requestUser.nickname}`,
              userId: user.id
            }
          }
        },
        include: {
          admins: { include: { image: true } },
          users: { include: { image: true } },
          groupHistoric: { include: { user: true }, orderBy: { date: "desc" } }
        }
      })

      await prisma.notification.create({
        data: {
          userId: request.requestUserId,
          title: "Pedido de Amizade",
          content: `Pedido do grupo ${request.group.name} aceito`
        }
      })

    } else {
      await prisma.groupRequests.update({
        where: { id: requestId },
        data: {
          status: "DECLINED",
          admId
        }
      })
      await prisma.notification.create({
        data: {
          userId: request.requestUserId,
          title: "Pedido de Amizade",
          content: `Pedido do grupo ${request.group.name} recusado`
        }
      })

      await prisma.groupHistoric.create({
        data: {
          message: `${user.nickname} recusou o pedido de ${request.requestUser.nickname}`,
          groupId: request.group.id,
          userId: user.id
        },
      })

      const historics = await prisma.groupHistoric.findMany({
        where: { groupId: Number(request.groupId) },
        include: { user: true }
      })

      group = { groupHistoric: historics }
    }

    return res.status(200).json({ type: "success", response: group })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const cancelRequest = async (req: Request, res: Response) => {
  const requestId = Number(req.params.requestId)
  const userId = req.body.token.userId

  try {
    const request = await prisma.groupRequests.findUnique({
      where: { id: requestId }
    })

    if (!request) return res.status(400).json({ type: "error", response: "Requesição não encontrada!" })

    if (request.requestUserId !== userId) return res.status(401).json({ type: "error", response: "Ação não permetida!" })

    if (request.status === "DECLINED") return res.status(401).json({ type: "error", response: "Ação não permetida!" })

    await prisma.groupRequests.update({
      where: { id: requestId },
      data: {
        status: "CANCELED"
      }
    })

    return res.status(200).json({ type: "success", response: "OK" })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const UpdateMembers = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId)
  const userId = req.body.token.userId
  const admins: string[] = req.body.admins
  const members: string[] = req.body.members

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const userIsAdm = await prisma.group.findFirst({
      where: {
        AND: [
          { admins: { some: { id: { equals: userId } } } },
          { id: groupId }
        ]
      }
    })

    const groupExists = await prisma.group.findUnique({
      where: { id: groupId }, include: {
        admins: { select: { id: true } }
      }
    })

    if (!groupExists) return res.status(400).json({ type: "error", response: "Grupo não encontrado" })
    if (!userIsAdm) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    await Promise.all([...admins, ...members].map(async id => {
      const userExists = await prisma.user.findUnique({ where: { id } })
      if (!userExists) return res.status(400).json({ type: "error", response: "Algum usuário não foi encontrado!" })
    }))

    const adminsToAdd = admins.filter(id => !groupExists.admins.includes({ id }))
    const admisnToRemove = groupExists.admins.filter(adm => !admins.includes(adm.id))

    const group = await prisma.group.update({
      where: { id: groupId },
      data: {
        admins: {
          connect: adminsToAdd.map(adm => ({ id: adm })),
          disconnect: admisnToRemove.map(adm => ({ id: adm.id }))
        },
        users: {
          disconnect: adminsToAdd.map(adm => ({ id: adm })),
          connect: admisnToRemove.map(adm => ({ id: adm.id }))
        },
        groupHistoric: {
          create: {
            message: `${user!.nickname} atualizou os membros`,
            userId: userId
          }
        }
      },
      include: {
        admins: { include: { image: true } },
        users: { include: { image: true } },
        groupHistoric: { include: { user: true }, orderBy: { date: "desc" } }
      }
    })

    return res.status(200).json({ type: "success", response: group })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const userQuitGroup = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })

    if (!user || !group)
      return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.group.update({
      where: { id: groupId },
      data: {
        users: { disconnect: { id: userId } },
        admins: { disconnect: { id: userId } },
        groupHistoric: {
          create: {
            message: `${user.nickname} saiu do grupo`,
            userId: user.id
          }
        }
      }
    })

    const historics = await prisma.groupHistoric.findMany({
      where: { groupId: Number(groupId) },
      include: { user: true }
    })


    return res.status(200).json({ type: "success", response: { groupHistoric: historics } })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const admQuitUser = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId)
  const userId = req.params.userId
  const admId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const adm = await prisma.user.findUnique({ where: { id: admId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })

    const isAdm = await prisma.group.findFirst({
      where: {
        AND: [
          { admins: { some: { id: { equals: admId } } } },
          { id: { equals: groupId } }
        ]
      },
    })

    if (!isAdm)
      return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    if (!user || !group)
      return res.status(500).json({ type: "error", response: error500Msg })

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        users: { disconnect: { id: userId } },
        admins: { disconnect: { id: userId } },
        groupHistoric: {
          create: {
            message: `${adm!.nickname} removeu ${user.nickname} do group`,
            userId: adm!.id
          }
        }
      },
      include: {
        admins: { include: { image: true } },
        users: { include: { image: true } },
        groupHistoric: { include: { user: true }, orderBy: { date: "desc" } }
      }
    })


    return res.status(200).json({ type: "success", response: updatedGroup })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const admUnbanUser = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId)
  const userId = req.params.userId
  const admId = req.body.token.userId

  try {
    const adm = await prisma.user.findUnique({ where: { id: admId } })
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })

    const isAdm = await prisma.group.findFirst({
      where: {
        AND: [
          { admins: { some: { id: { equals: admId } } } },
          { id: { equals: groupId } }
        ]
      }
    })

    if (!isAdm)
      return res.status(401).json({ type: "error", response: "Sem Permissão" })

    if (!user || !group)
      return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.groupBans.create({
      data: {
        admId,
        groupId,
        userId,
        status: "UNBANNED"
      }
    })


    await prisma.groupHistoric.create({
      data: {
        message: `${adm!.nickname} baniu ${user.nickname} no group!`,
        groupId: group.id,
        userId: adm!.id
      },
    })

    const historics = await prisma.groupHistoric.findMany({
      where: { groupId: Number(groupId) },
      include: { user: true }
    })


    return res.status(200).json({ type: "success", response: { groupHistoric: historics } })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const admBanUser = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId)
  const userId = req.params.userId
  const admId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const adm = await prisma.user.findUnique({ where: { id: admId } })
    const group = await prisma.group.findUnique({ where: { id: groupId } })

    const isAdm = await prisma.group.findFirst({
      where: {
        AND: [
          { admins: { some: { id: { equals: admId } } } },
          { id: { equals: groupId } }
        ]
      }
    })

    if (!isAdm)
      return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    if (!user || !group)
      return res.status(500).json({ type: "error", response: error500Msg })

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        users: { disconnect: { id: userId } },
        admins: { disconnect: { id: userId } },
        groupHistoric: {
          create: {
            message: `${adm!.nickname} desbaniu ${user.nickname}`,
            userId: adm!.id
          }
        }
      },
      include: {
        admins: { include: { image: true } },
        users: { include: { image: true } },
        groupHistoric: { include: { user: true }, orderBy: { date: "desc" } }
      }
    })

    await prisma.groupBans.create({
      data: {
        admId,
        groupId,
        userId,
        status: "BANNED"
      }
    })

    return res.status(200).json({ type: "success", response: updatedGroup })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getGroupsChat = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        groups: { include: { image: true } },
        adminGroups: { include: { image: true } }
      }
    }) as any

    if (!user) return res.status(400).send({ type: "error", response: "Usuario não encontrado" })

    const groups = [...user.groups, ...user.adminGroups]

    const groupsWithMessages = groups.map(g => {
      const group = g
      group.messages = []
      return group
    })

    return res.status(200).json({ type: "success", response: groupsWithMessages })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const groupId = +req.params.groupId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const groupaaa = await prisma.group.findMany()
    const group = groupaaa[0]

    if (!user || !group) return res.status(400).json({ type: "error", response: "Grupo não encontrado!" })

    const groupMessages = await GroupMessages.find({ group: groupId })

    interface GroupMessagesWithImages extends GroupMessage {
      _id: string
      nickname: string
      image: string
    }

    interface UsersImage {
      id: string
      nickname: string
      image: string
    }

    const usersImage: UsersImage[] = []

    const groupMessagesWithImages: GroupMessagesWithImages[] = []

    await Promise.all(groupMessages.map(async message => {
      const { sender, date, _id, group, type, content } = message

      const usersImageExists = usersImage.find(u => u.id === sender)
      if (!usersImageExists) {
        const userImage = await prisma.user.findUnique({ where: { id: sender }, select: { id: true, nickname: true, image: true } })
        if (userImage) {
          usersImage.push({
            id: userImage.id,
            image: userImage.image ? userImage.image.url : "",
            nickname: userImage.nickname
          })
          groupMessagesWithImages.push({
            content: content!,
            date,
            group,
            _id: _id.toJSON()!,
            sender,
            type: type!,
            image: userImage.image ? userImage.image.url : "",
            nickname: userImage.nickname
          })
        }
      } else {
        const { image, nickname } = usersImageExists
        groupMessagesWithImages.push({
          content: content!,
          date,
          group,
          _id: _id.toJSON()!,
          sender,
          type: type!,
          image,
          nickname
        })
      }
    }))
    return res.status(200).json({ type: "success", response: groupMessagesWithImages })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const SearchGroups = async (req: Request, res: Response) => {
  const name = req.params.name

  try {
    const groups = await prisma.group.findMany({
      where: { name: { mode: "insensitive", contains: name } },
      include: { image: true }
    })

    return res.status(200).json({ type: "success", response: groups })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

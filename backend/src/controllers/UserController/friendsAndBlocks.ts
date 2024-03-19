import { FriendRequest } from "@prisma/client"
import { Request, Response, request } from "express"

import prisma from "../../libs/prisma"
import { error500Msg } from "../../utils/msgs"

export const sendFriendRequest = async (req: Request, res: Response) => {
  const friendId = req.params.friendId
  const userId = req.body.token.userId

  try {

    if (friendId === userId)
      return res.status(400).json({ type: "error", response: "Você não pode ser amigo de você mesmo!" })

    const user = await prisma.user.findUnique({ where: { id: userId }, include: { friends: { include: { user: true } } } })
    const friend = await prisma.user.findUnique({ where: { id: friendId } })

    if (!user || !friend) return res.status(400).json({ type: "error", response: "Usuário não encontrado!!" })

    const userIsFriend = user.friends.some(f => f.user.id === friendId)

    if (userIsFriend) return res.status(200).json({ type: "error", response: "Vocês já são amigos!!" })

    const userIsBlocked = await prisma.blockedFriendsOnUsers.findFirst({
      where: {
        OR: [
          { blockdUserId: userId, userId: friendId },
          { blockdUserId: friendId, userId: friendId }
        ]
      }
    })

    const requestExists = await prisma.friendRequest.findFirst({
      where: {
        OR: [{
          AND: { receiverId: userId, senderId: friendId }
        }, {
          AND: { receiverId: friendId, senderId: userId }
        }]
      }
    })


    if (userIsBlocked) return res.status(400).json({ type: "error", response: "Você não pode enviar um pedido de amizade se você e/ou ele está bloqueado" })

    if (requestExists && requestExists.status !== "CANCELED" && requestExists.status !== "DECLINED") {
      if (requestExists.status === "ACCEPTED" && userIsFriend) {
        return res.status(400).json({ type: "error", response: "Vocês ja são amigos!!" })
      } else if (requestExists.status === "PENDING") {
        return res.status(400).json({ type: "error", response: "Você não pode enviar um pedido de amizade para este usuário de novo" })
      }
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: userId,
        receiverId: friendId
      },
      include: {
        receiver: { include: { image: true } },
        sender: true
      }
    })

    await prisma.notification.create({
      data: {
        userId: friendId,
        title: "Pedido de Amizade",
        content: `Pedido de Amizade de ${friendRequest.sender.nickname}`
      }
    })

    return res.status(200).send({ type: "success", response: friendRequest })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const deleteFriendRequest = async (req: Request, res: Response) => {
  const friendId = req.params.friendId
  const userId = req.body.token.userId

  try {
    const request = await prisma.friendRequest.findFirst({ where: { AND: [{ receiverId: friendId, senderId: userId }] } })
    if (!request) return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.friendRequest.update({ where: { id: request.id }, data: { status: "CANCELED" } })

    return res.status(200).json({ type: "success", response: "OK" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const friendRequestAction = async (req: Request, res: Response) => {
  const { status }: FriendRequest = req.body
  const { requestId } = req.params
  const userId = req.body.token.userId

  try {
    if (status !== "ACCEPTED" && status !== "CANCELED" && status !== "DECLINED" && status !== "PENDING") {
      return res.status(400).json({ type: "error", response: "Tipo de status inválido!" })
    }

    const requestExists = await prisma.friendRequest.findFirst(
      { where: { id: Number(requestId) } }
    )

    if (!requestId || !status || !requestExists) {
      return res.status(500).send({ type: "error", response: error500Msg })
    }

    if (status === "CANCELED" && requestExists.senderId !== userId)
      return res.status(400).json({ type: "error", response: "Você não tem autorização para cancelar esse pedido" })
    else if ((status === "DECLINED" || status === "ACCEPTED") && requestExists.receiverId !== userId)
      return res.status(400).json({ type: "error", response: "Você não tem autorização para fazer esta ação" })

    const friendRequest = await prisma.friendRequest.update({
      where: { id: Number(requestId) },
      data: { status },
      include: { sender: true, receiver: true },
    })

    if (status === "ACCEPTED") {

      await prisma.friendsAndUsers.create({
        data: {
          userId: friendRequest.receiverId,
          friendId: friendRequest.senderId,
        },
      })

      await prisma.friendsAndUsers.create({
        data: {
          userId: friendRequest.senderId,
          friendId: friendRequest.receiverId,
        },
      })


      await prisma.notification.create({
        data: {
          userId: friendRequest.senderId,
          title: "Pedido de Amizade",
          content: `Pedido de Amizade aceito de ${friendRequest.receiver.nickname}`
        }
      })

      if (friendRequest.receiverId === userId) {
        const friend = await prisma.user.findUnique({
          where: { id: friendRequest.senderId },
          include: { image: true }
        })

        return res.status(200).json({ type: "success", response: friend })
      } else if (friendRequest.senderId === userId) {
        const friend = await prisma.user.findUnique({
          where: { id: friendRequest.receiverId },
          include: { image: true }
        })
        return res.status(200).json({ type: "success", response: friend })
      }
    } else {
      await prisma.notification.create({
        data: {
          userId: friendRequest.senderId,
          title: "Pedido de Amizade",
          content: `Pedido de Amizade recusado de ${friendRequest.receiver.nickname}`
        }
      })
    }

    return res.status(200).json({ type: "success", response: friendRequest })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  const friendId = req.params.friendId
  const userId = req.body.token.userId

  try {
    const friendExists = await prisma.friendsAndUsers.findMany({
      where: {
        OR: [{ friendId }, { userId }]
      }
    })

    if (!friendExists) return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.friendsAndUsers.deleteMany({
      where: { friendId, userId }
    })
    await prisma.friendsAndUsers.deleteMany({
      where: { friendId: userId, userId: friendId }
    })

    return res.status(200).json({ type: "success", response: "OK!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: "Ops, algo deu errado, tente novamente mais tarde" })
  } finally {
    await prisma.$disconnect()
  }

}

export const getFriendsRequests = async (req: Request, res: Response) => {
  const { userId, requestType } = req.params

  try {
    if (!userId) {
      return res.status(400).send({ type: "error", response: "Requesição inválida!" })
    }
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(400).send({ type: "error", response: "Não foi possível encontrar o usuário" })

    if (requestType === "receiver") {
      const pendingRequests = await prisma.friendRequest.findMany({
        where: { receiverId: userId, status: "PENDING" },
        select: {
          id: true,
          sender: { select: { nickname: true, image: true, id: true } },
          createdAt: true,
          status: true
        }
      })

      return res.status(200).json({ type: "success", response: pendingRequests })

    } else if (requestType === "sender") {
      const pendingRequests = await prisma.friendRequest.findMany({
        where: { senderId: userId, status: "PENDING" },
        select: {
          id: true,
          receiver: { select: { nickname: true, image: true, id: true } },
          createdAt: true,
          status: true
        }
      })
      return res.status(200).json({ type: "success", response: pendingRequests })
    } else {
      return res.status(400).send({ type: "error", response: error500Msg })
    }
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getFriends = async (req: Request, res: Response) => {
  const { userId } = req.body.token

  try {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        friends: {
          select: { user: { include: { image: true } } }
        }
      }
    }) as any

    if (!user) return res.status(400).send({ type: "error", response: "Usuario não encontrado" })

    const friends = user?.friends.map((f: any) => f.user)
    const friendsWithMessages = friends.map((f: any) => {
      const friend = f
      friend.messages = []

      return friend
    })

    return res.status(200).json({ type: "success", response: friendsWithMessages })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const blockUser = async (req: Request, res: Response) => {
  const blockId = req.params.blockId
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const blockUser = await prisma.user.findUnique({
      where: { id: blockId }
    })

    if (!user || !blockUser) {
      return res.status(400).send({ type: "error", response: "Usuário não encontrado" })
    }

    const blockedUserIsFriend = await prisma.friendsAndUsers.findFirst({
      where: {
        OR: [
          { friendId: blockId, userId },
          { friendId: userId, userId: blockId },
        ]
      }
    })

    const blockedUserIsPending = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: blockId },
          { senderId: blockId, receiverId: userId }
        ]
      }
    })

    if (blockedUserIsFriend) {
      await prisma.friendsAndUsers.deleteMany({
        where: {
          OR: [
            { userId, friendId: blockId },
            { userId: blockId, friendId: userId },
          ]
        }
      })

    } else if (blockedUserIsPending) {
      await prisma.friendRequest.deleteMany({
        where: {
          OR: [
            { receiverId: blockId, senderId: userId },
            { receiverId: userId, senderId: blockId },
          ]
        }
      })
    }

    const BlockedUsers = await prisma.blockedFriendsOnUsers.create({
      data: {
        userId,
        blockdUserId: blockId
      }
    })

    return res.status(200).json({ type: "success", response: BlockedUsers })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getBlockedUsers = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return res.status(400).send({ type: "error", response: "Usuário não encontrado" })
    }

    const blockedUsers = await prisma.blockedFriendsOnUsers.findMany({
      where: { userId }
    })

    return res.status(200).json({ type: "success", response: blockedUsers })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}


export const desblockFriend = async (req: Request, res: Response) => {
  const blockedId = req.params.blockedId
  const userId = req.body.token.userId

  try {
    const blockedUserExists = await prisma.blockedFriendsOnUsers.findFirst({
      where: {
        OR: [{ userId }, { blockdUserId: blockedId }]
      }
    })

    if (!blockedUserExists)
      return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.blockedFriendsOnUsers.deleteMany({
      where: {
        OR: [{ userId }, { blockdUserId: blockedId }]
      }
    })

    return res.status(200).json({ type: "success", response: "Usuário desbloqueado!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}


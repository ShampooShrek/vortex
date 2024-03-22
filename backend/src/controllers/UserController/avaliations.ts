import { AvaliationComments, AvaliationLikes, Avaliations } from "@prisma/client"
import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import { error500Msg, noAuthorizationMsg } from "../../utils/msgs"

export const postAvaliations = async (req: Request, res: Response) => {
  const { avaliation, comment, title }: Avaliations = req.body
  const gameId: number = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    try {
      if (avaliation !== "LIKE" && avaliation !== "DISLIKE") {
        return res.status(400).json({ type: "error", response: error500Msg })
      }

      const UserAvaliatedGame = await prisma.avaliations.findFirst({
        where: { AND: [{ gameId }, { userId }] }
      })

      if (UserAvaliatedGame) return res.status(400).jsonp({ type: "error", response: "É permetido apenas uma avaliação por jogo." })

      const user = await prisma.user.findUnique({ where: { id: userId }, include: { games: true } })
      const game = await prisma.games.findUnique({ where: { id: gameId } })

      if (!user) return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })
      if (!game) return res.status(400).json({ type: "error", response: "Jogo não encontrado!" })

      const userHaveGame = user.games.some(g => g.id === game.id)

      if (!userHaveGame) return res.status(401).json({ type: "error", response: "Você tem que ter o jogo para poder avaliar" })

    } catch (error) {
      return res.status(400).send({ type: "error", response: error500Msg })
    }

    const createAvaliation = await prisma.avaliations.create({
      data: {
        title,
        comment,
        avaliation,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: createAvaliation })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getAvaliation = async (req: Request, res: Response) => {
  const avaliationId = Number(req.params.avaliationId)
  const userId = req.params.userId

  try {
    const avaliation = await prisma.avaliations.findFirst({
      where: { AND: [{ id: avaliationId }, { userId }, { deleted: false }] },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            image: true,
            privacity: true
          }
        },
        avaliationComments: {
          select: {
            comment: true,
            user: { select: { nickname: true, image: true } }
          }
        },
        game: { select: { id: true, name: true, horizontalCap: true, verticalCap: true } }
      }
    })

    if (!avaliation || avaliation.deleted) return res.status(400).json({ type: "error", response: "Não foi possivel encontrar a avaliação!!" })

    return res.status(200).json({ type: "success", response: avaliation })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getUserAvaliations = async (req: Request, res: Response) => {
  const userId: string = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(400).json({ type: "error", response: error500Msg })

    const avaliations = await prisma.avaliations.findMany({ where: { userId, deleted: false } })

    return res.status(200).json({ type: "success", response: avaliations })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const updateUserAvaliation = async (req: Request, res: Response) => {
  const { comment, avaliation, title }: Avaliations = req.body
  const avaliationId = Number(req.params.id)
  const userId = req.body.token.userId

  try {
    const userAvaliation = await prisma.avaliations.findUnique({ where: { id: Number(avaliationId) }, include: { user: true } })

    if (!userAvaliation)
      return res.status(500).json({ type: "error", response: error500Msg })
    if (userAvaliation.userId !== userId)
      return res.status(200).json({ type: "error", response: noAuthorizationMsg })

    await prisma.avaliations.update({
      where: { id: avaliationId },
      data: { avaliation, comment, title }
    })

    return res.status(200).json({ type: "success", response: "Avaliação atualizada com sucesso!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const deleteAvaliation = async (req: Request, res: Response) => {
  const avaliationId = Number(req.params.id)
  const userId = req.body.token.userId

  try {
    const avaliation = await prisma.avaliations.findUnique({ where: { id: avaliationId } })
    if (!avaliation)
      return res.status(500).json({ type: "error", response: error500Msg })

    if (avaliation.userId !== userId)
      return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.avaliations.update({
      where: { id: avaliationId },
      data: { deleted: true }
    })

    return res.status(200).json({ type: "success", response: "Avaliação deletada com sucesso" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const likeAvaliations = async (req: Request, res: Response) => {
  const { type }: AvaliationLikes = req.body
  const userId = req.body.token.userId
  const avaliationId = Number(req.params.avaliationId)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const avaliation = await prisma.avaliations.findUnique({ where: { id: avaliationId } })

    if (!user || !avaliation) return res.status(400).json({ type: "error", response: "Usuario ou avaliação invalidos" })
    if (type !== "DISLIKE" && type !== "LIKE") return res.status(400).json({ type: "error", response: "Tipo de interação invalida" })

    const userHaveInteraction = await prisma.avaliationLikes.findFirst({
      where: { AND: [{ avaliationId, userId }] }
    })

    if (!userHaveInteraction) {
      await prisma.avaliationLikes.create({
        data: {
          type,
          avaliationId,
          userId
        }
      })
    } else {
      await prisma.avaliationLikes.update({
        where: { id: userHaveInteraction.id },
        data: {
          type
        }
      })
    }

    return res.status(200).json({ type: "success", response: "OK" })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


export const commentAvalaitions = async (req: Request, res: Response) => {
  const { comment }: AvaliationComments = req.body
  const userId = req.body.token.userId
  const avaliationId = Number(req.params.avaliationId)

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const avaliation = await prisma.avaliations.findUnique({ where: { id: avaliationId } })

    if (!user || !avaliation) return res.status(400).json({ type: "error", response: "Usuario ou avaliação invalidos" })
    if (comment.trim().length < 1) return res.status(400).json({ type: "error", response: "Comentario Invalido" })

    await prisma.avaliationComments.create({
      data: {
        avaliationId,
        userId,
        comment
      }
    })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

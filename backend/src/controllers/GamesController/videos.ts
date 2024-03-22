import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import FileType from "../../models/FileType"
import { error500Msg } from "../../utils/msgs"
import { UserIsDev } from "../../validations"

export const postGameVideos = async (req: Request, res: Response) => {
  if (req.file) {
    const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
    const name = filename ? filename : key!
    const gameId = Number(req.params.gameId)
    const { order, token: { userId } } = req.body

    try {
      const gameAlredyExists = await prisma.games.findUnique({ where: { id: gameId }, include: { images: true } })
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!gameAlredyExists || !user)
        return res.status(500).json({ type: "error", response: error500Msg })

      const isDev = await UserIsDev(userId, gameId)
      if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

      await prisma.gameVideos.create({
        data: {
          name,
          originalName,
          size,
          url: `${process.env.API_URL}/api/uploads/videos/${name}`,
          gameId,
          order: Number(order)
        }
      })

      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] atualizou os vídeos.`,
          gameId: gameId,
          userId
        }
      })


      return res.status(200).json({ type: "success", response: "OK" })
    } catch (err: any) {
      return res.status(500).json({ type: "error", response: error500Msg })
    }
  } else {
    return res.status(400).json({ type: "error", response: "Sem Arquivo" })
  }
}

export const putGameVideo = async (req: Request, res: Response) => {
  const { videoId } = req.params
  const { order } = req.body
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const video = await prisma.gameVideos.findUnique({ where: { id: +videoId } })
    if (!video || !user) return res.status(500).json({ type: "error", response: error500Msg })

    await UserIsDev(userId, video.gameId)

    await prisma.gameVideos.update({
      where: { id: +videoId },
      data: {
        order: Number(order),
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os vídeos.`,
        gameId: video.gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Video atualizada com sucesso" })
  } catch (err: any) {
    return res.status(err.status ?? 500).json({ type: "error", response: error500Msg })
  }
}

export const deleteGameVideo = async (req: Request, res: Response) => {
  const videoId = Number(req.params.videoId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const video = await prisma.gameVideos.findUnique({ where: { id: videoId } })
    if (!video || !user)
      return res.status(500).json({ type: "error", response: error500Msg })

    await UserIsDev(userId, video.gameId)

    await prisma.gameVideos.delete({
      where: { id: videoId }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os vídeos.`,
        gameId: video.gameId,
        userId
      }
    })


    return res.status(200).json({ type: "success", response: "Video deletado com sucesso" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

import { Request, Response } from "express";
import prisma from "../../libs/prisma";
import FileType from "../../models/FileType";
import { error500Msg } from "../../utils/msgs";

export const getFriends = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      include: { friends: { select: { user: { include: { image: true, } } } } }
    })

    if (!userExists) return res.status(500).json({ type: "error", response: error500Msg })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const addChatImage = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user)
      return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const url = `${process.env.API_URL}/api/uploads/chat/images/${name}`

    return res.status(200).json({ type: "success", response: url })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const addChatVideo = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user)
      return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const url = `${process.env.API_URL}/api/uploads/chat/videos/${name}`

    return res.status(200).json({ type: "success", response: url })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const addChatFile = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user)
      return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const url = `${process.env.API_URL}/api/uploads/chat/files/${name}`

    return res.status(200).json({ type: "success", response: url })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const addChatAudio = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user)
      return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const url = `${process.env.API_URL}/api/uploads/chat/audios/${name}`

    return res.status(200).json({ type: "success", response: url })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

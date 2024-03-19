import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import FileType from "../../models/FileType"
import { error500Msg } from "../../utils/msgs"


export const addPerfilImage = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const userId = req.params.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }, include: { image: true }
    })

    if (!user)
      return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    if (user.image) {
      const image = await prisma.userImage.update({
        where: {
          userId: user.id
        },
        data: {
          name,
          originalName,
          size,
          url: `${process.env.API_URL}/api/uploads/images/${name}`,
        }
      })
      return res.status(201).json({ type: "success", response: image })
    } else {
      const image = await prisma.userImage.create({
        data: {
          name,
          originalName,
          size,
          url: `${process.env.API_URL}/api/uploads/images/${name}`,
          userId
        }
      })
      return res.status(201).json({ type: "success", response: image })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteImage = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.userImage.delete({ where: { userId } })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}


import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import { UserMessages } from "../../schemas"
import { error500Msg } from "../../utils/msgs"


export const getMessages = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const friendId = req.params.friendId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const friend = await prisma.user.findUnique({ where: { id: friendId } })

    if (!user || !friend) return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const senderMessages = await UserMessages.find({ sender: userId, recipient: friendId })
    const receiverMessages = await UserMessages.find({ recipient: userId, sender: friendId })

    const messages = [...senderMessages, ...receiverMessages].sort()

    return res.status(200).json({ type: "success", response: messages })

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

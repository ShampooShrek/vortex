import { Request, Response } from "express";
import prisma from "../../libs/prisma";
import { error500Msg } from "../../utils/msgs";



export const GetAdminData = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) return res.status(400).json({ type: "error", response: "Usuário inválido" })

    if (user.isAdm === false) return res.status(400).json({ type: "error", response: "Acesso negado!" })

    const games = await prisma.games.findMany({
      where: { AND: [{ status: "PENDING" }, { isActive: true }] },
      include: {
        horizontalCap: true,
        arquive: true
      }
    })

    return res.status(200).json({ type: "success", response: { games: games } })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: { games: error500Msg } })
  } finally {
    await prisma.$disconnect()
  }
}

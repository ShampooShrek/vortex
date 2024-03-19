import dayjs from "dayjs"
import { sign, decode, verify, JwtPayload, Jwt } from "jsonwebtoken"
import prisma from "../../../libs/prisma"
import { Request, Response } from "express"
import { error500Msg, noTokenMsg } from "../../../utils/msgs"

export const createToken = (userId: string) => {
  const expiresIn = dayjs().add(1, "minute").unix()
  const token = sign({ userId }, `${process.env.JWT_KEY}`, {
    subject: userId,
    expiresIn
  })

  return token
}

export const GetUserByToken = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.body

  try {
    if (!token) return res.status(400).json({ type: "error", response: noTokenMsg })

    verify(token, `${process.env.JWT_KEY}`, async (err, value) => {
      if (err) return res.status(400).json({ type: "error", response: "Token invalido" })
      const valueJwt = value as JwtPayload

      const user = await prisma.user.findUnique({
        where: { id: valueJwt.userId },
        include: {
          cart: { select: { id: true } },
          games: { select: { id: true } },
          gameDevelopers: { select: { id: true } },
          friends: { select: { user: { select: { id: true } } } },
          blocks: { select: { blockedUser: { select: { id: true } } } },
          notifications: true,
          image: true,
        }
      }) as any


      if (!user) return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

      user.friends = user?.friends.map((f: any) => f.user)

      return res.status(200).json({ type: "success", response: user })
    })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshTokenId } = req.body
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { id: refreshTokenId }
  })
  if (!refreshToken) return res.status(400).json({ type: "error", response: "Refresh Token Invalido" })

  const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

  const token = createToken(refreshToken.userId)

  if (refreshTokenExpired) {
    await prisma.refreshToken.deleteMany({ where: { id: refreshToken.id } })
    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        userId: refreshToken.userId,
        expiresIn: dayjs().add(1, "minute").unix()
      }
    })

    return res.status(200).json({
      type: "success",
      response: [{ token }, { refreshToken: newRefreshToken }]
    })
  }

  return res.status(200).json({ type: "success", response: { token } })
}

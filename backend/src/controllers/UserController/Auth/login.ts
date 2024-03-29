import { Request, Response } from "express";
import prisma from "../../../libs/prisma";
import { compare } from "bcrypt"
import { createToken } from "./token";
import dayjs from "dayjs";
import { error500Msg } from "../../../utils/msgs";

export const SignIn = async (req: Request, res: Response) => {
  const { nicknameOrEmail, password } = req.body

  try {
    if (nicknameOrEmail.trim() === "") return res.status(400).json({ type: "error", response: "Nickname ou E-mail inválido" })
    if (password.trim() === "") return res.status(400).json({ type: "error", response: "Senha inválida" })

    const user = await prisma.user.findFirst({
      where: { OR: [{ nickname: { equals: nicknameOrEmail } }, { email: { equals: nicknameOrEmail } }] },
    })
    if (!user) return res.status(400).json({ type: "error", response: "Usuário e/ou senha inválidos" })

    const isMath = await compare(password, user.password)
    if (!isMath) return res.status(400).json({ type: "error", response: "Usuário e/ou senha inválidos" })

    const token = createToken(user.id)

    await prisma.refreshToken.deleteMany({ where: { userId: user.id } })

    return res.status(200).json({ type: "success", response: { token, user } })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

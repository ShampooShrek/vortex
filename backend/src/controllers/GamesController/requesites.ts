import { GameRequesites } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../libs/prisma";
import { error500Msg } from "../../utils/msgs";
import { UserIsDev } from "../../validations";


interface RequesitesBody extends GameRequesites {
  token?: { userId: string }
}

export const PostRequesites = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const requesites: RequesitesBody = req.body
  const gameId = Number(req.params.gameId)

  if (requesites.token) delete requesites.token

  try {
    if (!requesites.minArmazenamento || !requesites.minMemory ||
      !requesites.minProcessador || !requesites.minSO || !requesites.minVideo) {
      throw { type: 400, msg: "Requesitos minimos incompletos!" }
    }

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    const requesitesExists = await prisma.gameRequesites.findUnique({ where: { gameId } })

    if (!requesitesExists) {
      const newRequesites = await prisma.gameRequesites.create({
        data: { ...requesites, gameId, others: requesites.others ?? undefined }
      })

      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] atualizou os requesitos.`,
          gameId,
          userId
        }
      })

      return res.status(201).json({ type: "success", response: newRequesites })
    } else {
      const updateRequesites = await prisma.gameRequesites.update({
        where: { gameId },
        data: { ...requesites, others: requesites.others ?? undefined }
      })

      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] atualizou os requesitos.`,
          gameId,
          userId
        }
      })

      return res.status(200).json({ type: "success", response: updateRequesites })
    }

  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

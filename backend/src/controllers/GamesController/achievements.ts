import { AchievementImage, AchievementLevel, GameAchievements, UsersAndAchievements } from "@prisma/client"
import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import FileType from "../../models/FileType"
import { error500Msg } from "../../utils/msgs"
import { UserIsDev } from "../../validations"

export const postAchievements = async (req: Request, res: Response) => {

  const { title, type, description, level }: GameAchievements = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (title.trim().length < 1) {
      return res.status(400).json({ type: "error", response: "Titúlo obrigatório!" })
    }
    if (description.trim().length < 1) {
      return res.status(400).json({ type: "error", response: "Descrição obrigatória" })
    }

    if (!game) return res.status(400).json({ type: "error", response: "Jogo não encontrado!" })
    if (!user) return res.status(500).json({ type: "error", response: "Usuário não encontrado!" })

    if (type !== "DEFAULT" && type !== "SECRET") {
      return res.status(400).json({ type: "error", response: "Tipo de conquista inválida!" })
    }

    if (!Object.values(AchievementLevel).includes(level)) {
      return res.status(400).json({ type: "error", response: "Nivel de conquista inválida!" })
    }

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    const CreateAchievement = await prisma.gameAchievements.create({
      data: {
        title,
        description,
        type,
        level,
        game: { connect: { id: gameId } }
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] criou a conquista ${CreateAchievement.title}`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: CreateAchievement })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getAchievements = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)

  try {
    const game = await prisma.games.findUnique({ where: { id: gameId }, include: { horizontalCap: true } })
    if (!game) return res.status(500).json({ type: "error", response: error500Msg })

    const achievements = await prisma.gameAchievements.findMany({
      where: {
        gameId: { equals: gameId }
      },
      include: {
        image: true,
      }
    })
    return res.status(200).json({ type: "success", response: { achievements, game } })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }


}

export const putAchievements = async (req: Request, res: Response) => {
  const { description, title, type, level }: GameAchievements = req.body
  const { userId } = req.body.token
  const { achievementId, gameId } = req.params


  try {
    const achievement = await prisma.gameAchievements.findFirst({
      where: { AND: [{ id: Number(achievementId) }, { gameId: Number(gameId) }] }
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })


    const isDev = await UserIsDev(userId, Number(gameId))
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    if (!user || !achievement)
      return res.status(500).json({ type: "error", response: error500Msg })


    if (type !== "DEFAULT" && type !== "SECRET") {
      return res.status(400).json({ type: "error", response: "Tipo de conquista inválida!" })
    }

    if (!Object.values(AchievementLevel).includes(level)) {
      return res.status(400).json({ type: "error", response: "Nivel de conquista inválida!" })
    }
    const updatedAchievement = await prisma.gameAchievements.update({
      where: { id: Number(achievementId) },
      data: {
        description, title, type, level
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou a conquista ${achievement.title}`,
        gameId: +gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: updatedAchievement })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteAchievement = async (req: Request, res: Response) => {
  const achievementId = req.params.achievementId
  const userId = req.body.token.userId

  try {
    const achievement = await prisma.gameAchievements.findUnique({ where: { id: Number(achievementId) }, include: { game: true, image: true } })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!achievement || !user) return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, achievement.gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    if (achievement.image) {
      await prisma.achievementImage.delete({
        where: { achievementId: Number(achievementId) }
      })
    }

    await prisma.gameAchievements.delete({ where: { id: Number(achievementId) } })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] excluíu a conquista ${achievement.title}`,
        gameId: achievement.game.id,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const postAchievementImage = async (req: Request, res: Response) => {

  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const { achievementId } = req.params
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const achievement = await prisma.gameAchievements.findUnique({
      where: { id: Number(achievementId) },
      include: {
        image: true,
        game: true
      }
    })

    if (!achievement || !user)
      return res.status(400).json({ type: "error", response: "aaaa" })

    const isDev = await UserIsDev(userId, achievement.gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    let image;

    if (achievement.image) {
      image = await prisma.achievementImage.update({
        where: { achievementId: Number(achievementId) },
        data: {
          name,
          originalName,
          size,
          url: `${process.env.API_URL}/api/uploads/images/${name}`
        }
      })
    } else {
      image = await prisma.achievementImage.create({
        data: {
          name,
          originalName,
          size,
          url: `${process.env.API_URL}/api/uploads/images/${name}`,
          achievementId: Number(achievementId)
        }
      })
    }

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou a imagem da conquista ${achievement.title}`,
        gameId: achievement.game.id,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: image })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}






import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import { UserIsDev } from "../../validations"
import { Games } from "@prisma/client"
import { error500Msg } from "../../utils/msgs"
import FileType from "../../models/FileType"

export const postGameImages = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const gameId = Number(req.params.gameId)
  const { order, token: { userId } } = req.body

  try {
    const gameAlredyExists = await prisma.games.findUnique({ where: { id: gameId }, include: { images: true } })
    const gameImagesOrders = await prisma.gameImages.findMany({ where: { gameId } })
    const maxOrder = gameImagesOrders.sort((a, b) => {
      if (a.order < b.order) return 1
      else if (a.order > b.order) return -1
      else return 0
    })[0]
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!gameAlredyExists || !user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.gameImages.create({
      data: {
        name,
        originalName,
        size,
        url: `${process.env.API_URL}/api/uploads/images/${name}`,
        gameId,
        order: order ? Number(order) : maxOrder.order + 1
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as capturas de tela.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getGameImages = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  const gameId = Number(req.params.gameId)

  try {
    const gameAlredyExists = await prisma.games.findUnique({
      where: { id: gameId },
      select: {
        name: true,
        id: true,
        images: true,
        videos: true,
        verticalCap: true,
        horizontalCap: true,
        gameBackgroundImage: true,
        gamePopularImage: true,
        gameIconImage: true
      }
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!gameAlredyExists || !user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    return res.status(200).json({ type: "success", response: gameAlredyExists })

  } catch (err: any) {
    return res.status(err.status ?? 500).json({ type: "error", response: error500Msg })
  }
}

export const putGameImage = async (req: Request, res: Response) => {
  const order = Number(req.body.order)
  const imageId = Number(req.params.imageId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const image = await prisma.gameImages.findUnique({ where: { id: imageId } })
    if (!image || !user) return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, image.gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    let img;

    if (image.order !== order) {
      img = await prisma.gameImages.update({
        where: { id: imageId },
        data: {
          order
        }
      })
      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] atualizou as capturas de tela.`,
          gameId: image.gameId,
          userId
        }
      })
    }

    return res.status(200).json({ type: "success", response: img ?? image })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const deleteGameImage = async (req: Request, res: Response) => {
  const imageId = Number(req.params.imageId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const imageExists = await prisma.gameImages.findUnique({ where: { id: imageId } })
    if (!imageExists) return res.status(400).json({ type: "error", response: "Imagem não encontrada!" })
    if (!user)
      return res.status(500).json({ type: "error", response: error500Msg })

    await UserIsDev(userId, imageExists.gameId)

    await prisma.gameImages.delete({
      where: { id: imageExists.id }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as capturas de tela.`,
        gameId: imageExists.gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Imagem deletada com sucesso" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const postGameImage = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId
  const tag = req.params.tag

  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    if (tag !== "gameBackgroundImage" &&
      tag !== "gameImageCap" &&
      tag !== "gamePopularImage" &&
      tag !== "gameImageVerticalCap" &&
      tag !== "gameImageHorizontalCap" &&
      tag !== "gameIconImage") return res.status(400).json({ type: "error", response: `Tag inválida!! - ${tag}` })

    const data = {
      name,
      originalName,
      size,
      url: `${process.env.API_URL}/api/uploads/images/${name}`,
      gameId
    }

    //@ts-ignore
    const existingImage = await prisma[tag].findUnique({
      where: { gameId: Number(gameId) }
    });

    if (existingImage) {
      //@ts-ignore
      await prisma[tag].update({
        where: { id: existingImage.id },
        data
      })
    } else {
      //@ts-ignore
      await prisma[tag].create({
        data
      })
    }

    const text = {
      gameBackgroundImage: "imagem de fundo",
      gameImageCap: "capa",
      gamePopularImage: "imagem de jogo popular",
      gameImageVerticalCap: "imagem vertical",
      gameImageHorizontalCap: "imagem horizontal",
      gameIconImage: "imagem de ícone"
    }

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou a ${text[tag]}.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const postGameDescriptionImages = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename, }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const gameId = Number(req.params.gameId)
  const { token: { userId } } = req.body

  try {
    const gameAlredyExists = await prisma.games.findUnique({ where: { id: gameId }, include: { gameDescriptionImages: true } })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!gameAlredyExists || !user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    const descriptionImage = await prisma.gameDescriptionImages.create({
      data: {
        name,
        originalName,
        size,
        url: `${process.env.API_URL}/api/uploads/images/${name}`,
        gameId,
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as imagens de descrição.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: descriptionImage })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


export const deleteGameDescriptionImage = async (req: Request, res: Response) => {
  const imageId = Number(req.params.imageId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const imageExists = await prisma.gameDescriptionImages.findUnique({ where: { id: imageId } })

    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    if (!imageExists) return res.status(400).json({ type: "error", response: "Imagem não encontrada!" })

    const isDev = await UserIsDev(userId, imageExists.gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.gameImages.delete({
      where: { id: imageExists.id }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as imagens de descrição.`,
        gameId: imageExists.gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Imagem deletada com sucesso" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

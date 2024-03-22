import { Request, Response } from "express"

import prisma from "../../libs/prisma"
import { error500Msg } from "../../utils/msgs"

type updateFavoritesReq = {
  games: string[]
  favorites: string[]
}

export const updateFavorites = async (req: Request, res: Response) => {
  const { games, favorites }: updateFavoritesReq = req.body
  const userId = req.body.token.userId

  try {
    const allgames = await prisma.games.findMany()
    games.concat(favorites).map(g => {
      return !allgames.some(game => game.id === Number(g)) ? res.status(400).json({ type: "error", response: "Você adquiriu este jogo" })
        : g
    })
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: games.map(gameId => ({ id: Number(gameId) })),
          connect: favorites.map(favId => ({ id: Number(favId) })),
        }
      }
    })

    return res.status(200).send({ type: "success", response: "OK" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const addToFavorites = async (req: Request, res: Response) => {
  const { gameId } = req.body
  const userId = req.body.token.userId

  try {

    const gameExists = await prisma.games.findUnique({ where: { id: gameId } })
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!gameExists || !userExists) return res.status(500).json({ type: "error", respomse: error500Msg })

    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: gameId }
        }
      }
    })

    return res.status(200).send({ type: "success", response: "OK" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const removeFromFavorites = async (req: Request, res: Response) => {
  const { gameId } = req.body
  const userId = req.body.token.userId

  try {

    const gameExists = await prisma.games.findUnique({ where: { id: gameId } })
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!gameExists || !userExists) return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: gameId }
        }
      }
    })

    return res.status(200).send({ type: "success", response: "OK" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.body.token.userId
  try {

    const favorites = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true }
    })
    return res.status(200).json({ type: "success", response: favorites })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

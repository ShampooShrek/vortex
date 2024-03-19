import { json, Request, Response } from "express";
import prisma from "../../libs/prisma";
import { Games, Transaction } from "@prisma/client";
import { error500Msg } from "../../utils/msgs";


export const addItemCart = async (req: Request, res: Response) => {
  const { gameId } = req.params
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { games: true, cart: true } })
    const game = await prisma.games.findUnique({
      where: { id: Number(gameId) },
      include: {
        gameIconImage: true,
        verticalCap: true,
        horizontalCap: true
      }
    })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const userHaveGame = user.games.some((games) => games.id === game.id)
    const cartHaveGame = user.cart.some((games) => games.id === game.id)
    if (userHaveGame || cartHaveGame) return res.status(400).json({ type: "error", response: "Você não pode adicionar um jogo que ja tem!!" })

    await prisma.user.update({
      where: { id: userId },
      data: { cart: { connect: { id: Number(gameId) } } }
    })

    return res.status(200).json({ type: "success", response: game })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getCartItems = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const userCart = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        cart: {
          include: {
            gameIconImage: true,
            verticalCap: true,
            horizontalCap: true
          }
        }
      }
    })

    if (userCart) {
      return res.status(200).json({ type: "success", response: userCart.cart })
    } else {
      return res.status(400).json({ type: "error", response: "Usuário não encontrado" })
    }
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const removeItemCart = async (req: Request, res: Response) => {
  const { gameId } = req.params
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { games: true } })
    const game = await prisma.games.findUnique({ where: { id: Number(gameId) } })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    await prisma.user.update({
      where: { id: userId },
      data: { cart: { disconnect: { id: Number(gameId) } } }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: true
      }
    })
    if (!user || user.cart.length < 1) return res.status(500).json({ type: "error", response: error500Msg })

    const totalPrice = user.cart.map(g => g.price! * (1 - (g.discount ?? 0))).reduce((p, c) => p + c)

    await prisma.transaction.create({
      data: {
        totalPrice: +totalPrice.toFixed(2),
        userId,
        games: { connect: user.cart.map(game => ({ id: game.id })) }
      },
    })

    const { games } = await prisma.user.update({
      where: { id: userId },
      data: {
        cart: { set: [] },
        games: { connect: user.cart.map(game => ({ id: game.id })) }
      },
      include: { games: true }
    })

    return res.status(200).json({ type: "success", response: games })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { transactions: { include: { games: { include: { horizontalCap: true, gameIconImage: true, verticalCap: true } } } } }
    })
    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    const transactions: any[] = []

    user.transactions.map(t => {
      const { buyDate, games, totalPrice } = t
      games.map(g => {
        const data = { ...g, buyDate, totalPrice }
        transactions.push(data)
      })
    })

    return res.status(200).json({ type: "success", response: transactions })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

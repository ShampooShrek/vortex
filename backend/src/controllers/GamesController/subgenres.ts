import { Request, Response } from "express"

import prisma from "../../libs/prisma"
import { error500Msg } from "../../utils/msgs"
import { UserIsDev, notExistsOrError } from "../../validations"

export const postSubgenres = async (req: Request, res: Response) => {
  const subgenre = req.body.subgenre
  const portugueseName = req.body.portugueseName

  try {

    const existsGenre = await prisma.subgenres.findUnique({
      where: { subgenre }
    })

    if (existsGenre) return res.status(400).json({ type: "error", response: "Subgênero ja existente!" })

    const genreCreated = await prisma.subgenres.create({
      data: {
        subgenre,
        portugueseName
      }
    })
    return res.status(200).json({ type: "success", response: genreCreated })
  } catch (err) {
    return res.status(400).send({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getSubgenres = async (req: Request, res: Response) => {
  try {
    const subgenres = await prisma.subgenres.findMany({
      orderBy: { portugueseName: "asc" }
    })

    return res.status(200).json({ type: "success", response: subgenres })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const postSubgenresInGames = async (req: Request, res: Response) => {
  const { subgenres }: { subgenres: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const DBSubgenres = await prisma.subgenres.findMany({
      where: { subgenre: { in: subgenres } },
      select: { subgenre: true }
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const ExistSubgenre = DBSubgenres.map((subgenre) => subgenre.subgenre);
    const nonExistGenre = subgenres.filter((Genre) => !ExistSubgenre.includes(Genre));

    if (nonExistGenre.length > 0) {
      return res.status(400).json({ type: "error", response: nonExistGenre })
    } else if (!game) return res.status(400).json({ type: "error", response: "Jogo não encontrado" })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        subgenres: { connect: subgenres.map(subgenre => ({ subgenre })) }
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os subgêneros.`,
        gameId,
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

export const removeSubgenreInGame = async (req: Request, res: Response) => {
  const { subgenres }: { subgenres: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { gameDevelopers: true } })
    if (!user) return res.status(500).json({ type: "error", response: error500Msg })


    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!game)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        subgenres: {
          disconnect: subgenres.map(subgenre => ({ subgenre: subgenre }))
        }
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os subgêneros.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Subgênero removida com sucesso!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const GetGamesWithCoisaInSubgenres = async (req: Request, res: Response) => {
  const subgenre = req.params.subgenreParam

  try {
    const subgenreExists = await prisma.subgenres.findUnique({ where: { subgenre } })
    if (!subgenreExists) return res.status(500).json({ type: "error", response: error500Msg })

    const getGamesWithTrem = await prisma.gameCategories.findMany({
      where: { games: { some: { subgenres: { some: { subgenre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 1,
    })

    const getGamesWithTwoCategories = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ subgenres: { some: { subgenre } } }, { categories: { some: { category: getGamesWithTrem[0].category } } }] },
      include: {
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true
      },
      take: 20
    })

    const getGamesWithgenres = await prisma.genres.findMany({
      where: { games: { some: { subgenres: { some: { subgenre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 1,
    })

    const getGamesWithgenre = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ subgenres: { some: { subgenre } } }, { genres: { some: { genre: getGamesWithgenres[0].genre } } }] },
      include: {
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true
      },
      take: 20
    })

    const getGamesWithSubgenres = await prisma.subgenres.findMany({
      where: { games: { some: { subgenres: { some: { subgenre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 2,
    })

    if (getGamesWithSubgenres[0].subgenre === subgenre) getGamesWithSubgenres.shift()

    const getGamesWithSubgenre = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ subgenres: { some: { subgenre } } }, { subgenres: { some: { subgenre: getGamesWithSubgenres[0].subgenre } } }] },
      include: {
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true
      },
      take: 20
    })

    const responseObject = [
      {
        section: `${subgenreExists.portugueseName} e ${getGamesWithTrem[0].portugueseName}`,
        games: getGamesWithTwoCategories
      },
      {
        section: `${subgenreExists.portugueseName} e ${getGamesWithgenres[0].portugueseName}`,
        games: getGamesWithgenre
      },
      {
        section: `${subgenreExists.portugueseName} e ${getGamesWithSubgenres[0].portugueseName}`,
        games: getGamesWithSubgenre
      }
    ]

    return res.status(200).json({ type: "success", response: responseObject })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

import { Request, Response } from "express"

import prisma from "../../libs/prisma"
import { error500Msg } from "../../utils/msgs"
import { UserIsDev, notExistsOrError } from "../../validations"

export const postGenres = async (req: Request, res: Response) => {
  const genre = req.body.genre
  const portugueseName = req.body.portugueseName

  try {
    const existsGenre = await prisma.genres.findUnique({
      where: { genre }
    })

    if (existsGenre) return res.status(400).json({ type: "error", response: "Gênero ja existente!" })

    const genreCreated = await prisma.genres.create({
      data: {
        genre,
        portugueseName
      }
    })
    return res.status(200).json({ type: "success", response: genreCreated })
  } catch (err) {
    return res.status(500).send({ type: "error", response: error500Msg })
  }

}

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genres.findMany({
      orderBy: { portugueseName: "asc" }
    })

    return res.status(200).json({ type: "success", response: genres })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


export const postGenreInGames = async (req: Request, res: Response) => {
  const { genres }: { genres: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const DBGenres = await prisma.genres.findMany({
      where: { genre: { in: genres } },
      select: { genre: true }
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const ExistGenre = DBGenres.map((genre) => genre.genre);
    const nonExistGenre = genres.filter((Genre) => !ExistGenre.includes(Genre));

    if (nonExistGenre.length > 0) {
      return res.status(400).json({ type: "error", response: nonExistGenre })
    }

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        genres: { connect: genres.map(genre => ({ genre })) }
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os gêneros.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const removeGenreInGame = async (req: Request, res: Response) => {
  const { genres }: { genres: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { gameDevelopers: true } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        genres: {
          disconnect: genres.map(genre => ({ genre: genre }))
        }
      }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou os gêneros.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Gêneros removidos com sucesso!!" })
  } catch (err: any) {
    return res.status(err.status ?? 500).json({ type: "error", response: err.msg ?? error500Msg })
  }

}

export const GetGamesWithCoisaInGenres = async (req: Request, res: Response) => {
  const genre = req.params.genreParam

  try {
    const genreExists = await prisma.genres.findUnique({ where: { genre } })
    if (!genreExists) return res.status(500).json({ type: "error", response: error500Msg })

    const getGamesWithTrem = await prisma.gameCategories.findMany({
      where: { games: { some: { genres: { some: { genre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 1,
    })

    const getGamesWithTwoCategories = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ genres: { some: { genre } } }, { categories: { some: { category: getGamesWithTrem[0].category } } }] },
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
      where: { games: { some: { genres: { some: { genre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 2,
    })

    if (getGamesWithgenres[0].genre === genre) getGamesWithgenres.shift()

    const getGamesWithgenre = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ genres: { some: { genre } } }, { genres: { some: { genre: getGamesWithgenres[0].genre } } }] },
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
      where: { games: { some: { genres: { some: { genre } } } } },
      orderBy: { games: { _count: "desc" } },
      take: 1,
    })

    const getGamesWithSubgenre = await prisma.games.findMany({
      where: { status: "ACEPTED", AND: [{ genres: { some: { genre } } }, { subgenres: { some: { subgenre: getGamesWithSubgenres[0].subgenre } } }] },
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
        section: `${genreExists.portugueseName} e ${getGamesWithTrem[0].portugueseName}`,
        games: getGamesWithTwoCategories
      },
      {
        section: `${genreExists.portugueseName} e ${getGamesWithgenres[0].portugueseName}`,
        games: getGamesWithgenre
      },
      {
        section: `${genreExists.portugueseName} e ${getGamesWithSubgenres[0].portugueseName}`,
        games: getGamesWithSubgenre
      }
    ]

    return res.status(200).json({ type: "success", response: responseObject })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}


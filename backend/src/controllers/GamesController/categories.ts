import { GameCategories } from "@prisma/client"
import { Request, Response } from "express"

import prisma from "../../libs/prisma"
import { error500Msg } from "../../utils/msgs"
import { UserIsDev, notExistsOrError } from "../../validations"
export const postCategory = async (req: Request, res: Response) => {
  const { portugueseName, category, imgUrl } = req.body

  try {
    const existsCategory = await prisma.gameCategories.findUnique({
      where: { category }
    })

    if (existsCategory) return res.status(400).json({ type: "error", response: "Está categoria ja existe!" })

    const categoryCreated = await prisma.gameCategories.create({
      data: {
        category: category,
        portugueseName,
        imgUrl
      }
    })

    return res.status(200).json({ type: "success", response: categoryCreated })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.gameCategories.findMany({
      orderBy: { portugueseName: "asc" },
      include: { games: { take: 1, where: { isActive: true } } }
    })

    const response = categories.filter(c => c.games.length > 0)

    return res.status(200).json({ type: "success", response })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const getGameByCategories = async (req: Request, res: Response) => {
  const { categories }: { categories: string[] } = req.body

  try {
    const games = await prisma.games.findMany({
      where: {
        AND: categories.map(category => ({ categories: { some: { category } } }))
      },
      include: {
        categories: true,
        avaliations: { where: { deleted: false } },
        imageCap: true,
        images: true,
        videos: true,
        requesites: true,
        achievements: true,
      }
    })

    return res.status(200).json({ type: "success", response: games })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const postCategoyInGames = async (req: Request, res: Response) => {
  const { categories }: { categories: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const DBCategories = await prisma.gameCategories.findMany({
      where: { category: { in: categories } },
      select: { category: true }
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game) return res.status(500).json({ type: "error", response: error500Msg })

    const existingCategory = DBCategories.map((category) => category.category);
    const nonExistingCategory = categories.filter((category) => !existingCategory.includes(category));

    if (nonExistingCategory.length > 0) {
      return res.status(400).json({ type: "error", response: nonExistingCategory })
    } else if (!game || !user) return res.status(400).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        categories: { connect: categories.map(cat => ({ category: cat })) }
      }
    })


    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as categorias.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }

}

export const removeCategoryInGame = async (req: Request, res: Response) => {
  const { categories }: { categories: string[] } = req.body
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(500).json({ type: "error", response: "macacooo!!" })


    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!game)
      return res.status(500).json({ type: "error", response: "no game!" })

    UserIsDev(userId, gameId)

    if (categories.length > 0) {
      await prisma.games.update({
        where: { id: gameId },
        data: {
          categories: {
            disconnect: categories.map(cat => ({ category: cat }))
          }
        }
      })
    }

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] atualizou as categorias.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "Categoria removida com sucesso!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

export const GetGamesWithCoisaInCategories = async (req: Request, res: Response) => {
  const category = req.params.categoryParam

  try {
    const categoryExists = await prisma.gameCategories.findUnique({ where: { category } })
    if (!categoryExists) return res.status(500).json({ type: "error", response: error500Msg })

    let getGamesWithTwoCategories: any;
    let getGamesWithgenre: any;
    let getGamesWithSubgenre: any;

    const [getGamesWithCategories, getGamesWithgenres, getGamesWithSubgenres] = await Promise.all([
      prisma.gameCategories.findMany({
        where: { games: { some: { categories: { some: { category } } } } },
        orderBy: { games: { _count: "desc" } },
        take: 2,
      }),

      prisma.genres.findMany({
        where: { games: { some: { categories: { some: { category } } } } },
        orderBy: { games: { _count: "desc" } },
        take: 1,
      }),

      prisma.subgenres.findMany({
        where: { games: { some: { categories: { some: { category } } } } },
        orderBy: { games: { _count: "desc" } },
        take: 1,
      })
    ])

    if (getGamesWithCategories.length > 0) {
      if (getGamesWithCategories[0].category === category) getGamesWithCategories.shift()

      getGamesWithTwoCategories = await prisma.games.findMany({
        where: { status: "ACEPTED", AND: [{ categories: { some: { category } } }, { categories: { some: { category: getGamesWithCategories[0].category } } }] },
        include: {
          horizontalCap: true,
          verticalCap: true,
          categories: true,
          genres: true,
          subgenres: true
        },
        take: 18
      })
    }

    if (getGamesWithgenres.length > 0) {
      getGamesWithgenre = await prisma.games.findMany({
        where: { status: "ACEPTED", AND: [{ categories: { some: { category } } }, { genres: { some: { genre: getGamesWithgenres[0].genre } } }] },
        include: {
          horizontalCap: true,
          verticalCap: true,
          categories: true,
          genres: true,
          subgenres: true
        },
        take: 18
      })
    }

    if (getGamesWithSubgenres.length > 0) {
      getGamesWithSubgenre = await prisma.games.findMany({
        where: { status: "ACEPTED", AND: [{ categories: { some: { category } } }, { subgenres: { some: { subgenre: getGamesWithSubgenres[0].subgenre } } }] },
        include: {
          horizontalCap: true,
          verticalCap: true,
          categories: true,
          genres: true,
          subgenres: true
        },
        take: 18
      })
    }


    const responseObject = [
      {
        section: `${categoryExists.portugueseName} e ${getGamesWithCategories[0] ? getGamesWithCategories[0].portugueseName : ""}`,
        games: getGamesWithTwoCategories
      },
      {
        section: `${categoryExists.portugueseName} e ${getGamesWithgenres[0] ? getGamesWithgenres[0].portugueseName : ""}`,
        games: getGamesWithgenre
      },
      {
        section: `${categoryExists.portugueseName} e ${getGamesWithSubgenres[0] ? getGamesWithSubgenres[0].portugueseName : ""}`,
        games: getGamesWithSubgenre
      }
    ]

    return res.status(200).json({ type: "success", response: responseObject })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  }
}

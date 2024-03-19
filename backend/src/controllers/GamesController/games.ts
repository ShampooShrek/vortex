import { Avaliations, Games, User } from "@prisma/client"
import { Request, Response, text } from "express"

import prisma from "../../libs/prisma"
import { UserIsDev, existsOrNot } from "../../validations"
import { SendMails } from "../../utils/sendEmail"
import calcPercent from "../../utils/calcPercent"
import { error500Msg, noAuthorizationMsg } from "../../utils/msgs"

interface putGameBody extends Games {
  token: any
  developers: any
}

export const postGame = async (req: Request, res: Response) => {
  const { name }: Games = req.body
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const game = await prisma.games.create({
      data: {
        name: name.trim(),
        developers: { connect: { id: user.id } }
      }
    })
    return res.status(201).json({ type: "success", response: game })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getGames = async (req: Request, res: Response) => {
  const games = await prisma.games.findMany({
    where: {
      status: "ACEPTED"
    },
    include: {
      categories: true,
      genres: true,
      subgenres: true,
      horizontalCap: true,
      verticalCap: true,
      gameBackgroundImage: true,
      gameIconImage: true,
      gamePopularImage: true,
      images: { orderBy: { order: "desc" } },
      videos: { orderBy: { order: "desc" } },
      avaliations: { where: { deleted: false } },
    }
  })
  return res.status(200).send({ type: "success", response: games })
}

export const getGame = async (req: Request, res: Response) => {
  const gameId: number = +req.params.gameId

  try {
    const game = await prisma.games.findUnique({
      where: {
        id: gameId,

      },
      include: {
        categories: true,
        avaliations: {
          where: { deleted: false },
          select: {
            id: true,
            avaliation: true,
            comment: true,
            title: true,
            userDateGameTime: true,
            avaliationLikes: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                nickname: true,
                image: true,
              }
            },

          }
        },
        images: { orderBy: { order: "desc" } },
        videos: { orderBy: { order: "desc" } },
        horizontalCap: true,
        requesites: true,
        achievements: {
          orderBy: { gameId: "desc" },
          include: { image: true }
        },
        genres: true,
        subgenres: true,
        developers: { select: { id: true, nickname: true, image: { select: { originalName: true, url: true } } } },
      }
    })

    if (!game || !game.isActive || game.status !== "ACEPTED") {
      return res.status(400).json({ type: "error", response: "Jogo não encontrado" })
    }

    //@ts-ignore
    const avaliationsPercent = calcPercent(game.avaliations)

    return res.status(200).json({
      type: "success",
      response: { ...game, avaliationsPercent }
    })
  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getBetaGame = async (req: Request, res: Response) => {
  const gameId: number = +req.params.gameId
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) return res.status(500).json({ type: "error", response: error500Msg })

    const game = await prisma.games.findUnique({
      where: {
        id: gameId,
      },
      include: {
        categories: true,
        avaliations: {
          where: { deleted: false },
          select: {
            id: true,
            avaliation: true,
            comment: true,
            title: true,
            userDateGameTime: true,
            avaliationLikes: true,
            user: {
              select: {
                id: true,
                nickname: true,
                image: true,
              }
            },

          }
        },
        images: { orderBy: { order: "desc" } },
        videos: { orderBy: { order: "asc" } },
        dlcs: true,

        gameIconImage: true,
        gamePopularImage: true,
        verticalCap: true,
        horizontalCap: true,
        gameDescriptionImages: true,
        gamesRanting: true,
        requesites: true,
        achievements: {
          orderBy: { gameId: "desc" },
          include: { image: true }
        },
        genres: true,
        subgenres: true,
        developers: { select: { id: true, nickname: true, image: { select: { originalName: true, url: true } } } },
      }
    })

    if (!game) {
      return res.status(400).json({ type: "error", response: "Jogo não encontrado" })
    }

    const isDev = UserIsDev(userId, gameId)

    if (!isDev && !user.isAdm) {
      return res.status(401).json({ type: "error", response: "Sem permissão para acessar está pagina!" })
    }

    return res.status(200).json({ type: "success", response: game })
  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getGameEdit = async (req: Request, res: Response) => {
  const gameId: number = +req.params.gameId
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { gameDevelopers: true }
    })

    if (!user)
      return res.status(500).json({ type: "error", response: error500Msg })

    const userIsGameDeveloper = user.gameDevelopers.find(g => g.id === Number(gameId))

    if (!userIsGameDeveloper) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    const game = await prisma.games.findUnique({
      where: {
        id: gameId
      },
      include: {
        categories: true,
        images: { orderBy: { order: "asc" } },
        videos: { orderBy: { order: "asc" } },
        dlcs: true,
        arquive: true,
        gameDescriptionImages: true,
        gameBackgroundImage: true,

        gamePopularImage: true,
        gameIconImage: true,
        horizontalCap: true,
        verticalCap: true,
        requesites: true,
        achievements: {
          orderBy: { gameId: "desc" },
          include: { image: true }
        },
        genres: true,
        subgenres: true,
        developers: { include: { image: true } }
      }
    })

    return res.status(200).json({ type: "success", response: game })
  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getGameDevelopers = async (req: Request, res: Response) => {
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { gameDevelopers: { include: { gameIconImage: true } } } })

    if (!user) return res.status(400).json({ type: "error", response: "Usuário não encontrado!" })

    const games = user.gameDevelopers

    return res.status(200).json({ type: "success", response: games })
  } catch (e: any) {
    return res.status(e.status ?? 500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const putGame = async (req: Request, res: Response) => {
  const data: putGameBody = req.body
  const developers: string[] = req.body.developers
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId }, include: { developers: true } })

    if (!user || !game)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    if (data.discount && data.discount > 0) {
      const users = await prisma.games.findUnique({
        where: { id: gameId },
        select: {
          carts: { select: { name: true, email: true } },
          wishList: { select: { name: true, email: true } }
        }
      })
      if (users) {
        await SendMails([...users.carts, ...users.wishList],
          `DISCONTO DE %${data.discount * 100} NA COMPRA DE ${game.name.toUpperCase()}!!!!`)
      }
    }

    if (data.name && data.name === "" || (data.description && data.description === "")) {
      return res.status(400).json({ type: "error", response: "Preencha os campos corretamente!!" })
    }

    if (!data.name || data.name === "") {
      return res.status(400).json({ type: "error", response: "Preencha os campos corretamente!!" })
    }
    if (data.discount && data.discount > 1) {
      return res.status(400).json({ type: "error", response: "Valor de desconto inválido" })
    }

    if (data.token) delete data.token

    if (developers.length > 0) {
      const newDevelopers = developers.filter(dev => !game.developers.some(d => d.id === dev))
      const removedDevelopers = game.developers.filter((dev) => !developers.includes(dev.id)).map(d => d.id)

      await prisma.games.update({
        where: { id: Number(gameId) },
        data: {
          developers: {
            disconnect: removedDevelopers.map(id => ({ id })),
            connect: newDevelopers.map(id => ({ id }))
          }
        }
      })
    }

    if (data.developers) delete data.developers

    const gameUpdate = await prisma.games.update({
      where: { id: gameId },
      data: { ...data }
    })


    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] alterou os dados básicos do jogo.`,
        gameId,
        userId
      }
    })

    return res.status(201).json({ type: "success", response: gameUpdate })
  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const putGameDescription = async (req: Request, res: Response) => {
  const description = req.body.description
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    existsOrNot(description, "Descrição vazia")

    const gameUpdate = await prisma.games.update({
      where: { id: gameId },
      data: { description }
    })

    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] alterou a descrição.`,
        gameId,
        userId
      }
    })

    return res.status(201).json({ type: "success", response: gameUpdate })
  } catch (e: any) {
    return res.status(400).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const publisherGame = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({
      where: { id: gameId },
      include: {
        categories: true,
        images: { orderBy: { order: "asc" } },
        arquive: true,
        gameBackgroundImage: true,

        gamePopularImage: true,
        gameIconImage: true,
        horizontalCap: true,
        verticalCap: true,
        requesites: true,
        achievements: {
          orderBy: { gameId: "desc" },
          include: { image: true }
        },
        genres: true,
        subgenres: true,
        developers: { include: { image: true } },
      }
    })

    if (!user || !game)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    if (!game.name || !game.synopsi || !game.description || !game.price || game.price < 0
      || game.categories.length < 1 || game.genres.length < 1 || game.subgenres.length < 1 || !game.arquive || game.images.length < 4
      || !game.gameIconImage || !game.gameBackgroundImage || !game.horizontalCap || !game.verticalCap || !game.requesites || !game.gamePopularImage
      || game.achievements.length < 4 || game.developers.length < 1) {
      return res.status(400).json({ type: "error", response: "Alguns dados ainda não foram preenchidos ou foram preenchidos incorretamente!" })
    }

    await prisma.games.update({
      where: { id: gameId },
      data: {
        status: "PENDING"
      }
    })


    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] enviou o jogo para a análise.`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!" })

  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const CancelSendGame = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })

    if (!user || !game)
      return res.status(500).json({ type: "error", response: error500Msg })


    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        status: "DEVELOPING"
      }
    })


    await prisma.gameUpdateHistoric.create({
      data: {
        message: `Usuário [nickname] alterou o jogo para o modo desenvolvimento`,
        gameId,
        userId
      }
    })

    return res.status(200).json({ type: "success", response: "OK!" })

  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const desactiveGame = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    if (!game || !user || !user.isAdm)
      return res.status(500).json({ type: "error", response: error500Msg })

    const isDev = await UserIsDev(userId, gameId)
    if (typeof isDev !== "boolean") return res.status(isDev.status).json({ type: "error", response: isDev.msg })

    await prisma.admGameAction.create({
      data: {
        admId: userId,
        gameId,
        action: "DISABLE"
      }
    })
    await prisma.games.update({ where: { id: gameId }, data: { isActive: false } })

    return res.status(200).json({ type: "success", response: "Jogo desativado com sucesso!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const activeGame = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)
  const userId = req.body.userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    if (!game || !user || !user.isAdm)
      return res.status(500).json({ type: "error", response: error500Msg })

    if (!user.isAdm)
      return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    await prisma.admGameAction.create({
      data: {
        admId: userId,
        gameId,
        action: "ACEPTED"
      }
    })

    await prisma.games.update({ where: { id: gameId }, data: { isActive: true } })
    return res.status(200).json({ type: "success", response: "Jogo ativado com sucesso!!" })
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const getDesactivedGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.games.findMany({ where: { isActive: false } })
    return res.status(200).json({ type: "success", response: games })

  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const changeGameStatus = async (req: Request, res: Response) => {
  const { status }: Games = req.body
  const userId = req.body.token.userId
  const gameId = Number(req.params.gameId)

  try {
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return res.status(500).json({ type: "error", response: error500Msg })
    }

    if (!user.isAdm) return res.status(401).json({ type: "error", response: noAuthorizationMsg })

    if (!game)
      return res.status(400).json({ type: "error", response: "Jogo não encontrado!" })
    if (status !== "ACEPTED" && status !== "DECLINED")
      return res.status(400).json({ type: "error", response: "Requesição inválida!" })

    await prisma.games.update({
      where: { id: gameId },
      data: {
        status
      }
    })

    await prisma.admGameAction.create({
      data: {
        gameId,
        admId: userId,
        action: status,
      }
    })

    return res.status(200).json({ type: "success", response: game })
  } catch (err: any) {
    return res.status(err.status ?? 500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}

export const getGameAvaliations = async (req: Request, res: Response) => {
  const gameId: number = Number(req.params.gameId)

  try {
    const game = await prisma.games.findUnique({ where: { id: gameId } })
    if (!game) return res.status(400).json({ type: "error", response: error500Msg })

    const avaliations = await prisma.avaliations.findMany({
      where: {
        gameId,
        deleted: false
      }
    })

    return res.status(200).json({ type: "success", response: avaliations })
  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getGameImagesAndVideos = async (req: Request, res: Response) => {
  const gameId = Number(req.params.gameId)

  try {
    const gameAndVideos = await prisma.games.findUnique({
      where: {
        id: gameId
      },
      select: {
        videos: { orderBy: { order: "asc" } },
        images: true
      }
    })
    return res.status(200).json({ type: "success", response: gameAndVideos })

  } catch (e: any) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const getPopulars = async () => {
  const today = new Date()
  const lastMonth = new Date(today)
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  try {
    const popularGames = await prisma.games.findMany({
      where: {
        transaction: {
          every: {
            AND: [{ buyDate: { gte: lastMonth } }, { buyDate: { lte: today } }]
          }
        },
        status: "ACEPTED"
      },
      include: {
        gamePopularImage: true,
        verticalCap: true
      },
      orderBy: { transaction: { _count: "desc" } },
    })



    return popularGames
  } catch (err) {
    return error500Msg
  } finally {
    await prisma.$disconnect()
  }
}

export const GetBetterOfCategory = async (req: Request, res: Response) => {
  const { categoryParam } = req.params

  try {
    const games = await prisma.gameCategories.findUnique({
      where: { category: categoryParam },
      select: {
        games: {
          where: {
            status: "ACEPTED"
          },
          orderBy: { transaction: { _count: "desc" } },
          include: {
            avaliations: { select: { avaliation: true }, where: { deleted: false } },
            gameBackgroundImage: true,
            horizontalCap: true,
            verticalCap: true,
            categories: true,
            genres: true,
            subgenres: true
          },
          take: 8
        }
      }
    })


    if (!games) return res.status(400).json({ type: "error", response: "Categoria não encontrada!" })

    const gamesWithPercent = games.games.map(g => {
      const percent = calcPercent(g.avaliations ?? [])
      return { ...g, avaliationsPercent: percent }
    })

    return res.status(200).json({ type: "success", response: gamesWithPercent })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const GetBetterOfGenre = async (req: Request, res: Response) => {
  const { genreParam } = req.params
  let genreName: string
  genreName = genreParam.split("_").join(" ")
  try {
    const games = await prisma.genres.findUnique({
      where: { genre: genreName },
      select: {
        games: {
          where: { status: "ACEPTED" },
          orderBy: { transaction: { _count: "desc" } },
          include: {
            avaliations: { select: { avaliation: true }, where: { deleted: false } },
            gameBackgroundImage: true,
            horizontalCap: true,
            verticalCap: true,
            categories: true,
            genres: true,
            subgenres: true
          },
          take: 8
        }
      }
    })

    if (!games) return res.status(400).json({ type: "error", response: "Genero não encontrada!" })

    const gamesWithPercent = games.games.map(g => {
      const percent = calcPercent(g.avaliations ?? [])
      return { ...g, avaliationsPercent: percent }
    })

    return res.status(200).json({ type: "success", response: gamesWithPercent })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const GetBetterOfSubgenre = async (req: Request, res: Response) => {
  const { subgenreParam } = req.params
  let subgenreName: string
  subgenreName = subgenreParam.split("_").join(" ")
  try {
    const games = await prisma.subgenres.findUnique({
      where: { subgenre: subgenreName },
      select: {
        games: {
          where: { status: "ACEPTED" },
          orderBy: { transaction: { _count: "desc" } },
          include: {
            avaliations: { select: { avaliation: true }, where: { deleted: false } },
            gameBackgroundImage: true,
            horizontalCap: true,
            verticalCap: true,
            categories: true,
            genres: true,
            subgenres: true
          },
          take: 8
        }
      }
    })

    if (!games) return res.status(400).json({ type: "error", response: "Categoria não encontrada!" })

    const gamesWithPercent = games.games.map(g => {
      const percent = calcPercent(g.avaliations ?? [])
      return { ...g, avaliationsPercent: percent }
    })

    return res.status(200).json({ type: "success", response: gamesWithPercent })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const FilterGamesByTags = async (req: Request, res: Response) => {
  const limit = 3
  const page = Number(req.query.page) || 1
  const mainTag = req.params.tag
  const filterBy = req.body.filter
  const categories: string[] = req.body.categories ?? []
  const genres: string[] = req.body.genres ?? []
  const subgenres: string[] = req.body.subgenres ?? []

  try {
    let games

    if (filterBy === "mostsallers") {
      games = await prisma.games.findMany({
        where: {
          AND: [
            {
              OR: [
                { categories: { some: { category: mainTag } } },
                { genres: { some: { genre: mainTag } } },
                { subgenres: { some: { subgenre: mainTag } } }
              ]
            },
            { AND: categories.map(cat => ({ categories: { some: { category: cat } } })) },
            { AND: genres.map(genre => ({ genres: { some: { genre: genre } } })) },
            { AND: subgenres.map(subgenre => ({ subgenres: { some: { subgenre: subgenre } } })) },
            { status: "ACEPTED" },
          ],
        },
        include: {
          images: { orderBy: { order: "desc" } },
          horizontalCap: true,
          categories: true,
          genres: true,
          subgenres: true,
          avaliations: {
            select: { avaliation: true }, where: { deleted: false },
          },
          _count: { select: { transaction: true } }
        },
        orderBy: {
          transaction: { _count: "asc" }
        },
        take: limit,
        skip: (page * limit) - limit
      })
    } else if (filterBy === "promotions") {
      games = await prisma.games.findMany({
        where: {
          AND: [
            {
              OR: [
                { categories: { some: { category: mainTag } } },
                { genres: { some: { genre: mainTag } } },
                { subgenres: { some: { subgenre: mainTag } } }
              ]
            },
            { AND: categories.map(cat => ({ categories: { some: { category: cat } } })) },
            { AND: genres.map(genre => ({ genres: { some: { genre: genre } } })) },
            { AND: subgenres.map(subgenre => ({ subgenres: { some: { subgenre: subgenre } } })) },
            { status: "ACEPTED" },
          ],
          discount: { gt: 0 }
        },
        include: {
          images: { orderBy: { order: "desc" } },
          horizontalCap: true,
          categories: true,
          genres: true,
          subgenres: true,
          avaliations: {
            select: { avaliation: true }, where: { deleted: false },
          }
        },
        take: limit,
        skip: (page * limit) - limit
      })
    } else {
      games = await prisma.games.findMany({
        where: {
          AND: [
            {
              OR: [
                { categories: { some: { category: mainTag } } },
                { genres: { some: { genre: mainTag } } },
                { subgenres: { some: { subgenre: mainTag } } }
              ]
            },
            { AND: categories.map(cat => ({ categories: { some: { category: cat } } })) },
            { AND: genres.map(genre => ({ genres: { some: { genre: genre } } })) },
            { AND: subgenres.map(subgenre => ({ subgenres: { some: { subgenre: subgenre } } })) },
            { status: "ACEPTED" },
          ],
        },
        include: {
          images: { orderBy: { order: "desc" } },
          horizontalCap: true,
          categories: true,
          genres: true,
          subgenres: true,
          avaliations: {
            select: { avaliation: true }, where: { deleted: false },
          },
        },
        take: limit,
        skip: (page * limit) - limit
      })

    }

    if (filterBy === "betteravaliations") {
      const gamesSortingAvaliations = games!.sort((gameA, gameB) => {
        //@ts-ignore
        const percentA = calcPercent(gameA.avaliations)
        //@ts-ignore
        const percentB = calcPercent(gameB.avaliations)

        return percentB - percentA
      })
      return res.status(200).json({ type: "success", response: { games: gamesSortingAvaliations, limit } })
    }

    return res.status(200).json({ type: "success", response: { games, limit } })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

interface Game {
  name: string
  createdAt: string;
  price: number | null;
  discount: number | null;
  avaliationsPercent: number;
}

const orderByGames = (games: Game[], sortingBy: string | null): Game[] => {
  if (!sortingBy) {
    return games
  }

  switch (sortingBy) {
    case "mostnew":
      return games.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case "mostolder":
      return games.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    case "namedesc":
      return games.sort((a, b) => b.name.localeCompare(a.name))
    case "nameasc":
      return games.sort((a, b) => a.name.localeCompare(b.name))
    case "mostexpensive":
      return games.sort((a, b) => ((b.price ?? 0) * (1 - (b.discount ?? 0))) - ((a.price ?? 0) * (1 - (a.discount ?? 0))))
    case "mostcheaper":
      return games.sort((a, b) => ((a.price ?? 0) * (1 - (a.discount ?? 0))) - ((b.price ?? 0) * (1 - (b.discount ?? 0))))
    case "mostrated":
      return games.sort((a, b) => b.avaliationsPercent - a.avaliationsPercent)
    case "worstrated":
      return games.sort((a, b) => a.avaliationsPercent - b.avaliationsPercent)
    default:
      return games
  }
}


export const MainSearchGames = async (req: Request, res: Response) => {
  const token: null | any = req.body.token
  let userId = null
  const { categories, genres, subgenres }:
    { categories: number[], genres: number[], subgenres: number[] } = req.body
  const ocultUserPurshadGames: boolean = req.body.ocultUserPurshadGames
  const especialOffers: boolean = req.body.especialOffers
  const maxPrice = req.body.maxPrice
  const search = req.body.name
  let sortingBy = req.body.sorting

  const limit = 2
  const page = Number(req.query.page) || 1

  const sortingByOptions = [
    "mostnew",
    "mostolder",
    "nameasc",
    "namedesc",
    "mostexpensive",
    "mostcheaper",
    "mostrated",
    "worstrated"
  ]

  if (!sortingByOptions.includes(sortingBy)) sortingBy = null

  if (token) userId = token.userId

  try {
    let user;
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: { games: true }
      })

    }

    if (user) {
      let games = await prisma.games.findMany({
        where: {
          AND: [
            { AND: categories.map(cat => ({ categories: { some: { id: cat } } })) },
            { AND: genres.map(genre => ({ genres: { some: { id: genre } } })) },
            { AND: subgenres.map(subgenre => ({ subgenres: { some: { id: subgenre } } })) },
            { AND: ocultUserPurshadGames ? user.games.map(g => ({ id: { not: { equals: g.id } } })) : {} },
            { discount: especialOffers ? { gte: 0.5 } : {} },
            { name: search ? { mode: "insensitive", contains: search } : {} },
            { status: "ACEPTED" }
          ],
        },
        include: {
          images: { orderBy: { order: "desc" } },
          horizontalCap: true,
          categories: true,
          genres: true,
          subgenres: true,
          avaliations: {
            where: { deleted: false },
            select: { avaliation: true }
          }
        },
        take: limit,
        skip: (page * limit) - limit
      }) as any

      if (games) {
        if (maxPrice !== null) {
          games = games.filter((g: any) => g.price! * (1 - (g.discount ?? 0)) <= maxPrice)
        }

        games = games.map((g: any) => g.avaliations.length ? ({ ...g, avaliationsPercent: calcPercent(g.avaliations!) })
          : ({ ...g, avaliationsPercent: 0 }))

        games = orderByGames(games as Game[], sortingBy)

        return res.status(200).json({ type: "success", response: { games, limit } })
      }
    } else {
      let games = await prisma.games.findMany({
        where: {
          AND: [
            { AND: categories.map(cat => ({ categories: { some: { id: cat } } })) },
            { AND: genres.map(genre => ({ genres: { some: { id: genre } } })) },
            { AND: subgenres.map(subgenre => ({ subgenres: { some: { id: subgenre } } })) },
            { discount: especialOffers ? { gte: 0.5 } : {} },
            { name: search ? { mode: "insensitive", contains: search } : {} },
            { status: "ACEPTED" }
          ],
        },
        include: {
          images: { orderBy: { order: "desc" } },
          horizontalCap: true,
          categories: true,
          genres: true,
          subgenres: true,
        },
        take: 20,
      }) as any

      if (games) {
        if (maxPrice) {
          games = games.filter((g: any) => {
            return (g.price! * (g.discount! > 0 ? g.discount! : 1)) <= maxPrice
          })
        }

        games = games.map((g: any) => g.avaliations.length ? ({ ...g, avaliationsPercent: calcPercent(g.avaliations!) })
          : ({ ...g, avaliationsPercent: 0 }))

        games = orderByGames(games as Game[], sortingBy)

        return res.status(200).json({ type: "success", response: { games, limit } })
      }
    }

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const GetFilters = async (req: Request, res: Response) => {
  try {
    const [categories, genres, subgenres] = await Promise.all([
      prisma.gameCategories.findMany(),
      prisma.genres.findMany(),
      prisma.subgenres.findMany()
    ])

    return res.status(200).json({ type: "success", response: { categories, genres, subgenres } })

  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}



export const GetGameDevelopers = async (req: Request, res: Response) => {
  const { gameId } = req.params

  try {
    const game = await prisma.games.findUnique({
      where: { id: Number(gameId) },
      include: {
        verticalCap: true,
        horizontalCap: true,
        developers: { include: { image: true } }
      }
    })
    if (!game) return res.status(400).json({ type: "error", response: "Jogo não encontrado!" })
    return res.status(200).json({ type: "success", response: game })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

export const NewGames = async () => {
  try {
    const newGames = await prisma.games.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: "ACEPTED" },
      include: {
        images: { orderBy: { order: "desc" } },
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true,
      },
      take: 12
    })


    return newGames

  } catch (err) {
    return error500Msg
  }
}

export const BestSelleres = async () => {
  try {
    const today = new Date()
    const lastMonth = new Date(today)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const games = await prisma.games.findMany({
      orderBy: { transaction: { _count: "desc" } },
      where: { status: "ACEPTED" },
      include: {
        images: { orderBy: { order: "desc" } },
        horizontalCap: true,
        categories: true,
        genres: true,
        subgenres: true,
      },
      take: 12
    })

    return games

  } catch (err) {
    return error500Msg
  }
}

export const BetterAvaliations = async () => {
  try {
    const allGames = await prisma.games.findMany({
      where: { status: "ACEPTED" },
      include: {
        avaliations: { where: { deleted: false } },
        images: { orderBy: { order: "desc" } },
        horizontalCap: true,
        categories: true,
        genres: true,
        subgenres: true,
      }
    })

    const gamesWithAvaliations = allGames.filter(g => g.avaliations.length > 0).sort((gameA, gameB) => {
      //@ts-ignore
      const percentA = calcPercent(gameA.avaliations)
      //@ts-ignore
      const percentB = calcPercent(gameB.avaliations)

      return percentB - percentA
    })

    return gamesWithAvaliations.slice(0, 12)

  } catch (err) {
    return error500Msg
  }
}

export const GameWithPromotions = async () => {
  try {
    const gamesWithPromotions = await prisma.games.findMany({
      where: { discount: { gt: 0 }, status: "ACEPTED" },
      include: {
        images: { orderBy: { order: "desc" } },
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true,
      },
      orderBy: { discount: "desc" },
      take: 12,
    })
    return gamesWithPromotions

  } catch (err) {
    return error500Msg
  }
}

export const EspecialPromotions = async () => {
  try {
    const especialPromotions = await prisma.games.findMany({
      where: { discount: { gte: 0.5 }, status: "ACEPTED" },
      include: {
        images: { orderBy: { order: "desc" } },
        horizontalCap: true,
        verticalCap: true,
        categories: true,
        genres: true,
        subgenres: true,
      },
      orderBy: { transaction: { _count: "asc" } },
      take: 10
    })

    return especialPromotions

  } catch (err) {
    return error500Msg
  }
}

export const GetGamesByName = async (req: Request, res: Response) => {
  const name = req.params.name

  try {
    const games = await prisma.games.findMany({
      where: { name: { mode: "insensitive", contains: name }, status: "ACEPTED" },
      orderBy: { name: "desc" },
      include: { horizontalCap: true, gameIconImage: true, verticalCap: true },
      take: 5
    })

    return res.status(200).json({ type: "success", response: games })
  } catch (err) {
    return res.status(500).json({ type: "error", response: error500Msg })
  } finally {
    await prisma.$disconnect()
  }
}

interface RecomendedGamesType {
  matchs: number
  gameId: number
}

export const RecomendedGames = async (userId: string | null) => {
  if (!userId) return null
  try {
    const userGames = await prisma.games.findMany({
      where: { users: { some: { id: userId } } },
      select: {
        id: true,
        categories: true, subgenres: true, genres: true
      },
    })

    const allGames = await prisma.games.findMany({
      where: { id: { notIn: userGames.map(g => g.id) }, status: "ACEPTED" },
      select: {
        id: true,
        categories: true, subgenres: true, genres: true
      }
    })

    const tags = new Set<string>()
    userGames.map(g => {
      g.categories.forEach(c => tags.add(c.category))
      g.genres.forEach(g => tags.add(g.genre))
      g.subgenres.forEach(sub => tags.add(sub.subgenre))
    })

    const gamesMatchs: RecomendedGamesType[] = []

    allGames.forEach(game => {
      let matchs = 0;
      game.categories.forEach(c => tags.has(c.category) && matchs++)
      game.genres.forEach(g => tags.has(g.genre) && matchs++)
      game.subgenres.forEach(sub => tags.has(sub.subgenre) && matchs++)
      gamesMatchs.push({ matchs, gameId: game.id })
    })

    const gamesMatchsIds = gamesMatchs.sort((a, b) => {
      if (a.matchs > b.matchs) return -1;
      else if (a.matchs < b.matchs) return 1;
      else return 0;
    }).slice(0, 20).map(g => g.gameId)

    const recomendedGames = await prisma.games.findMany({
      where: { id: { in: gamesMatchsIds } },
      include: { verticalCap: true }
    })

    return recomendedGames.slice(0, 10)

  } catch (err) {
    return error500Msg
  }
}

export const HomeRequest = async (req: Request, res: Response) => {
  let userId: string | null = null
  if (req.body.token) userId = req.body.token.userId

  try {
    const categoriesPromise = prisma.gameCategories.findMany({
      include: {
        games: {
          take: 1,
          where: { isActive: true }
        }
      }
    });

    const [especialPromotions, popularGames, recomendedGames, categories] = await Promise.all([
      EspecialPromotions(),
      getPopulars(),
      RecomendedGames(userId),
      categoriesPromise,
    ]);

    return res.status(200).json({
      type: "success",
      response: {
        especialPromotions,
        popularGames,
        recomendedGames,
        categories: categories.filter(f => f.games.length >= 1),
      }
    });
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg });
  } finally {
    await prisma.$disconnect();
  }
};

export const HomeGames = async (req: Request, res: Response) => {
  try {
    const [newGames, gamesWithPromotions, betterAvaliations, bestSallers] = await Promise.all([
      NewGames(),
      GameWithPromotions(),
      BetterAvaliations(),
      BestSelleres()
    ]);

    return res.status(200).json({
      type: "success",
      response: {
        gamesWithPromotions,
        betterAvaliations,
        bestSallers,
        newGames
      }
    });
  } catch (err: any) {
    return res.status(500).json({ type: "error", response: error500Msg });
  } finally {
    await prisma.$disconnect();
  }
};


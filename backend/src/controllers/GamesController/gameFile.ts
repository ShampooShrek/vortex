import AdmZip from 'adm-zip'
import { Request, Response } from "express"
import prisma from "../../libs/prisma"
import FileType from '../../models/FileType'
import { error500Msg } from '../../utils/msgs'
import { UserIsDev } from '../../validations'

interface EntriesHierarchy {
  name: string
  entry: string
  size: number
}

interface Hierarchy {
  entry: string
  items: EntriesHierarchy[]
  hierarchy: Hierarchy[]
}

const createHierarchy = (items: EntriesHierarchy[], entrys: string[]) => {
  const hierarchies: Hierarchy[] = []

  entrys.forEach((entry) => {
    const splitEntry = entry.split("/").filter((s) => s !== "")
    if (splitEntry.length === 1) {
      const currentItems = items.filter((item) => {
        const paths = item.entry.split("/").filter((v) => v !== "").filter((v) => !v.includes("."))
        if (paths.length === splitEntry.length && `${paths.join("/")}/` === entry) {
          return item
        }
      })
      hierarchies.push({ entry: `${splitEntry[0]}`, items: currentItems, hierarchy: [] })
    }
  })

  const createOrFindFolder = (hierarchy: Hierarchy[], path: string, items: EntriesHierarchy[]) => {
    const existingFolder = hierarchy.find((folder) => folder.entry === path)
    if (existingFolder) {
      return existingFolder
    }

    const newHierarchy: Hierarchy = {
      entry: path,
      hierarchy: [],
      items: items,
    }

    hierarchy.push(newHierarchy)
    return newHierarchy
  }

  entrys
    .filter((entry) => entry.split("/").filter((v) => v !== "").length >= 2)
    .forEach((entry) => {
      const entryLength = entry.split("/").filter((v) => v !== "").length
      const hierarchyItems = items.filter((item) => {
        const splitItem = item.entry.split("/").filter((v) => v !== "").filter((v) => !v.includes("."))
        if (splitItem.length === entryLength && `${splitItem.join("/")}/` === entry) {
          return item
        }
      })

      const pathSegments = entry.split("/").filter((s) => s !== "")
      let currentHierarchy = hierarchies

      for (let i = 0; i < pathSegments.length; i++) {
        const pathSegment = pathSegments[i]
        if (i === pathSegments.length - 1) {
          currentHierarchy = createOrFindFolder(currentHierarchy, pathSegment, hierarchyItems).hierarchy
        } else {
          currentHierarchy = createOrFindFolder(currentHierarchy, pathSegment, []).hierarchy
        }
      }
    })

  return hierarchies.sort()
}

export const getGameFiles = async (req: Request, res: Response) => {
  const file = req.file

  if (file) {

    const zip = new AdmZip(file.buffer)
    const entries: AdmZip.IZipEntry[] = zip.getEntries()
    const entryNames: string[] = []
    const items: EntriesHierarchy[] = []

    entries.map(entry => {
      const entryName = entry.entryName
      const splitEntryName = entryName.split("/").filter(t => !t.includes("."))
      if (splitEntryName.length > 0) {
        let entryNameJoin = splitEntryName.join("/")
        if (entryNameJoin[entryNameJoin.length - 1] !== "/") {
          entryNameJoin += "/"
        }
        if (!entryNames.includes(entryNameJoin)) {
          entryNames.push(entryNameJoin)
        }
      }
      items.push({
        entry: entry.entryName,
        name: entry.name,
        size: entry.header.size
      })
    })

    const paternItems = items.filter(item => !item.entry.includes("/")).sort()
    const hierarchy = createHierarchy(items, entryNames.sort())

    return res.status(200).json({ type: "success", response: { hierarchy, paternItems } })
  } else {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' })
  }

}

export const postGameFile = async (req: Request, res: Response) => {
  const { originalname: originalName, size, key, filename }: FileType = req.file! as FileType
  const name = filename ? filename : key!
  const execFile = req.body.execFile
  const gameId = Number(req.params.gameId)
  const userId = req.body.token.userId

  try {
    if (!execFile) return res.status(400).json({ type: "error", response: "Por favor, selecione o executavel do jogo!" })

    const game = await prisma.games.findUnique({ where: { id: gameId }, include: { arquive: true } })
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!game || !user) return res.status(500).json({ type: "error", response: error500Msg })

    await UserIsDev(userId, gameId)

    if (!game.arquive) {
      const file = await prisma.gameArquive.create({
        data: {
          name,
          originalName,
          url: `${process.env.API_URL}/api/uploads/files/${name}`,
          size,
          game: { connect: { id: gameId } },
          execFile
        }
      })

      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] adicionou o arquivo ${file.originalName}.`,
          gameId,
          userId
        }
      })

      return res.status(200).json({ type: "success", response: file })

    } else {
      const file = await prisma.gameArquive.update({
        where: { gameId },
        data: {
          name,
          originalName,
          url: `${process.env.API_URL}/api/uploads/files/${name}`,
          size,
          game: { connect: { id: gameId } },
          execFile
        }
      })

      await prisma.gameUpdateHistoric.create({
        data: {
          message: `Usuário [nickname] atualizou o arquivo para ${file.originalName}.`,
          gameId,
          userId
        }
      })

      return res.status(200).json({ type: "success", response: file })
    }


  } catch (err: any) {
    return res.status(500).json({ type: "error", resposne: error500Msg })
  } finally {
    await prisma.$disconnect()
  }

}



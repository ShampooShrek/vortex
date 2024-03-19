import prisma from "../libs/prisma"
import { regexOptions } from "../utils/regex"
import regex from "../utils/regex"
import { error500Msg, noAuthorizationMsg } from "../utils/msgs"

export const existsOrNot = (value: string, msg: string, typeRegex?: regexOptions) => {
  if (!value || value.length < 1) throw msg
  if (Array.isArray(value) || value.trim().length < 1) throw msg
  if (typeRegex) {
    const validate = regex[typeRegex].test(value)
    if (!validate) throw msg
  }
}

export const notExistsOrError = (value: any, msg: string) => {
  if (value) throw msg
}

export const iqualOrNot = (value1: string, value2: string, msg: string) => {
  if (value1 !== value2) throw msg
}

interface CustomError {
  status: number
  msg: string
}

export const UserIsDev = async (userId: string, gameId: number, error: boolean = true): Promise<boolean | CustomError> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { gameDevelopers: true } })
    if (!user) return { status: 500, msg: error500Msg }

    const userIsDev = user.gameDevelopers.some(game => game.id === gameId)

    if (!userIsDev && error) return { status: 401, msg: noAuthorizationMsg }
    return true
  } catch (err) {
    return error
  } finally {
    await prisma.$disconnect()
  }
}

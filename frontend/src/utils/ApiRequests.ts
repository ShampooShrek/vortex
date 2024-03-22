import * as Models from "@/models/dbModels"
import * as Models2 from "@/models/frontModels"
import api from "@/services/api"
import { Response } from "@/models/frontModels"
import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

// const Models = { ...Models1, ...Models2 }


interface GameAchievementsFoda extends Models.GameAchievements {
  image: Models.AchievementImage
}

interface Game extends Models.Games {
  categories: Models.GameCategories[]
  genres: Models.Genres[]
  subgenres: Models.Subgenres[]
  avaliations: Models.Avaliations[]
  achievements: GameAchievementsFoda[]
  requesites: Models.GameRequesites
  images: Models.GameImages[]
  videos: Models.GameVideos[]
  imageCap: Models.GameImageCap
}

type Method = "post" | "get" | "delete" | "put"

export default async function ApiRequest<T>(url: string, method: Method, body?: any, config?: AxiosRequestConfig): Promise<Response<T | string> | null> {
  try {

    let response: AxiosResponse;
    if (method === "get" || method === "delete") {
      response = await api[method](`${process.env.NEXT_PUBLIC_API_URL}${url}`, config ?? {})
    } else {
      response = await api[method](`${process.env.NEXT_PUBLIC_API_URL}${url}`, body ?? {}, config ?? {})
    }

    const data: Response<T> = response.data

    return data
  } catch (catchErr: any) {
    if (catchErr instanceof AxiosError) {
      const err = catchErr as AxiosError<Response<string>, any>
      if (!err.response || !err.response.data) {
        return { type: "error", response: "Ops, algo deu errado, tente novamente mais tarde!!" }
      } else {
        return err.response!.data
      }
    }
  }

  return null

}


// -- Home --

export const getMostPopulars = async (): Promise<string | Models2.GamesStore[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/most_popular/default`, { cache: "no-store" })
    const popularGames: Response<Models2.GamesStore[]> = await response.json()

    if (popularGames.type === "success") {
      return popularGames.response as Models2.GamesStore[]
    } else {
      return popularGames.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const getEspecialPromotions = async (): Promise<string | Models2.GamesStore[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/especial_promotions`, { cache: "no-store" })
    const especialPromotions: Response<Models2.GamesStore[]> = await response.json()

    if (especialPromotions.type === "success") {
      return especialPromotions.response as Models2.GamesStore[]
    } else {
      return especialPromotions.response as string
    }

  } catch (error) {
    return error as string
  }
}

// -- Game -- 

export const getGame = async (id: number): Promise<string | Game> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`, { cache: "no-store" })
    const game: Response<Game> = await response.json()

    if (game.type === "success") {
      return game.response as Game
    } else {
      return game.response as string
    }

  } catch (error) {
    return error as string
  }
}


// -- Category --

export const getGamesByCategory = async (category: string): Promise<string | Models2.GamesStore[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/games_by_categories/${category}`, { cache: "no-store" })
    const games: Response<Models2.GamesStore[]> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.GamesStore[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

type GamesWithCategory = {
  section: string
  games: Models2.GamesStore[]
}

export const getGamesWithCategory = async (category: string): Promise<string | GamesWithCategory[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/games_with_category/${category}`, { cache: "no-store" })
    const games: Response<GamesWithCategory[]> = await response.json()

    if (games.type === "success") {
      return games.response as GamesWithCategory[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

type Body = {
  categories: string[],
  genres: string[],
  subgenres: string[],
}

export const GameFilters = async (tag: string, body: Body): Promise<string | Models2.GamesStore[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/filter_games/${tag}`, {
      body: JSON.stringify(body),
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" }
    })

    const games: Response<Models2.GamesStore[]> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.GamesStore[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const GetFilters = async (tag: string): Promise<string | Models2.Filters> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/tags`, {
      cache: "no-store",
    })

    const filters: Response<Models2.Filters> = await response.json()

    if (filters.type === "success") {
      const filtersWithoutTag = filters.response as Models2.Filters

      for (const filter in filtersWithoutTag) {
        const keyFilter = filter as keyof Models2.Filters
        if (keyFilter === "categories") {
          filtersWithoutTag[keyFilter] = filtersWithoutTag[keyFilter].filter(key => key.category !== tag)
        } else if (keyFilter === "genres") {
          filtersWithoutTag[keyFilter] = filtersWithoutTag[keyFilter].filter(key => key.genre !== tag)
        } else if (keyFilter === "subgenres") {
          filtersWithoutTag[keyFilter] = filtersWithoutTag[keyFilter].filter(key => key.subgenre !== tag)
        }
      }

      return filtersWithoutTag
    } else {
      return filters.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const GetAllTags = async (): Promise<string | Models2.Filters> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/tags`, {
      cache: "no-store",
    })

    const filters: Response<Models2.Filters> = await response.json()

    if (filters.type === "success") {
      const filtersWithoutTag = filters.response as Models2.Filters
      return filtersWithoutTag
    } else {
      return filters.response as string
    }

  } catch (error) {
    return error as string
  }
}

// -- Profile -- 

export const GetUser = async (userId: string): Promise<Models2.Profile | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, { cache: "no-store" })
    const user: Response<Models2.Profile> = await response.json()

    if (user.type === "success") {
      return user.response as Models2.Profile
    } else {
      return user.response as string
    }
  } catch (error) {
    return error as string
  }
}

export const GetUserByToken = async (token: string): Promise<Models2.UserAuth | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/authentication`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" }
    })

    const user: Response<Models2.UserAuth> = await response.json()

    if (user.type === "success") {
      return user.response as Models2.UserAuth
    } else {
      return user.response as string
    }
  } catch (error) {
    return error as string
  }
}


export const GetIdByToken = async (token: string): Promise<Models.UserIdRequest | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/id`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    })


    const user: Response<Models.UserIdRequest> = await response.json()
    console.log(user)

    if (user.type === "success") {
      return user.response as Models.UserIdRequest
    } else {
      return user.response as string
    }
  } catch (error) {
    return error as string
  }
}

export const GetUserDetails = async (userId: string, token: string | null): Promise<Models2.UserDetails | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/details`, {
      cache: "no-store",
      headers: {
        'authorization': token ? `Bearer ${token}` : ""
      }
    })
    const user: Response<Models2.UserDetails> = await response.json()

    if (user.type === "success") {
      return user.response as Models2.UserDetails
    } else {
      return user.response as string
    }
  } catch (error) {
    return error as string
  }
}

export const GetUserAchievements = async (userId: string, gameId: number, token: string | null): Promise<Models2.AchievementsDetails | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/achievements/${gameId}`, {
      cache: "no-store",
      headers: {
        'authorization': token ? `Bearer ${token}` : ""
      }
    })
    const achievements: Response<Models2.AchievementsDetails> = await response.json()

    if (achievements.type === "success") {
      return achievements.response as Models2.AchievementsDetails
    } else {
      return achievements.response as string
    }
  } catch (error) {
    return error as string
  }
}

export const GetUserAvaliation = async (userId: string, avaliationId: number): Promise<Models2.AvaliationDetails | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/avaliations/${avaliationId}`, { cache: "no-store" })
    const avaliations: Response<Models2.AvaliationDetails> = await response.json()

    if (avaliations.type === "success") {
      return avaliations.response as Models2.AvaliationDetails
    } else {
      return avaliations.response as string
    }
  } catch (error) {
    return error as string
  }
}

// -- Group -- 
export const GetGroup = async (groupLink: string): Promise<Models2.Groups | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/get_group/${groupLink}/`, { cache: "no-store" })
    const avaliations: Response<Models2.Groups> = await response.json()

    if (avaliations.type === "success") {
      return avaliations.response as Models2.Groups
    } else {
      return avaliations.response as string
    }
  } catch (error) {
    return error as string
  }
}

export const GetGroups = async (token: string): Promise<Models2.UserGroups | string> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/social/groups`, {
      cache: "no-store",
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    const groups: Response<Models2.UserGroups> = await response.json()

    if (groups.type === "success") {
      return groups.response as Models2.UserGroups
    } else {
      return groups.response as string
    }
  } catch (error) {
    return error as string
  }
}


export const getCategories = async (): Promise<string | Models.GameCategories[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: "no-store" })
    const categories: Response<Models.GameCategories[]> = await response.json()

    if (categories.type === "success") {
      return categories.response as Models.GameCategories[]
    } else {
      return categories.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const getGenres = async (): Promise<string | Models.Genres[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, { cache: "no-store" })
    const genres: Response<Models.Genres[]> = await response.json()

    if (genres.type === "success") {
      return genres.response as Models.Genres[]
    } else {
      return genres.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const getSubgenres = async (): Promise<string | Models.Subgenres[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subgenres`, { cache: "no-store" })
    const subgenres: Response<Models.Subgenres[]> = await response.json()

    if (subgenres.type === "success") {
      return subgenres.response as Models.Subgenres[]
    } else {
      return subgenres.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const GetGameEdit = async (gameId: number, token: string): Promise<string | Models2.GamesStoreEdit> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/edit/${gameId}`, {
      cache: "no-store",
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    const game: Response<Models2.GamesStoreEdit> = await response.json()


    if (game.type === "success") {
      return game.response as Models2.GamesStoreEdit
    } else {
      return game.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const GetAdminData = async (token: string): Promise<string | Models2.AdminModels> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/admins/get_data`, {
      cache: "no-store",
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    const game: Response<Models2.AdminModels> = await response.json()

    if (game.type === "success") {
      return game.response as Models2.AdminModels
    } else {
      return game.response as string
    }

  } catch (error) {
    return error as string
  }
}


export const CartRequest = async (token: string): Promise<string | Models2.GamesStore[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/cart`, {
      method: "GET",
      cache: "no-store",
      headers: { "Authorization": `Bearer ${token}` }
    })

    const games: Response<Models2.GamesStore[]> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.GamesStore[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const TransactionRequest = async (token: string): Promise<string | Models.Transaction[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/transactions`, {
      method: "GET",
      cache: "no-store",
      headers: { "Authorization": `Bearer ${token}` }
    })

    const transactions: Response<Models.Transaction[]> = await response.json()

    if (transactions.type === "success") {
      return transactions.response as Models.Transaction[]
    } else {
      return transactions.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const AchievementsRequest = async (gameId: number): Promise<string | Models2.StoreAchievements> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${gameId}/achievements`, {
      method: "GET",
      cache: "no-store",
    })

    const games: Response<Models2.StoreAchievements> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.StoreAchievements
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}
export const DevelopersRequest = async (gameId: number): Promise<string | Models2.GamesStoreEdit> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${gameId}/developers`, {
      method: "GET",
      cache: "no-store",
    })

    const games: Response<Models2.GamesStoreEdit> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.GamesStoreEdit
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const SocialRequest = async (token: string): Promise<string | Models2.SocialRequestInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/social`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const games: Response<Models2.SocialRequestInterface> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.SocialRequestInterface
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const SocialIdsRequest = async (token: string): Promise<string | Models2.SocialIdsRequestInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/social/ids`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const games: Response<Models2.SocialIdsRequestInterface> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.SocialIdsRequestInterface
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const EditRequest = async (token: string): Promise<string | Models2.Edit> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/edit`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const games: Response<Models2.Edit> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.Edit
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const GetUserAvaliations = async (token: string): Promise<string | Models.Avaliations[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/avaliations/get_all_avaliations`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const games: Response<Models.Avaliations[]> = await response.json()

    if (games.type === "success") {
      return games.response as Models.Avaliations[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const getGameDevelopers = async (token: string): Promise<string | Models2.GamesStoreEdit[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/games/games_developer`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const games: Response<Models2.GamesStoreEdit[]> = await response.json()

    if (games.type === "success") {
      return games.response as Models2.GamesStoreEdit[]
    } else {
      return games.response as string
    }

  } catch (error) {
    return error as string
  }
}

export const getUserByRecoverKey = async (key: string): Promise<string | Models.User> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/recover_key/${key}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const user: Response<Models.User> = await response.json()

    if (user.type === "success") {
      return user.response as Models.User
    } else {
      return user.response as string
    }

  } catch (error) {
    return error as string
  }
}




import { MouseEventHandler } from "react"
import * as DbModels from "./dbModels"

export interface Response<T> {
  type: "error" | "success"
  response: T | string
}

export interface Groups extends DbModels.Group {
  banner: DbModels.GroupBanner
  image: DbModels.GroupImage
}

export interface GroupCreate {
  name: string
  groupLink: string
  type: "PUBLIC" | "PRIVATE" | "RESTRICT"
}

export interface GroupEdit extends GroupCreate {
  description: string | null
  header: string | null
  gameRelation: GamesStore[]
  image: DbModels.GroupImage | null
  banner: DbModels.GroupBanner | null
}

export interface OtherUsers extends DbModels.User {
  image: DbModels.UserImage
  games: GamesStore
  avaliations: DbModels.Avaliations
  status: string
}

export interface UserFriendsRequests {
  createdAt: string
  id: number
  sender: OtherUsers
  receiver: OtherUsers
  status: string
}

interface IdsInterface {
  id: number
}

export interface UserAuth extends DbModels.User {
  cart: IdsInterface[]
  favorites: GamesStore[] | null
  wishList: GamesStore[] | null
  games: IdsInterface[]
  game: GamesStore[]
  gameDevelopers: IdsInterface[]
  groupCreator: Groups[] | null
  adminGroups: Groups[] | null
  groupRequests: DbModels.GroupRequests[] | null
  groups: Groups[] | null
  blocks: OtherUsers[] | null
  friends: OtherUsers[] | null
  friendRequestsReceived: UserFriendsRequests[] | null
  friendRequestsSent: UserFriendsRequests[] | null
  token: string
  privacity: DbModels.PrivacySetting | null
  notifications: DbModels.Notifications[]
  avaliations: DbModels.Avaliations[]
}

export interface GamesStore extends DbModels.Games {
  gameBackgroundImage: DbModels.GameImageCap
  gameIconImage: DbModels.GameImageCap
  gamePopularImage: DbModels.GameImageCap
  verticalCap: DbModels.GameImageCap
  horizontalCap: DbModels.GameImageCap
  avaliations: DbModels.Avaliations[]
  images: DbModels.GameImages[]
  videos: DbModels.GameVideos[]
  requesites: DbModels.GameRequesites
  categories: DbModels.GameCategories[]
  genres: DbModels.Genres[]
  subgenres: DbModels.Subgenres[]
  achievements: DbModels.GameAchievements[]
  avaliationsPercent: number
}

export interface GamesStoreEdit extends DbModels.Games {
  gameBackgroundImage: DbModels.GameImageCap
  gameIconImage: DbModels.GameImageCap
  gamePopularImage: DbModels.GameImageCap
  images: DbModels.GameImages[]
  videos: DbModels.GameVideos[]
  requesites: DbModels.GameRequesites
  categories: DbModels.GameCategories[]
  genres: DbModels.Genres[]
  subgenres: DbModels.Subgenres[]
  achievements: DbModels.GameAchievements[]
  gameDescriptionImages: DbModels.GameImages[]
  arquive: DbModels.GameFile
  verticalCap: DbModels.GameImageCap
  horizontalCap: DbModels.GameImageCap
  developers: DbModels.User[]
}

export interface Filters {
  categories: DbModels.GameCategories[]
  genres: DbModels.Genres[]
  subgenres: DbModels.Subgenres[]
}

export interface Profile extends DbModels.User {
  image: DbModels.UserImage | null
  games?: GamesStore[]
  gamesAvaliations?: DbModels.Avaliations[]
  favorites?: GamesStore[]
  wishList?: GamesStore[]
  friends?: OtherUsers[]
  groups?: Groups[]
  groupCreator?: Groups[]
  adminGroups?: Groups[]
  userAchievements?: DbModels.ProfileAchievements[]
  privacity: DbModels.PrivacySetting
}

export interface Response<T> {
  type: "success" | "error"
  response: T | string
}

export interface FiltersOptions {
  onClick: MouseEventHandler<HTMLDivElement>
  option: string
  key: string
}

export interface UserDetails {
  user: OtherUsers
  games?: GamesStore[]
  favorites?: GamesStore[]
  achievements?: DbModels.GameAchievements[]
  avaliations?: DbModels.Avaliations[]
  wishList?: GamesStore[]
  friends?: OtherUsers[]
  groups?: Groups[]
}

export interface AchievementsDetails {
  achievements: {
    stringConquist: string
    achievement: DbModels.GameAchievements
  }[]
  game: GamesStore
}

export interface AvaliationDetails extends DbModels.Avaliations {
  avaliationComments: AvaliationDetails[]
}

export interface GameCreate {
  name: string
  // description: string
  synopsis: string
  price: number
  categories: DbModels.GameCategories[]
  genres: DbModels.Genres[]
  subgenres: DbModels.Subgenres[]
}

export interface EntriesHierarchy {
  name: string
  entry: string
  size: number
}

export interface Hierarchy {
  entry: string
  items: EntriesHierarchy[]
  hierarchy: Hierarchy[]
}

export interface AdminModels {
  games: {
    id: string
    name: string
    createdAt: string
    horizontalCap: DbModels.GameImageCap
    file: DbModels.GameFile
  }[]
}

export interface StoreAchievements {
  achievements: DbModels.GameAchievements[]
  game: GamesStore
}


type Id = { id: number }
type IdStr = { id: string }

export interface SocialIdsRequestInterface {
  adminGroups: Id[]
  groupRequests: DbModels.GroupRequests[]
  groups: Id[]
  userBlocks: IdStr[]
  blockedByUsers: IdStr[]
  friends: IdStr[]
  friendRequestsReceived: UserFriendsRequests[]
  friendRequestsSent: UserFriendsRequests[]
}

export interface SocialRequestInterface {
  adminGroups: Groups[]
  groupRequests: DbModels.GroupRequests[]
  groups: Groups[]
  userBlocks: OtherUsers[]
  blockedByUsers: OtherUsers[]
  friends: OtherUsers[]
  friendRequestsReceived: UserFriendsRequests[]
  friendRequestsSent: UserFriendsRequests[]
}

export interface Edit extends DbModels.User {
  image: DbModels.UserImage | null
  games: GamesStore[]
  privacity: DbModels.PrivacySetting
  favorites: GamesStore[]
}

export interface Message {
  _id?: string
  sender: string
  recipient: string
  type: "image" | "video" | "text" | "file" | "audio"
  content: string
  date: Date
}

export interface UsersOnline {
  id: string
  status: string
}

export interface FriendsWithMessages extends DbModels.User {
  status?: string
  image: DbModels.UserImage
  messages: Message[]
}

export interface GroupsWithMessages extends DbModels.Group {
  messages: GroupMessageReceived[]
}

export interface UserGroups {
  groups: Groups[]
  adminGroups: Groups[]
}

export interface GroupMessage {
  _id?: string
  sender: string
  group: number
  type: "image" | "video" | "text" | "file" | "audio"
  content: string
  date: Date
}

export interface GroupMessageReceived extends GroupMessage {
  _id: string
  nickname: string
  image: string
}

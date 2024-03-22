import { MouseEventHandler } from "react"
import { GamesStore } from "./frontModels"

export interface UserIdRequest {
  id: string
}

export interface User {
  id: string
  name: string
  nickname: string
  email: string
  age?: number | null
  bio?: string | null
  password: string
  downloadPathDefault?: string | null
  isAdm: boolean
  isPrivate: boolean
  recoverKey?: string | null
  image: UserImage | null
  confEmail: boolean
}

export interface CreditCards {
  id: number;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export interface PrivacySetting {
  gamesPrivacy: 'FRIENDS' | 'PUBLIC' | 'PRIVATE';
  friendList: 'FRIENDS' | 'PUBLIC' | 'PRIVATE';
  groupList: 'FRIENDS' | 'PUBLIC' | 'PRIVATE';
}


export interface FriendRequest {
  sender: User
  receiver: User
  status: RequestStatus
  createdAt: string
}

export interface Transaction extends GamesStore {
  totalPrice: number
  buyDate: string
}

export interface UserImage {
  name: string
  originalName: string
  url: string
}

export interface Games {
  id: number
  name: string
  price: number
  discount: number
  description: string
  synopsi: string
  isActive: boolean
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELED",
  createdAt: string
}

export interface GameAchievements {
  id: number
  title: string
  description: string
  level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM"
  image: AchievementImage | null
  type: "DEFAULT" | "SECRET"
  gameId: number
}

export interface ProfileAchievements {
  achievement: GameAchievements
}

export interface AchievementImage {
  name: string
  originalName: string
  url: string
}

export interface GameImageCap {
  id: number
  name: string
  originalName: string
  size: number
  url: string
}

export interface GameRating {
  id: number
  rating: number
  gameId: number
  userId: string
  game: Games
  user: User
}

export interface GameImages {
  id: number
  name: string
  originalName: string
  order: number
  url: string
}

export interface GameFile {
  name: string
  originalName: string
  size: number
  url: string
  execFile: string
}

export interface GameVideos {
  id: number
  name: string
  originalName: string
  order: number
  url: string
}

export interface GameCategories {
  id: number
  category: string
  portugueseName: string
  imgUrl: string
}

export interface Genres {
  id: number
  genre: string
  portugueseName: string
}

export interface Subgenres {
  id: number
  subgenre: string
  portugueseName: string
}

// export interface GameDlcs {
//   id: number
//   name: string
//   price: number
//   discount: number
//   description: string
//   size: number
//   arquiveUrl: string
//   users: User[]
//   images: GameDlcImages[]
//   imageCap: GameDlcImageCap | null
//   game: Games
//   gameId: number
//   createdAt:string
//   isActive: boolean
// }

// export interface GameDlcImages {
//   id: number
//   name: string
//   originalName: string
//   size: number
//   url: string
//   gameDlc: GameDlcs
//   gameId: number
//   deleted: boolean
// }

// export interface GameDlcImageCap {
//   id: number
//   name: string
//   originalName: string
//   size: number
//   url: string
//   gameDlc: GameDlcs
//   gameDlcId: number
// }

export interface GameRequesites {
  id: number
  minSO: string
  minProcessador: string
  minMemory: string
  minVideo: string | null
  minArmazenamento: string
  others: object | null
  recomendedSO: string | null
  recomendedProcessador: string | null
  recomendedMemory: string | null
  recomendedVideo: string | null
}

export interface Avaliations {
  id: string
  title: string | null
  comment: string | null
  avaliation: "LIKE" | "DISLIKE"
  userDateGameTime: string
  createdAt: string
  gameId: number
  userId: string
  user: {
    nickname: string
    userId: string
    id: string
    image: UserImage
  }
  game: GamesStore
}

export interface AvaliationComments {
  comment: string
  avaliation: Avaliations
  avaliationId: number
  string: string

}
export interface AvaliationLikes {
  id: number
  type: "LIKE" | "DISLIKE"
  user: User
  userId: string
  avaliation: Avaliations
  avaliationId: number
}

export interface Group {
  id: number
  name: string
  users: User[]
  admins: User[]
  header: string
  groupLink: string
  creator: User
  userId: string
  description: string | null
  gameRelation: GamesStore[]
  groupRequests: GroupRequests[]
  groupHistoric: GroupHistoric[]
  groupBans: User[]
  type: "PRIVATE" | "PUBLIC" | "RESTRICT"
  image: GroupImage | null
  banner: GroupBanner | null
  createdAt: string
  membersLength: number
}

export interface Notifications {
  id: number
  title: string
  content: string
  readed: boolean
  createdAt: string
}

export interface GroupHistoric {
  id: number
  user: User
  date: string
  message: string
}

export interface GroupRequests {
  id: number
  group: Group
  groupId: number
  requestUser: User
  requestUserId: string
  adm: User | null
  admId: string | null
  status: RequestStatus
  actionDate: string | null
  date: string
}

export interface GroupImage {
  id: number
  name: string
  originalName: string
  size: number
  url: string
  group: Group
  groupId: number
}

export interface GroupBanner {
  id: number
  name: string
  originalName: string
  size: number
  url: string
  group: Group
  groupId: number
}

export interface HomeRequest {
  especialPromotions: GamesStore[] | string
  popularGames: GamesStore[] | string
  recomendedGames: GamesStore[] | string
  categories: GameCategories[] | string
}

export interface HomeGamesRequest {
  gamesWithPromotions: GamesStore[] | string
  betterAvaliations: GamesStore[] | string
  bestSallers: GamesStore[] | string
  newGames: GamesStore[] | string
}


export enum BanStatus {
  BANNED,
  UNBANNED,
}

export enum GroupType {
  PUBLIC,
  PRIVATE
}

export enum GameStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
  CANCELED,
}

export enum RequestStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
  CANCELED,
}

export enum AvaliationOptions {
  LIKE,
  DISLIKE,
}

export enum AchievementType {
  DEFAULT,
  SECRET,
}

export enum AchievementLevel {
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
}

export enum TypeEmail {
  ConfEmail,
  ForgetPassword,
}

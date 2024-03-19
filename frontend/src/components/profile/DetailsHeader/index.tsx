"use client"

import { GameImageCap, Games, UserImage } from "@/models/dbModels"
import * as S from "./style"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GamesStore } from "@/models/frontModels"


interface DetailsHeaderProps {
  id: string
  nickname: string
  image?: UserImage | null
  game?: GamesStore | string
  sections?: string[]
}

const DetailsHeader = ({ image, nickname, game, id, sections }: DetailsHeaderProps) => {
  const router = useRouter()

  return (
    <S.Container>
      <S.UserContainer>
        <S.UserImage>
          <img src={image ? image.url : "/player.jpg"} alt={image ? image.originalName : "player"} />
        </S.UserImage>
        <S.UserNickname> <Link replace href={`/profile/${id}`}>{nickname}</Link> {game && (<span>-</span>)} </S.UserNickname>
        {game && <S.GameName>{typeof game === "string" ? game : game.name}</S.GameName>}
        {sections && sections.map(s => (<S.GameName key={s}>- {s} </S.GameName>))}
      </S.UserContainer>
      {game && typeof game === "object" && (
        <S.GameImage onClick={() => router.push(`/store/games/${game.id}`)} src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
      )}
    </S.Container>
  )
}

export default DetailsHeader

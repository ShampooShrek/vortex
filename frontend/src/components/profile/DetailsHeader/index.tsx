"use client"

import { GameImageCap, Games, UserImage } from "@/models/dbModels"
import * as S from "./style"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GamesStore } from "@/models/frontModels"
import authHook from "@/data/hooks/authHook"


interface DetailsHeaderProps {
  id?: string
  nickname?: string
  image?: UserImage | null
  game?: GamesStore | string
  sections?: string[]
}

const DetailsHeader = ({ game, sections, id, nickname, image }: DetailsHeaderProps) => {
  const router = useRouter()

  const { user } = authHook()

  if (!user) return <p></p>
  if (!id) id = user.id
  if (!image) image = user.image
  if (!nickname) nickname = user.nickname

  return (
    <S.Container>
      <S.UserContainer>
        <S.UserImageNickanme>
          <S.UserImage>
            <img src={image ? image.url : "/player.jpg"} alt={image ? image.originalName : "player"} />
          </S.UserImage>
          <S.UserNickname> <Link replace href={`/profile/${id}`}>{nickname} </Link> </S.UserNickname>
        </S.UserImageNickanme>
        <S.DesktopSections>
          {game && <S.GameName> - {typeof game === "string" ? game : game.name}</S.GameName>}
          {sections && sections.map(s => (<S.GameName key={s}> - {s} </S.GameName>))}
        </S.DesktopSections>
      </S.UserContainer>
      {game && typeof game === "object" && (
        <S.GameImage onClick={() => router.push(`/store/games/${game.id}`)} src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
      )}

      <S.MobileSections>
        {game && <S.GameName>{typeof game === "string" ? game : game.name}</S.GameName>}
        {sections && sections.map((s, i) => (<S.GameName key={s}>{i > 0 && "-"} {s} </S.GameName>))}
      </S.MobileSections>
    </S.Container>
  )
}

export default DetailsHeader

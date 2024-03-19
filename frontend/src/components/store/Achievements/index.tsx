"use client"

import { GameAchievements } from "@/models/dbModels"
import * as S from "./style"
import DateFormater from "@/utils/dateFormater"
import { AchievementsDetails, StoreAchievements as StoreAchievementsProps } from "@/models/frontModels"
import Link from "next/link"

const StoreAchievements = ({ achievements, game }: StoreAchievementsProps) => {

  const hiddenAchievements = achievements.filter(ac => ac.type === "SECRET")
  const defaultAchievements = achievements.filter(ac => ac.type === "DEFAULT")

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.GameName>
          <Link replace href={`/store/games/${game.id}`}>{game.name} - Conquistas</Link>
        </S.GameName>
        <S.GameImage replace href={`/store/games/${game.id}`}>
          <img src={game.horizontalCap.url} alt="" />
        </S.GameImage>
      </S.HeaderContainer>
      <S.CardContainers>
        {defaultAchievements.map(ac => (
          <S.Card key={ac.id}>
            <S.CardLeft>
              <S.CardLeftImage isActived={false}>
                <img src={ac.image?.url} alt="" />
              </S.CardLeftImage>
              <S.CardLeftContent>
                <S.CardLeftTitle>{ac.title}</S.CardLeftTitle>
                {ac.type === "DEFAULT" && <S.CardLeftDescription>{ac.description}</S.CardLeftDescription>}
              </S.CardLeftContent>
            </S.CardLeft>
          </S.Card>
        ))}
        {hiddenAchievements.map(ac => (
          <S.Card key={ac.id}>
            <S.CardLeft>
              <S.CardLeftImage isActived={false}>
                <img src={ac.image?.url} alt="" />
              </S.CardLeftImage>
              <S.CardLeftContent>
                <S.CardLeftTitle>{ac.title}</S.CardLeftTitle>
                {ac.type === "DEFAULT" && <S.CardLeftDescription>{ac.description}</S.CardLeftDescription>}
              </S.CardLeftContent>
            </S.CardLeft>
          </S.Card>
        ))}
      </S.CardContainers>
    </S.Container>
  )
}

export default StoreAchievements

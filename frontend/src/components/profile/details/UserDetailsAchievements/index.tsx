"use client"

import { GameAchievements } from "@/models/dbModels"
import * as S from "./style"
import DateFormater from "@/utils/dateFormater"
import { AchievementsDetails } from "@/models/frontModels"

interface UserDetailsAchievementsProps {
  achievements: AchievementsDetails
  gameAchievementsNot: GameAchievements[]
}

const UserDetailsAchievements = ({ achievements, gameAchievementsNot }: UserDetailsAchievementsProps) => {

  return (
    <S.Container>
      {achievements.achievements.length > 0 && (
        <S.CardContainers>
          {achievements.achievements.map(ac => (
            <S.Card key={ac.achievement.id}>
              <S.CardLeft>
                <S.CardLeftImage isActived={true}>
                  <img src={ac.achievement.image?.url} alt="" />
                </S.CardLeftImage>
                <S.CardLeftContent>
                  <S.CardLeftTitle>{ac.achievement.title}</S.CardLeftTitle>
                  <S.CardLeftDescription>{ac.achievement.description}</S.CardLeftDescription>
                </S.CardLeftContent>
              </S.CardLeft>
              <S.CardRightTime>{DateFormater(ac.stringConquist)}</S.CardRightTime>
            </S.Card>
          ))}
        </S.CardContainers>
      )}
      <S.CardContainers>
        {gameAchievementsNot.map(ac => (
          <S.Card key={ac.id}>
            <S.CardLeft>
              <S.CardLeftImage isActived={false}>
                <img src={ac.image?.url} alt="" />
              </S.CardLeftImage>
              <S.CardLeftContent>
                <S.CardLeftTitle>{ac.title}</S.CardLeftTitle>
                <S.CardLeftDescription>{ac.description}</S.CardLeftDescription>
              </S.CardLeftContent>
            </S.CardLeft>
          </S.Card>
        ))}
      </S.CardContainers>
    </S.Container>
  )
}

export default UserDetailsAchievements

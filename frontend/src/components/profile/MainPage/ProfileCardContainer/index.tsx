"use client"

import * as S from "./style"
import ProfileContentContainer from "../ProfileContentContainer"
import { ProfileAchievements } from "@/models/dbModels"
import { useEffect } from "react"
import { GamesStore } from "@/models/frontModels"
import { useParams } from "next/navigation"

interface ProfileCardContainerProps {
  games: GamesStore[]
  userAchievements: ProfileAchievements[]
  title: string
}

export const ProfileCardContainer = ({ games, title, userAchievements: propsAchievements }: ProfileCardContainerProps) => {
  const { userId } = useParams()


  return (
    <ProfileContentContainer title={title}>
      {games.map(game => {
        const userAchievements: ProfileAchievements[] = propsAchievements.filter(ac => ac.achievement.gameId === game.id)
        return (
          <S.Card key={game.id}>
            <S.CardGameHeader href={`/store/games/${game.id}`}>
              <S.CardGameImage>
                <img src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
                <h3>{game.name}</h3>
              </S.CardGameImage>
              <S.CardGameStatus>
                <span>
                  35.0 horas
                  <br /> jogadas
                </span>
              </S.CardGameStatus>
            </S.CardGameHeader>
            {game.achievements && game.achievements.length > 0 && (
              <S.CardGameAchievements replace href={`/profile/${userId}/details/achievements/${game.id}`}>
                <S.AchievementsProgress>
                  <h5>conquistas:</h5>
                  <span>{userAchievements.length} de {game.achievements.length}</span>
                  <S.AchievementsProgressBar progress={(userAchievements.length / game.achievements.length) * 100}><div /></S.AchievementsProgressBar>
                </S.AchievementsProgress>
              </S.CardGameAchievements>
            )}
          </S.Card>
        )
      })}
    </ProfileContentContainer>
  )
}

export const ProfileFavoriteContainer = ({ game, userAchievements: propsAchievements }: { game: GamesStore, userAchievements: ProfileAchievements[] }) => {
  const userAchievements: ProfileAchievements[] = propsAchievements.filter(ac => ac.achievement.gameId === game.id)

  const { userId } = useParams()

  return (
    <ProfileContentContainer title="Jogo Mais Jogado:" >
      <S.Card>
        <S.CardGameHeaderFavorite href={`/store/games/${game.id}`}>
          <S.CardFavoriteImage>
            <img src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
            <h3>{game.name}</h3>
          </S.CardFavoriteImage>
        </S.CardGameHeaderFavorite>
        <S.CardFavoriteContainer>
          <div>
            <h3>700</h3>
            <span>Horas de jogo</span>
          </div>
          <div>
            <h3>120</h3>
            <span>Conquistas</span>
          </div>
        </S.CardFavoriteContainer>
        {game.achievements && game.achievements.length > 0 && (
          <S.CardGameAchievements replace href={`/profile/${userId}/details/achievements/${game.id}`}>
            <S.AchievementsProgress>
              <h5>conquistas:</h5>
              <span>{userAchievements.length} de {game.achievements.length}</span>
              <S.AchievementsProgressBar progress={(userAchievements.length / game.achievements.length) * 100}><div /></S.AchievementsProgressBar>
            </S.AchievementsProgress>
          </S.CardGameAchievements>
        )}
      </S.Card>
    </ProfileContentContainer>
  )
}

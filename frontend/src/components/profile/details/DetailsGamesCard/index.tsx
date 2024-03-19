import { GameAchievements, ProfileAchievements } from "@/models/dbModels"
import * as S from "./style"
import { useRouter } from "next/navigation"
import { GamesStore } from "@/models/frontModels"

interface DetailsGamesCardProps {
  game: GamesStore
  achievements: GameAchievements[]
  withAchievements?: boolean
  userId: string
}

const DetailsGamesCard = ({ achievements: PropsAchievements, game, withAchievements = false, userId }: DetailsGamesCardProps) => {
  const userAchievements: GameAchievements[] = PropsAchievements.filter(ac => ac.gameId === game.id)
  const router = useRouter()

  return (
    <S.Card key={game.id}>
      <S.CardGameImage src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
      <S.CardGameContent>
        <S.CardGameName>{game.name}</S.CardGameName>
        <S.GameTime>
          <h5>Tempo de Jogo:</h5>
          <span>313 horas</span>
        </S.GameTime>
        {game.achievements && game.achievements.length > 0 && (
          <S.CardGameAchievements>
            <S.AchievementsProgress replace href={`/profile/${userId}/details/achievements/${game.id}`}>
              <h5>conquistas:</h5>
              <div style={{ width: "100%" }}>
                <span>{userAchievements.length} de {game.achievements.length}</span>
                <S.AchievementsProgressBar withAchievements={withAchievements} progress={(userAchievements.length / game.achievements.length) * 100}>
                  <div />
                </S.AchievementsProgressBar>
              </div>
            </S.AchievementsProgress>
            {withAchievements && (
              <S.AchievementsImages>
                {userAchievements.map((achievement) => (
                  <S.AchievementImage
                    title={achievement.title}
                    key={achievement.image?.url}
                    src={achievement.image?.url} />
                ))}
              </S.AchievementsImages>
            )}
          </S.CardGameAchievements>
        )}
      </S.CardGameContent>
      <S.CardGameContentMobile>
        <S.GameHeaderMobile>
          <div style={{ display: "flex", alignItems: "center" }}>
            <S.CardGameImageMobile src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
            <S.CardGameHeaderMobileContent>
              <S.CardGameName>{game.name}</S.CardGameName>
              <S.GameTimeImageContainer>
                <h5>Tempo de Jogo:</h5>
                <span>313 horas</span>
              </S.GameTimeImageContainer>
            </S.CardGameHeaderMobileContent>
          </div>
          <S.GameTime>
            <h5>Tempo de Jogo:</h5>
            <span>313 horas</span>
          </S.GameTime>
        </S.GameHeaderMobile>
        {game.achievements && game.achievements.length > 0 && (
          <S.CardGameAchievements>
            <S.AchievementsProgress replace href={`/profile/${userId}/details/achievements/${game.id}`}>
              <h5>conquistas:</h5>
              <div style={{ width: "100%" }}>
                <span>{userAchievements.length} de {game.achievements.length}</span>
                <S.AchievementsProgressBar withAchievements={withAchievements} progress={(userAchievements.length / game.achievements.length) * 100}>
                  <div />
                </S.AchievementsProgressBar>
              </div>
            </S.AchievementsProgress>
            {withAchievements && (
              <S.AchievementsImages>
                {userAchievements.map((achievement) => (
                  <S.AchievementImage
                    title={achievement.title}
                    key={achievement.image?.url}
                    src={achievement.image?.url} />
                ))}
              </S.AchievementsImages>
            )}
          </S.CardGameAchievements>
        )}
      </S.CardGameContentMobile>
    </S.Card>

  )
}

export default DetailsGamesCard
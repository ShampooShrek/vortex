import { GameAchievements } from "@/models/dbModels"
import * as S from "./style"
import Link from "next/link"

interface AchievementsProps {
  achievements: GameAchievements[]
  achievementsLength: number,
  gameId: number
}

const StoreAchievements = ({ achievements, achievementsLength, gameId }: AchievementsProps) => {

  return (
    <S.Container>
      <p>Conquistas:</p>
      <S.AchievementsContainer>
        {achievements.slice(0, 3).map(ac => (
          <S.Achievements src={ac.image ? ac.image?.url : ""} key={ac.id} />
        ))}

        <S.AllAchievementsButton href={`/store/achievements/${gameId}`}>
            Ver todas({achievementsLength})
        </S.AllAchievementsButton>

      </S.AchievementsContainer>
    </S.Container>
  )
}

export default StoreAchievements
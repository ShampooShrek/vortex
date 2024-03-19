import { Layout } from "@/components/layout"
import { AchievementsRequest } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
import { StoreAchievements } from "@/models/frontModels"
import Achievements from "@/components/store/Achievements"


interface UserGameAchievementsProps {
  params: { gameId: string }
}

const UserGameAchievements = async ({ params: { gameId } }: UserGameAchievementsProps) => {

  const achievementsResponse = await AchievementsRequest(+gameId)

  if (achievementsResponse === "string") redirect("/home")

  const achievements = achievementsResponse as StoreAchievements

  return (
    <Layout>
      <Achievements achievements={achievements.achievements} game={achievements.game} />
    </Layout>
  )
}

export default UserGameAchievements

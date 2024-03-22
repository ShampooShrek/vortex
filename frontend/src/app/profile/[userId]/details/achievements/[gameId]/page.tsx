import { Layout } from "@/components/layout"
import DetailsHeader from "@/components/profile/DetailsHeader"
import UserDetailsAchievements from "@/components/profile/details/UserDetailsAchievements"
import { GetUser, GetUserAchievements } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"


interface UserGameAchievementsProps {
  params: { gameId: string, userId: string }
}

const UserGameAchievements = async ({ params: { gameId, userId } }: UserGameAchievementsProps) => {
  const useCookies = cookies()

  const token = useCookies.get("vortex-auth-token")

  const [user, userAchievements] = await Promise.all([
    GetUser(userId),
    GetUserAchievements(userId, Number(gameId), token?.value ?? null)
  ])


  if (typeof user === "string" || typeof userAchievements === "string") redirect(`/profile/${userId}`)

  const gameAchievements = userAchievements.game.achievements.filter(ac =>
    !userAchievements.achievements.find(ac2 => ac2.achievement.id === ac.id)
  )

  return (
    <Layout needConfirmEmail>
      <DetailsHeader id={userId!} image={user.image} nickname={user.nickname}
        game={userAchievements.game} />
      <UserDetailsAchievements gameAchievementsNot={gameAchievements} achievements={userAchievements} />
    </Layout>
  )
}

export default UserGameAchievements

import { Layout } from "@/components/layout"
import DetailsHeader from "@/components/profile/DetailsHeader"
import UserDetailsAchievements from "@/components/profile/details/UserDetailsAchievements"
import UserDetailsAvaliations from "@/components/profile/details/UserDetailsAvaliations"
import { GetUser, GetUserAchievements, GetUserAvaliation } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"


interface UserGameAchievementsProps {
  params: { avaliationId: string, userId: string }
}

const UserAvaliation = async ({ params: { avaliationId, userId } }: UserGameAchievementsProps) => {
  const userAvaliation = await GetUserAvaliation(userId, Number(avaliationId))

  if(typeof userAvaliation === "string") redirect(`/profile/${userId}`)
  
  return (
    <Layout needConfirmEmail>
      <DetailsHeader id={userId} image={userAvaliation.user.image} nickname={userAvaliation.user.nickname} game={userAvaliation.game} />
      <UserDetailsAvaliations avaliation={userAvaliation} />
    </Layout>
  )
}

export default UserAvaliation
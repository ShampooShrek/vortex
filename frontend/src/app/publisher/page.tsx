import Publisher from "@/components/Publisher"
import { Layout } from "@/components/layout"
import DetailsHeader from "@/components/profile/DetailsHeader"
import { GetUserByToken, getGameDevelopers } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



const PublisherPage = async () => {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")
  if (!token) redirect("/home")


  const [developerGames, user] = await Promise.all([
    getGameDevelopers(token.value), GetUserByToken(token.value)
  ])


  if (typeof user === "string" || typeof developerGames === "string") redirect("/home")

  return (
    <Layout needConfirmEmail >
      <DetailsHeader nickname={user.nickname} image={user.image} id={user.id} sections={["Publicante"]} />
      <Publisher games={developerGames} />
    </Layout>
  )
}

export default PublisherPage

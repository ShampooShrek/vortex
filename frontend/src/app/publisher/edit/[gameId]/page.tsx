import PublisherEdit from "@/components/Publisher/Edit"
import { Layout } from "@/components/layout"
import DetailsHeader from "@/components/profile/DetailsHeader"
import { GetGameEdit, getCategories, getGenres, getSubgenres } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


interface PublisherEditProps {
  params: { gameId: string }
}


async function PublisherEditPage({ params: { gameId } }: PublisherEditProps) {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")
  if(!token) redirect("/home")

  const game = await GetGameEdit(Number(gameId), token.value)
  const categories = await getCategories()
  const genres = await getGenres()
  const subgenres = await getSubgenres()

  if(typeof game === "string" || typeof categories === "string" || 
    typeof genres == "string" || typeof subgenres === "string") 
    redirect("/home")

  return (
    <Layout needConfirmEmail>
      <PublisherEdit game={game} tags={ {categories, genres, subgenres} } />
    </Layout>
  )
}

export default PublisherEditPage
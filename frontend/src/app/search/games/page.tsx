import SearchGames from "@/components/Search/Games"
import { Layout } from "@/components/layout"
import { UserAuth } from "@/models/frontModels"
import { GetAllTags, GetFilters, GetUserByToken } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"


export default async function SearchGamesPage() {
  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")


  let user: UserAuth | null | string = null

  if(token) {
    const userRequest = await GetUserByToken(token.value)
    if(typeof userRequest !== "string") user = userRequest as UserAuth
  } 

  const tags = await GetAllTags()

  if(typeof tags === "string") redirect("/home")
  
  return (
    <Layout>
      <SearchGames tags={tags} />
    </Layout>    
  )
}
import SearchGames from "@/components/Search/Games"
import { Layout } from "@/components/layout"
import { GetAllTags } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"


export default async function SearchGamesPage() {
  const tags = await GetAllTags()
  if (typeof tags === "string") redirect("/store/games/2")

  return (
    <Layout>
      <SearchGames tags={tags} />
    </Layout>
  )
}

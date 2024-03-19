import { Layout } from "@/components/layout"
import StoreTags from "@/components/store/Tags"
import * as ApiRequests from "@/utils/ApiRequests"
import { redirect } from "next/navigation"

interface SubgenreProps {
  params: { subgenre: string }
}


const revalidateTime = 60 * 60 * 24 * 7

const SubgenrePage = async ({ params: { subgenre: encodeSubgenre } }: SubgenreProps) => {

  let portugueseName
  const subgenre = decodeURIComponent(encodeSubgenre).replaceAll("_", " ")

  const subgenres = await ApiRequests.getSubgenres()
  if (typeof subgenres !== "string") {
    const findSubgenre = subgenres.find(sub => sub.subgenre.toLowerCase() === subgenre.toLowerCase())
    findSubgenre ? portugueseName = findSubgenre.portugueseName : ""
  } else redirect("/home")

  const gamesHeaderResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subgenres/games_by_subgenre/${subgenre}`,
    { next: { revalidate: revalidateTime } })
  const gamesWithSubgenresResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subgenres/games_with_subgenres/${subgenre}`,
    { next: { revalidate: revalidateTime } })

  const gamesWithTagsResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/filter_games/${subgenre}`, { cache: "no-store", method: "POST" })
  const filtersResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/tags`, { cache: "no-store" })

  const [gamesHeaderResponse, gamesWithTagsResponse, gamesWithSubgenresResponse, filtersResponse] = await Promise.all([
    gamesHeaderResponsePromise, gamesWithTagsResponsePromise, gamesWithSubgenresResponsePromise, filtersResponsePromise
  ])

  const [gamesHeader, gamesWithSubgenres, gamesWithTags, filters] = await Promise.all([
    gamesHeaderResponse.json(), gamesWithSubgenresResponse.json(), gamesWithTagsResponse.json(), filtersResponse.json()
  ])

  return (
    <Layout header={true} topBarUser={true} topbar={true}>
      <StoreTags
        portugueseTag={portugueseName ?? ""}
        gamesContainers={gamesWithSubgenres.response}
        gamesFilters={gamesWithTags.response.games}
        gamesHeader={gamesHeader.response}
        filters={filters.response}
        tag={subgenre}
        limit={gamesWithTags.response.limit}
      />
    </Layout>
  )
}

export default SubgenrePage

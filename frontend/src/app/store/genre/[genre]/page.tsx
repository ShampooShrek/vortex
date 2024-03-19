import { Layout } from "@/components/layout"
import StoreTags from "@/components/store/Tags"
import * as ApiRequests from "@/utils/ApiRequests"
import { redirect } from "next/navigation"

interface GenreProps {
  params: { genre: string }
}

const revalidateTime = 60 * 60 * 24 * 7

const GenrePage = async ({ params: { genre: encodeGenre } }: GenreProps) => {

  let portugueseName

  const genre = decodeURIComponent(encodeGenre).replaceAll("_", " ")

  const genres = await ApiRequests.getGenres()
  if (typeof genres !== "string") {
    const findGenre = genres.find(g => g.genre.toLowerCase() === genre.toLowerCase())
    findGenre ? portugueseName = findGenre.portugueseName : ""
  } else redirect("/home")


  const gamesHeaderResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres/games_by_genre/${genre}`,
    { next: { revalidate: revalidateTime } })
  const gamesWithGenreResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres/games_with_genres/${genre}`,
    { next: { revalidate: revalidateTime } })

  const gamesWithTagsResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/filter_games/${genre}`, { cache: "no-store", method: "POST" })
  const filtersResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/tags`, { cache: "no-store" })

  const [gamesHeaderResponse, gamesWithGenreResponse, gamesWithTagsResponse, filtersResponse] = await Promise.all([
    gamesHeaderResponsePromise, gamesWithGenreResponsePromise, gamesWithTagsResponsePromise, filtersResponsePromise
  ])

  const [gamesHeader, gamesWithGenre, gamesWithTags, filters] = await Promise.all([
    gamesHeaderResponse.json(), gamesWithGenreResponse.json(), gamesWithTagsResponse.json(), filtersResponse.json()
  ])

  return (
    <Layout header={true} topBarUser={true} topbar={true}>
      <StoreTags
        portugueseTag={portugueseName ?? ""}
        gamesContainers={gamesWithGenre.response}
        gamesFilters={gamesWithTags.response.games}
        gamesHeader={gamesHeader.response}
        filters={filters.response}
        tag={genre}
        limit={gamesWithTags.response.limit}
      />
    </Layout>
  )
}

export default GenrePage

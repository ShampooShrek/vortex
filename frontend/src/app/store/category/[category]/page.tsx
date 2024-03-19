import { Layout } from "@/components/layout"
import StoreTags from "@/components/store/Tags"
import { getCategories } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
interface CategoryProps {
  params: { category: string }
}

const revalidateTime = 60 * 60 * 24 * 7

const Category = async ({ params: { category: encodeCategory } }: CategoryProps) => {

  let portugueseName
  const category = decodeURIComponent(encodeCategory).replaceAll("_", " ")

  const categories = await getCategories()

  if (typeof categories !== "string") {
    const findCategory = categories.find(c => c.category.toLowerCase() === category.toLowerCase())
    findCategory ? portugueseName = findCategory.portugueseName : ""
  } else redirect("/home")

  const gamesHeaderResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/games_by_categories/${category}`,
    { next: { revalidate: revalidateTime } })
  const gamesWithCategoryResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/games_with_category/${category}`,
    { next: { revalidate: revalidateTime } })

  const gamesWithTagsResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/filter_games/${category}`, { cache: "no-store", method: "POST" })
  const filtersResponsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/filters/tags`, { cache: "no-store" })

  const [gamesHeaderResponse, gamesWithCategoryResponse, gamesWithTagsResponse, filtersResponse] = await Promise.all([
    gamesHeaderResponsePromise,
    gamesWithCategoryResponsePromise,
    gamesWithTagsResponsePromise,
    filtersResponsePromise
  ])
  const [gamesHeader, gamesWithCategory, gamesWithTags, filters] = await Promise.all([
    gamesHeaderResponse.json(),
    gamesWithCategoryResponse.json(),
    gamesWithTagsResponse.json(),
    filtersResponse.json()
  ])

  return (
    <Layout header={true} topBarUser={true} topbar={true}>
      <StoreTags
        portugueseTag={portugueseName ?? ""}
        gamesContainers={gamesWithCategory.response}
        gamesFilters={gamesWithTags.response.games}
        gamesHeader={gamesHeader.response}
        filters={filters.response}
        tag={category}
        limit={gamesWithTags.response.limit}
      />

    </Layout>
  )
}

export default Category

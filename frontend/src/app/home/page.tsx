import HomeCarouselCard from "@/components/home/HomeCarouselCard"
import PopularGame from "@/components/home/PopularGames"
import { Layout } from "@/components/layout"
import { Line } from "@/styles/global"
import Categories from "@/components/home/Categories"
import { cookies } from "next/headers"
import GameCards from "@/components/GameCards"
import { HomeRequest } from "@/models/dbModels"
import { Response } from "@/models/frontModels"
import { redirect } from "next/navigation"

export default async function Home() {
  const fetchData = async (): Promise<HomeRequest | null> => {
    const useCookies = cookies()
    const token = useCookies.get("vortex-auth-token")
    console.log(token)

    const headers = token ? {
      'Authorization': `Bearer ${token ? token.value : ""}`
    } : undefined

    try {
      const homeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/home`, {
        headers,
        cache: "no-store",
      })

      const homeData: Response<HomeRequest> = await homeResponse.json()
      console.log(homeData)

      if (typeof homeData.response === "string") return null

      for (const key in homeData.response) {
        const keyResp = homeData.response[key as keyof HomeRequest]
        if (typeof keyResp === "string") return null
      }

      return homeData.response as HomeRequest;

    } catch (err) {
      return null
    }
  };

  const fetching = async (): Promise<HomeRequest> => {
    let requests = 0
    let resp = await fetchData()
    while (!resp && requests < 5) {
      requests++
      resp = await fetchData()
    }

    if (requests >= 5 && !resp)
      redirect("/search/games")
    else
      return resp as HomeRequest
  }

  let homeData = await fetching();


  const { popularGames, categories, recomendedGames, especialPromotions } = homeData;

  return (
    <Layout topBarUser={true} header={true} topbar={true}>
      <div>
        <PopularGame popularGames={popularGames} />
      </div>
      <div>
        <Line />
        <HomeCarouselCard games={recomendedGames} section="Recomendados" />
      </div>

      <div>
        <Line />
        <HomeCarouselCard games={especialPromotions} section="Promoções Especiais" />
      </div>
      <div>
        <Line />
        <Categories categories={categories} />
      </div>
      <div>
        <Line />
        <GameCards />
      </div>
    </Layout>
  )
}

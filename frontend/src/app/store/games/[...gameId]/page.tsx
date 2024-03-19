import { Layout } from "@/components/layout"
import StoreGame from "@/components/store/Games"
import { GamesStore, Response } from "@/models/frontModels"
import { GetUserAvaliation, GetUserAvaliations } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface AppProps {
  params: {
    gameId: string[]
  }
}

const StoreGamePage = async ({ params }: AppProps) => {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  let userAvaliations = null;

  if (token) {
    const avaliationsResponse = await GetUserAvaliations(token.value)
    if (typeof avaliationsResponse !== "string") {
      userAvaliations = avaliationsResponse
    }
  }

  const gameResponse: Response<GamesStore> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${params.gameId[0]}`, { cache: "no-store" })
    .then(resp => resp.json())

  const game = typeof (gameResponse.response) !== "string" && gameResponse.response

  if (!game) redirect("/home")

  return (
    <Layout>
      <StoreGame userAvaliations={userAvaliations} game={game} />
    </Layout>
  )
}

export default StoreGamePage

import { Layout } from "@/components/layout"
import StoreGame from "@/components/store/Games"
import { GamesStore, Response } from "@/models/frontModels"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface AppProps {
  params: {
    gameId: string[]
  }
}

const StoreBetaGamePage = async ({ params }: AppProps) => {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  if (!token) redirect("/home")

  const gameResponse: Response<GamesStore> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/beta/${params.gameId[0]}`, {
    cache: "no-store",
    headers: {
      'authorization': `Bearer ${token.value}`
    }
  }).then(resp => resp.json())


  const game = typeof (gameResponse.response) !== "string" && gameResponse.response

  if (!game) redirect("/home")

  return (
    <Layout needConfirmEmail>
      <StoreGame userAvaliations={null} game={game} />
    </Layout>
  )
}

export default StoreBetaGamePage

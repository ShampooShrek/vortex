import { Layout } from "@/components/layout"
import * as S from "./style"
import { GameImageCap } from "@/models/dbModels"
import { GamesStoreEdit, Response, UserAuth } from "@/models/frontModels"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import DetailsHeader from "@/components/profile/DetailsHeader"

interface BetaGameImagesProps {
  params: { gameId: string }
}

export default async function BetaGameImages({ params: { gameId } }: BetaGameImagesProps) {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  if (!token) redirect("/home")

  const gameResponse: Response<GamesStoreEdit> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/beta/${gameId}/images`, {
    headers: {
      'authorization': `Bearer ${token.value}`
    }
  }).then(resp => resp.json())

  if (typeof gameResponse === "string") redirect("/home");

  const { gameBackgroundImage, images, videos, gameIconImage, gamePopularImage, verticalCap, horizontalCap, name, id }
    = gameResponse.response as GamesStoreEdit


  const Image = ({ img, type }: { img: GameImageCap, type: string }) => {
    return (
      <S.ImageContainer>
        <h2>{type}</h2>
        <a href={img.url}>Imagem</a>
      </S.ImageContainer>
    )
  }

  return (
    <Layout needConfirmEmail>
      <DetailsHeader sections={["administração", "jogo", "imagem", `${name} (${id})`]} />
      <Image img={horizontalCap} type="Imagem Horizontal" />
      <Image img={verticalCap} type="Imagem Vertical" />
      <Image img={gamePopularImage} type="Imagem de jogo Popular" />
      <Image img={gameIconImage} type="Icone do Jogo" />
      <Image img={gameBackgroundImage} type="Imagem de fundo do Jogo" />
      {/* <Image img={gameIconImage} type="Imagem de fundo do Jogo" /> */}
    </Layout>
  )
}

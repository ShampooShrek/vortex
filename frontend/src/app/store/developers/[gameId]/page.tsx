import { DevelopersRequest } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
import * as S from "./style"
import UsersContainers from "@/components/UsersContainers"
import { OtherUsers } from "@/models/frontModels"
import Link from "next/link"
import { Layout } from "@/components/layout"

interface GameDevelopersPageProps {
  params: { gameId: string }
}
 
export default async function GameDevelopersPage({ params: { gameId } }: GameDevelopersPageProps) {

  const game = await DevelopersRequest(Number(gameId))

  if(typeof game === "string") redirect("/home")

  const develoérs = game.developers

  return (
    <Layout>
      <S.Container>
      <S.HeaderContainer>
        <S.GameName>
          <Link href={`/store/games/${game.id}`}>{game.name} - Desenvolvedores</Link>
        </S.GameName>
        <S.GameImage href={`/store/games/${game.id}`}>
          <img src={game.horizontalCap.url} alt="" />
        </S.GameImage>
      </S.HeaderContainer>
      <S.CardContainers>
        <UsersContainers users={develoérs as OtherUsers[]} headerTitle="Desenvolvedores" />
      </S.CardContainers>
    </S.Container>
    </Layout>
  )
}
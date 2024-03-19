import Content from "./Content"
import { GamesStore } from "@/models/frontModels";

interface HomeCarouselCardProps {
  games: GamesStore[] | string | null
  section: string
}

export default async function HomeCarouselCard({ section, games }: HomeCarouselCardProps) {

  if (typeof games === "string") return <p>Ops, não foi possivel fazer a requesição</p>

  return (
    <Content games={games} section={section} />
  )
}

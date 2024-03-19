import Discount from "@/components/Discount"
import * as S from "./style"
import { GamesStore } from "@/models/frontModels"

interface CategoryGamesCardProps {
  game: GamesStore
}

export const CategoryGamesCard = ({ game }: CategoryGamesCardProps) => {

  return (
    <S.Card href={`/store/games/${game.id}`} >
      <S.ImageContainer>
        <S.Image  src={game.horizontalCap.url} />
      </S.ImageContainer>
      <S.DiscountContainer>
        <Discount discount={game.discount ?? 0} price={game.price} />
      </S.DiscountContainer>
    </S.Card>
  )
}

export default CategoryGamesCard
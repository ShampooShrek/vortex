import * as S from "./style"
import { GamesStore } from "@/models/frontModels";
import { MatrizOfArray } from "@/utils/ArrayToMatriz";
import Card from "../../Card";

interface GamesContainerProps {
  games: GamesStore[]
  matrizQtde: number
  isSelected: boolean
}

export default function GamesContainer({ games, isSelected, matrizQtde }: GamesContainerProps) {
  console.log(games)
  const currentRows = Math.ceil(games.length / matrizQtde)
  const totalRows = 12 / matrizQtde
  const emptyRows = totalRows - currentRows

  return (
    <div style={{ display: isSelected ? "block" : "none" }}>
      {MatrizOfArray(games, matrizQtde).map((matriz, i) => (
        <S.CardContainerDiv key={`matriz-div-${i}`}>
          {matriz.map((game, i) => (
            <Card game={game} key={`card-matriz-${i}`} gamesLength={games.length - 1} index={i} />
          ))}
        </S.CardContainerDiv>
      ))}
      {emptyRows > 0 && Array.from({ length: emptyRows }, (_, i) => (
        <S.CardContainerDiv key={`matriz-empty-div-${i}`}>
          <div style={{ width: "100%", height: 150 }}></div>
        </S.CardContainerDiv >
      ))}
    </div>
  )
} 

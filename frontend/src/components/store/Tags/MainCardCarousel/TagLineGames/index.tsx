import { Games } from "@/models/dbModels"
import * as S from "./style"

interface CategoryLineGamesProps {
  gameIndex: number
  games: Games[]
  setGame(index: number): void
}

const CategoryLineGames = ({ gameIndex, games, setGame }: CategoryLineGamesProps) => {

  const handleSetGame = (index: number) => {
    setGame(index)
    if(index !== gameIndex) {
      if (gameIndex < index) {
        document.getElementById("card-container")?.classList.add("anim", "next");
        document.getElementById("game-image-bg")?.classList.add("anim");
      } else if(gameIndex > index) {
        document.getElementById("card-container")?.classList.add("anim", "preview");
        document.getElementById("game-image-bg")?.classList.add("anim");
      } 
  
      // Remover as classes de animação após a animação terminar
      setTimeout(() => {
        document.getElementById("card-container")?.classList.remove("anim", "preview", "next");
        document.getElementById("game-image-bg")?.classList.remove("anim");
      }, 100);
    }
  }

  return (
    <S.Container>
      {games.map((e, i) => (
        <S.Button onClick={() => handleSetGame(i) } className={gameIndex === i ? "selected" : ""} key={e.id}>
          {i + 1}
        </S.Button>
      ))}
    </S.Container>
  )
}

export default CategoryLineGames
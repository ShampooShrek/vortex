import Card from "@/components/GameCards/Card"
import TagFilterDropDown from "./TagFilterDropDown"
import TagGamesHeader from "./Header"
import * as S from "./style"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import { GameCategories, Genres, Subgenres } from "@/models/dbModels"
import { useState, useEffect } from "react"
import { GamesStore } from "@/models/frontModels"

interface Filters {
  categories: GameCategories[]
  genres: Genres[]
  subgenres: Subgenres[]
}

interface CategoryGamesProps {
  games: GamesStore[]
  filters: Filters
  tag: string
  limit: number
}

export const TagGames = ({ games: initialGames, filters, tag, limit }: CategoryGamesProps) => {

  const [buttonVisible, setButtonVisible] = useState(true)
  const [page, setPage] = useState(1)
  const [games, setGames] = useState<GamesStore[]>(initialGames)
  const [selectedSortingFilter, setSelectedSortingFilter] = useState<"mostsallers" | "promotions" | "betteravaliations" | null>(null)
  const [matrizQtde, setMatrizQtde] = useState(3)
  const [emptyDivs, setEmptyDivs] = useState(0)

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    if (games.length > 0) {
      const currentDivs = Math.ceil(games.length / matrizQtde)
      const totalDivs = 12 / matrizQtde
      setEmptyDivs(totalDivs - currentDivs)
    }
  }, [games, page, matrizQtde])

  useEffect(() => {
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth
    if (clientWidth > 960) {
      setMatrizQtde(3)
    }
    if (clientWidth < 960) {
      setMatrizQtde(2)
    }
    if (clientWidth <= 600) {
      setMatrizQtde(1)
    }
  }

  const handleFilterGames = (newGames: GamesStore[]) => {
    setPage(1)
    setButtonVisible(true)
    setGames(newGames)
  }

  const handleGamesPagination = (newGames: GamesStore[]) => {
    if (newGames.length < limit) setButtonVisible(false)
    setGames(prev => [...prev, ...newGames])
  }

  const handleSorting = (filter: "mostsallers" | "promotions" | "betteravaliations" | null) => {
    if (filter !== selectedSortingFilter) {
      setPage(1)
      setButtonVisible(true)
      setSelectedSortingFilter(filter)
    }
  }

  return (
    <S.Container>
      <TagGamesHeader handleSelectSortingFilter={handleSorting} sortingFilterSelected={selectedSortingFilter} />
      <TagFilterDropDown
        page={page}
        sortingFilter={selectedSortingFilter}
        tag={tag} handleFilterGames={handleFilterGames}
        handleGamesPagination={handleGamesPagination}
        filters={filters}
      />
      <S.CardContainer>
        {games.length === 0 ? (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <S.CardContainerDiv key={`empty-div-${i}`}>
                <div style={{ width: "100%", height: 200 }} />
              </S.CardContainerDiv>
            ))}
          </>
        ) : (
          <>
            {MatrizOfArray(games, matrizQtde).map((matriz, i) => (
              <S.CardContainerDiv key={`matriz-games-div-${i}`}>
                {matriz.map((game, i) => (
                  <Card key={`${game.id}-${i}`} game={game} gamesLength={games.length - 1} index={i} />
                ))}
              </S.CardContainerDiv>
            ))}
            {emptyDivs > 0 && Array.from({ length: emptyDivs - 1 }, (_, i) => (
              <S.CardContainerDiv key={`empty-div-${i}`}>
                <div style={{ width: "100%", height: 200 }} />
              </S.CardContainerDiv>
            ))}
            {}
          </>
        )}
      </S.CardContainer>
      {buttonVisible && (
        <S.Button onClick={() => setPage(prev => prev + 1)}>
          Ver Mais
        </S.Button>
      )}
    </S.Container>
  )
}

export default TagGames

"use client"

import { useState } from "react"
import * as S from "./style"
import MainCardsCarousel from "@/components/store/Tags/MainCardCarousel"
import { Line } from "@/styles/global"
import TagsGamesContainer from "@/components/store/Tags/TagGamesContainer"
import TagsGames from "@/components/store/Tags/Games"
import { Filters, GamesStore } from "@/models/frontModels"

interface GamesContainers {
  section: string
  games: GamesStore[]
}

interface StoreTagProps {
  gamesHeader: GamesStore[]
  gamesContainers: GamesContainers[]
  gamesFilters: GamesStore[]
  filters: Filters
  tag: string
  portugueseTag: string
  limit: number
}


const StoreTag = ({ tag, portugueseTag, filters, gamesHeader, gamesFilters, gamesContainers, limit }: StoreTagProps) => {

  const [selectedGame, setSelectedgame] = useState<GamesStore>(gamesHeader[0])

  const setNextGame = (type: "preview" | "next") => {
    const gameIndex = gamesHeader.findIndex(game => game.id === selectedGame!.id)
    const nextIndex = type === "next" ? gameIndex + 1 : gameIndex - 1

    if (nextIndex < 0) setSelectedgame(gamesHeader[gamesHeader.length - 1])
    else if (nextIndex > gamesHeader.length - 1) setSelectedgame(gamesHeader[0])
    else setSelectedgame(gamesHeader[nextIndex])
  }

  const setGame = (index: number) => {
    setSelectedgame(gamesHeader[index])
  }

  return (
    <>
      <S.Title>{portugueseTag ? portugueseTag.toUpperCase() : tag.toUpperCase()}</S.Title>
      {gamesHeader.length > 0 && (
        <MainCardsCarousel
          nextGame={setNextGame}
          game={selectedGame!}
          setGame={setGame}
          games={gamesHeader}
          gameIndex={gamesHeader.findIndex(g => g.id === selectedGame!.id)}
        />
      )}
      <Line />
      {gamesContainers.length > 0 && gamesContainers.map(games => (
        <TagsGamesContainer key={games.section} title={games.section} games={games.games} />
      ))}
      <TagsGames tag={tag} filters={filters!} games={gamesFilters} limit={limit} />
    </>
  )
}

export default StoreTag

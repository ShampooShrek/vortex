"use client"

import * as S from "./style"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FiltersOptions, GamesStore } from "@/models/frontModels"
import ContainerGameJolt from "../../ContainerGameJolt"
import GamesContainer from "./Games"
import { useQuery } from "react-query"
import ApiRequest from "@/utils/ApiRequests"


interface GameCardsResponse {
  newGames: GamesStore[] | string
  gamesWithPromotions: GamesStore[] | string
  betterAvaliations: GamesStore[] | string
  bestSallers: GamesStore[] | string
}

const getGames = async (): Promise<GameCardsResponse | string> => {
  const resp = await ApiRequest<GameCardsResponse>("/api/games/home/games", "get")
  if (resp) {
    if (resp.type === "success") {
      return resp.response as GameCardsResponse
    } else {
      return resp.response as string
    }
  }
  return "Ops, algo deu errado na requesição!"
}

export default function Content() {

  const { data, isLoading, error } = useQuery({ queryFn: getGames, queryKey: ["home-games"] })

  const [selectedOption, setSelectedOption] = useState<string>("new")
  const [matrizQtde, setMatrizQtde] = useState(3)

  useEffect(() => {
    resize()
  }, [])

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

  const newFilter = (key: string, filter: GamesStore[]) => {
    setSelectedOption(key)
  }

  const emptyArrayOrGames = (value: any[] | string): any[] => {
    if (typeof value === "string") return []
    else return value
  }

  const filters: FiltersOptions[] = [
    { onClick: () => newFilter("new", emptyArrayOrGames(newGames)), option: "Novos", key: "new" },
    { onClick: () => newFilter("bestSallers", emptyArrayOrGames(bestSallers)), option: "Mais Vendidos", key: "bestSallers" },
    { onClick: () => newFilter("betterAvaliations", emptyArrayOrGames(betterAvaliations)), option: "Melhores Avaliados", key: "betterAvaliations" },
    { onClick: () => newFilter("promotions", emptyArrayOrGames(gamesWithPromotions)), option: "Promoções", key: "promotion" },
  ]

  if (isLoading) {
    return (
      <ContainerGameJolt selectedFilter={selectedOption} filters={filters} >
        <S.CardContainer>
          <S.CardLoading>
            <Image src="/loading.gif" width={100} height={100} alt={"Loading Gif"} />
          </S.CardLoading>
        </S.CardContainer>
      </ContainerGameJolt>
    )
  } else if (error || typeof data === "string") {
    return (
      <ContainerGameJolt selectedFilter={selectedOption} filters={filters} >
        <S.CardContainer >
          <p>Ops, algo deu errado, tente novamente mais tarde!</p>
        </S.CardContainer>
      </ContainerGameJolt>
    )
  }

  const { newGames, bestSallers, gamesWithPromotions, betterAvaliations } = data as GameCardsResponse
  console.log(data)

  return (
    <ContainerGameJolt selectedFilter={selectedOption} filters={filters} >
      <S.CardContainer>
        <GamesContainer games={emptyArrayOrGames(newGames)} isSelected={selectedOption === "new"} matrizQtde={matrizQtde} />
        <GamesContainer games={emptyArrayOrGames(bestSallers)} isSelected={selectedOption === "bestSallers"} matrizQtde={matrizQtde} />
        <GamesContainer games={emptyArrayOrGames(betterAvaliations)} isSelected={selectedOption === "betterAvaliations"} matrizQtde={matrizQtde} />
        <GamesContainer games={emptyArrayOrGames(gamesWithPromotions)} isSelected={selectedOption === "promotions"} matrizQtde={matrizQtde} />
      </S.CardContainer>
    </ContainerGameJolt >
  )
}


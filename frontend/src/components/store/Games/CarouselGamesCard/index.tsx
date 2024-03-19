"use client"

import { useRouter } from "next/navigation"
import { GamesStore } from "@/models/frontModels"
import * as S from "./style"
import slugfyString from "@/utils/urlSlug"
import GameCardDropDown from "@/components/GamesdropDown"
import { useState } from "react"

interface CarouselGamesCard {
  game: GamesStore
  index: number
  mainWidth: number
  marginRight: number
  defaultMargin: number
}

const CarouselGamesCard = ({ game, mainWidth, index, marginRight, defaultMargin }: CarouselGamesCard) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)

  const redirect = () => {
    const nameStringfy = slugfyString(game.name)
    const path = `/store/games/${game.id}`
    if (window.location.pathname == `${path}/${nameStringfy}` || window.location.pathname == path) {
      router.refresh()
    } else {
      router.push(path)
    }
  }

  return (
    <S.Card onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      defaultMargin={defaultMargin}
      marginRight={marginRight}
      MainWidth={mainWidth}
      onClick={redirect}>
      <GameCardDropDown
        categories={game.categories}
        images={game.images}
        isHover={isHover}
        synopsi={game.synopsi}
        name={game.name}
        index={null} />
      <S.GameImage src={game.verticalCap ? game.verticalCap.url : "/player.jpg"} />
      <S.GameContent>
        <S.GameName>{game.name}</S.GameName>
        <S.GamePrice>R${game.price.toFixed(2)}</S.GamePrice>
      </S.GameContent>
    </S.Card>
  )
}

export default CarouselGamesCard

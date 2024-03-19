"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as S from "./style"
import DropDown from "../../GamesdropDown"
import { GamesStore } from "@/models/frontModels"
import Link from "next/link"

interface CardProps {
  game: GamesStore
  gamesLength: number
  index: number
}

const Card = ({ game, gamesLength, index }: CardProps) => {
  const [isHover, setIsHover] = useState<number>(-1)
  const router = useRouter()

  const { discount, price, name, horizontalCap: { url: imgUrl }, images, categories, synopsi } = game

  return (
    <S.CardGame onMouseEnter={() => setIsHover(index)} onMouseLeave={() => setIsHover(-1)}
      gameIndex={index} gameLength={gamesLength}>
      <Link replace href={`/store/games/${game.id}`}>
        <S.ImageDiv>
          <img src={imgUrl} alt={name} />
          <DropDown index={index + 1} isHover={isHover > -1 && isHover === index} images={images}
            categories={categories} synopsi={synopsi} name={name} />
        </S.ImageDiv>
        <S.CardContent>
          <S.GameTitle>{name}</S.GameTitle>
          <S.GamePriceContainer>
            {discount > 0 ? (
              <>
                <S.GamePriceDiscountPercent>-{(discount * 100).toFixed(0)}%</S.GamePriceDiscountPercent>
                <S.GamePriceContainerContent>
                  <S.OriginalGamePrice>R${game.price}</S.OriginalGamePrice>
                  <S.GamePrice>R${(game.price * (1 - discount)).toFixed(2)}</S.GamePrice>
                </S.GamePriceContainerContent>
              </>
            ) : (
              <S.GamePrice>R${game.price}</S.GamePrice>
            )}
          </S.GamePriceContainer>
        </S.CardContent>
      </Link>
    </S.CardGame>
  )
}

export default Card

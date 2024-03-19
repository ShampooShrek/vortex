"use client"

import Link from "next/link"
import Discount from "../Discount"
import * as S from "./style"
import { useRouter } from "next/navigation"

type CardProps = {
  imgUrl: string
  price: number
  id: number
  title: string
  discount: number
  marginRight: number
}


function CarouselCard({ discount, id, imgUrl, price, title, marginRight }: CardProps) {

  const RenderPrice = () => (
    <>
      {discount ? (
        <Discount discount={discount} price={price} />
      ) : (
        <S.GamePrice>
          <p>
            R$ {price}
          </p>
        </S.GamePrice>
      )}
    </>
  )

  return (
    <S.GamesCard marginRight={marginRight} key={`${title}--${id}`}>
      <Link replace href={`/store/games/${id}`}>
        <S.ImageContainer>
          <img src={imgUrl} alt={title} />
        </S.ImageContainer>
        <S.GamesContent>
          <S.GameTitle>
            {title}
          </S.GameTitle>
          <RenderPrice />
        </S.GamesContent>
      </Link>
    </S.GamesCard>
  )
}

export default CarouselCard
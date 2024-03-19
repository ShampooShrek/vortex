"use client"

import * as S from "./style"
import { Carousel } from "../../../Carousel"
import CarouselCard from "@/components/CarouselCards"
import { ArrowLeft, ArrowRight } from "@/components/Icons"
import { useState, useEffect } from "react"
import { GamesStore } from "@/models/frontModels"

interface RecomendedProps {
  section: string
  games: GamesStore[] | null
}

const Content = ({ games, section }: RecomendedProps) => {

  const [itemIndex, setItemIndex] = useState<number>(0)
  const [isAnim, setIsAnim] = useState<boolean>(false)
  const [carouselItemsQtde, setCarouselItemsQtde] = useState(5)
  const [gamesLength, setGamesLength] = useState(games ? games.length : 1)
  const [marginCard, setImageWidth] = useState(10 - (10 / Math.ceil(gamesLength / carouselItemsQtde)))

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("DOMContentLoaded", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    setGamesLength(games ? games.length : 1)
  }, [games])

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth

    if (clientWidth > 960) {
      setCarouselItemsQtde(5)
    } else if (clientWidth < 960 && clientWidth > 764) {
      setCarouselItemsQtde(4)
    } else if (clientWidth < 764 && clientWidth > 600) {
      setCarouselItemsQtde(3)
    } else if (clientWidth < 600 && clientWidth > 510) {
      setCarouselItemsQtde(1)
    } else {
      setCarouselItemsQtde(1)
    }

    setIsAnim(true);
  };

  useEffect(() => {
    setImageWidth(10 - (10 / Math.ceil(gamesLength / carouselItemsQtde)))
  }, [carouselItemsQtde])

  const handleLeftButton = () => {
    if (itemIndex > 0) {
      setIsAnim(true)
      setItemIndex((index) => Math.max(0, index - carouselItemsQtde))
    }
  }

  const handleRightButton = () => {
    if (itemIndex < gamesLength - carouselItemsQtde) {
      setIsAnim(true)
      setItemIndex((index) => Math.min(index + carouselItemsQtde, gamesLength - carouselItemsQtde))
    }
  }

  return (
    <S.Container>
      <S.SectionAndButtons>
        {section && <h2>{section}</h2>}
        <S.Buttons>
          <ArrowLeft onClick={handleLeftButton} />
          <ArrowRight onClick={handleRightButton} />
        </S.Buttons>
      </S.SectionAndButtons>
      {games ? (
        <Carousel cardMargin={10} itemsLength={gamesLength} setIsAnim={() => setIsAnim(false)} isAnim itemIndex={itemIndex} >
          {games.map((game, i) => {
            return (
              <CarouselCard marginRight={marginCard < 5 ? 5 : marginCard} discount={game.discount!} id={game.id}
                imgUrl={game.verticalCap.url} price={game.price}
                title={game.name}
                key={`CarouselCard--${i}`}
              />
            )
          })}
        </Carousel>
      ) : (
        <S.NoTokenContent>
          <h3>Faça login para receber recomendações</h3>
        </S.NoTokenContent>
      )}
    </S.Container>
  )
}

export default Content

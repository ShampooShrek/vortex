"use client"

import * as S from "./style"
import TagGamesCard from "./TagGamesCard"
import { useEffect, useRef, useState } from "react"
import ButtonNextPreview from "../Button"
import { MatrizOfMatriz } from "@/utils/ArrayToMatriz"
import { GamesStore } from "@/models/frontModels"
import { Line } from "@/styles/global"
import { ArrowLeft, ArrowRight } from "@/components/Icons"

interface CategoryGamesContainerProps {
  games: GamesStore[]
  title: string
}

const CategoryGamesContainer = ({ games, title }: CategoryGamesContainerProps) => {

  const contentRef = useRef<HTMLDivElement>(null)
  const [matrizIndex, setMatrizIndex] = useState<number>(0)
  const [gamesMatriz, setGameMatriz] = useState<GamesStore[][][]>([])

  const [matrizLength, setMatrizLength] = useState(3)


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

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth

    if (clientWidth > 960) {
      setMatrizLength(3)
    } else {
      setMatrizLength(2)
    }
  }

  useEffect(() => {
    setGameMatriz(MatrizOfMatriz(games, matrizLength))
  }, [matrizLength])

  const handleSetMatrizIndex = (type: "next" | "preview") => {
    if (type === "next") {
      if (gamesMatriz[matrizIndex + 1] === undefined) {
        setMatrizIndex(0)
      } else {
        setMatrizIndex((i) => i + 1);
      }
    } else {
      if (matrizIndex < 1) {
        setMatrizIndex(gamesMatriz.length - 1)
      } else {
        setMatrizIndex((i) => i - 1);
      }
    }
    if (contentRef.current) {
      if (gamesMatriz.length > 1) {
        if (type === "next") {
          contentRef.current.classList.add("anim", "next")
        } else {
          contentRef.current.classList.add("anim", "preview")
        }
      }

      // Remover as classes de animação após a animação terminar
      setTimeout(() => {
        contentRef.current?.classList.remove("preview", "next", "preview");
      }, 100);
    }
  }

  if (!games) return <p>AAAQ</p>

  if (games.length > 0) {
    return (
      <>
        <S.Container>
          <S.Title>{title}</S.Title>
          <ButtonNextPreview type="preview" onClick={() => handleSetMatrizIndex("preview")} />
          <S.Content ref={contentRef}>
            {gamesMatriz.length > 0 && gamesMatriz[matrizIndex] !== undefined && gamesMatriz[matrizIndex].map((matriz, i) => (
              <S.ContentCardsContaier key={`matriz-${i}`} >
                {matriz.map((game, i) => (
                  <TagGamesCard key={`matriz-content-${game.id}-${i}`} game={game} />
                ))}
              </S.ContentCardsContaier>
            ))}
          </S.Content>
          <ButtonNextPreview type="next" onClick={() => handleSetMatrizIndex("next")} />
          <S.ArrowsMobileContainer>
            <ArrowLeft onClick={() => handleSetMatrizIndex("preview")} />
            <ArrowRight onClick={() => handleSetMatrizIndex("next")} />
          </S.ArrowsMobileContainer>
        </S.Container>
        <Line />
      </>
    )
  } else {
    return <p></p>
  }

}

export default CategoryGamesContainer

"use client"

import { FC, useEffect, useState } from "react"
import * as S from "./style"
import { GamesStore } from "@/models/frontModels"
import { ArrowLeft, ArrowRight } from "@/components/Icons"

interface PopularGamesProps {
  games: GamesStore[]
}

export default function Content({ games: popularGamesProps }: PopularGamesProps) {

  const [popularGames, setPopularGames] = useState(popularGamesProps)
  const [gameSelected, setGameSelected] = useState<GamesStore>(popularGamesProps[0])
  const [gameIndex, setGameIndex] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [showListItems, setShowListItems] = useState(true)

  useEffect(() => {
    if (showListItems) {
      setGameSelected(popularGames[gameIndex > popularGames.length - 1 ? 0 : gameIndex])
      const interval = setInterval(() => {
        setProgress((progress) => {
          const nextProgress = progress + 25
          if (progress >= 100) {
            const index = findGameIndex(gameSelected.id)
            setGameIndex(gameIndex => popularGames[index + 1] === undefined ? 0 : index + 1)
            return 0
          }
          return nextProgress
        })
      }, 2500)

      return () => {
        clearInterval(interval)
      }
    }
  }, [progress, showListItems])

  useEffect(() => {
    if (progress === 0) {
      setTimeout(() => {
        setProgress(25)
      }, 50)
    }
  }, [progress])

  useEffect(() => {

    const resize = () => {
      const width = screen.width < window.innerWidth ? screen.width : window.innerWidth

      if (width <= 760) {
        setShowListItems(false)
      } else {
        setShowListItems(true)
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("DOMContentLoaded", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const findGameIndex = (id: number): number => {
    let index = 0
    popularGames.forEach((game, i) => {
      if (game.id === id) index = i
    })
    return index
  }

  const selectGameCarousel = (game: GamesStore) => {
    const index = findGameIndex(game.id)
    if (gameIndex !== index) {
      setGameIndex(index)
      setProgress(0)
    }
  }

  const selectNextgame = () => {
    const game = popularGames[gameIndex + 1]
    if (!game) {
      setGameIndex(0)
    } else {
      setGameIndex(prev => prev + 1)
    }
  }
  const selectPreviusgame = () => {
    const game = popularGames[gameIndex - 1]
    if (!game) {
      setGameIndex(4)
    } else {
      setGameIndex(prev => prev - 1)
    }
  }

  return (
    <S.Container>
      {popularGames.map((game, i) => (
        <S.ImageItem isSelected={i === gameIndex} key={`popular-game-${i}`}>
          <img src={game.gamePopularImage.url} alt={game.gamePopularImage.name} />
          <S.ImageTextContainer>
            <h1>{game.name}</h1>
            <p>{game.synopsi}</p>
            <span>A partir de <S.Price>R${game.price}</S.Price></span>
            <div>
              <S.Button replace href={`/store/games/${game.id}`} >Saiba Mais</S.Button>
            </div>
          </S.ImageTextContainer>
        </S.ImageItem>
      ))}
      <S.ListItems>
        {popularGames ? popularGames.map((game) => (
          <S.Item isSelected={gameSelected.id === game.id} key={game.id} onClick={() => selectGameCarousel(game)} >
            <img src={game.verticalCap.url} alt={game.verticalCap.name} width={500} height={500} />
            <span>{game.name}</span>
            {gameSelected.id === game.id && (
              <S.ProgressBar progressWidth={progress} />
            )}
          </S.Item>
        )) : (
          <S.ItemSkeleton count={5} />
        )}
      </S.ListItems>
      <S.ListButtonsContainer>
        <ArrowLeft onClick={selectPreviusgame} />
        <S.ListButtons>
          <S.ListButton onClick={() => selectGameCarousel(popularGames[0])} isSelected={gameIndex === 0} />
          <S.ListButton onClick={() => selectGameCarousel(popularGames[1])} isSelected={gameIndex === 1} />
          <S.ListButton onClick={() => selectGameCarousel(popularGames[2])} isSelected={gameIndex === 2} />
          <S.ListButton onClick={() => selectGameCarousel(popularGames[3])} isSelected={gameIndex === 3} />
          <S.ListButton onClick={() => selectGameCarousel(popularGames[4])} isSelected={gameIndex === 4} />
        </S.ListButtons>
        <ArrowRight onClick={selectNextgame} />
      </S.ListButtonsContainer>
    </S.Container >

  )
}


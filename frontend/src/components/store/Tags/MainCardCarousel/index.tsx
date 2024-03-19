"use client"

import * as S from "./style"
import { useEffect, useRef, useState } from "react"
import TagLineGames from "./TagLineGames"
import ButtonNextPreview from "../Button"
import { GamesStore } from "@/models/frontModels"
import DateFormater, { DateFormaterBar } from "@/utils/dateFormater"
import avaliationNoteString from "@/utils/avaliationNoteString"
import slugfyString from "@/utils/urlSlug"

interface MainCardCarouselProps {
  gameIndex: number
  games: GamesStore[]
  game: GamesStore
  setGame(index: number): void
  nextGame(type: "preview" | "next"): void
}

const MainCardCarousel = ({ game: selectedGame, nextGame, gameIndex, games, setGame }: MainCardCarouselProps) => {
  const [isAnim, setIsAnim] = useState(false)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const gameImageBg = useRef<HTMLImageElement>(null)

  const setNextGame = (type: "preview" | "next") => {
    setIsAnim(true)
    nextGame(type)

    // Remover as classes de animação após a animação terminar
    setTimeout(() => {
      setIsAnim(false)
      cardContainerRef.current?.classList.remove("anim", "preview", "next");
      gameImageBg.current?.classList.remove("anim");
    }, 100);
  }

  return (
    <S.Container>
      {games.map((game, i) => (
        <S.Card isSelected={game.id === selectedGame.id} key={`better-tag-${i}`} >
          <S.GameImageBg ref={gameImageBg} src={game.gameBackgroundImage.url} />
          <S.AnimationContainer ref={cardContainerRef}>
            <ButtonNextPreview type="preview" onClick={() => isAnim ? "" : setNextGame("preview")} />
            <S.CardContainer>
              <S.CardGameImageVertical href={`/store/games/${game.id}`}>
                <img src={game.verticalCap.url} />
              </S.CardGameImageVertical>
              <S.CardGameImageHorizontal href={`/store/games/${game.id}`}>
                <img src={game.horizontalCap.url} />
              </S.CardGameImageHorizontal>
              <S.CardContent className={selectedGame.id === game.id ? "selected" : ""}>
                <S.CardHeaderMobile>
                  <S.CardHeaderMobileImageContainer href={`/store/games/${game.id}`}>
                    <S.CardHeaderImageMobile src={game.horizontalCap.url} />
                  </S.CardHeaderMobileImageContainer>
                  <S.CardHeaderMobileContent>
                    <S.CardHeaderTitleMobile href={`/store/games/${game.id}`}>{game.name}</S.CardHeaderTitleMobile>
                    <S.CardHeaderDatePublishedMobile>Publicado {DateFormaterBar(game.createdAt)}</S.CardHeaderDatePublishedMobile>
                  </S.CardHeaderMobileContent>
                </S.CardHeaderMobile>
                <S.Title href={`/store/games/${game.id}`}>{game.name}</S.Title>
                <S.DatePublished>Publicado em {DateFormater(game.createdAt)}</S.DatePublished>
                <S.Avaliation>
                  <S.AvaliationNote>{game.avaliations.length > 0 ? avaliationNoteString(game.avaliationsPercent) : "Ainda não avaliado"}</S.AvaliationNote>
                  {game.avaliations.length > 0 && <S.AvaliationQtd>| {game.avaliations.length}</S.AvaliationQtd>}
                </S.Avaliation>
                <S.Categories>
                  {game.categories.map((cat, i) => (
                    <S.Tag href={`/store/category/${slugfyString(cat.category)}`} key={`${cat.id}-cat-${i}`}>{cat.portugueseName}</S.Tag>
                  ))}
                  {game.genres.map((genre, i) => (
                    <S.Tag href={`/store/genre/${slugfyString(genre.genre)}`} key={`${genre.id}-genre-${i}`}>{genre.portugueseName}</S.Tag>
                  ))}
                  {game.subgenres.map((subgenre, i) => (
                    <S.Tag href={`/store/subgenre/${slugfyString(subgenre.subgenre)}`} key={`${subgenre.id}-subgenre-${i}`}>{subgenre.portugueseName}</S.Tag>
                  ))}
                </S.Categories>
                <S.Synopsis>{game.synopsi}</S.Synopsis>
              </S.CardContent>
            </S.CardContainer>
            <ButtonNextPreview type="next" onClick={() => isAnim ? "" : setNextGame("next")} />
          </S.AnimationContainer>
          <TagLineGames gameIndex={gameIndex} games={games} setGame={setGame} />
        </S.Card>
      ))}
    </S.Container>
  )
}

export default MainCardCarousel

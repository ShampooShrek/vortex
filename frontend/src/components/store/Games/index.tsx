"use client"

import { useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as S from "./style"
import GameImagesCarousel from "@/components/store/Games/GameImages"
import AppDescription from "@/components/store/Games/StoreDescription"
import AppRequerements from "@/components/store/Games/StoreRequerements"
import AsideContainer from "@/components/store/Games/asideContainer"
import slugfyString from "@/utils/urlSlug"
import BetterAvaliations from "@/components/avaliations/betterAvaliations"
import { Bar, Line } from "@/styles/global"
import * as Models from "@/models/frontModels"
import authHook from "@/data/hooks/authHook"
import PostAvaliation from "./PostAvaliation"
import { Avaliations } from "@/models/dbModels"


const StoreGame = ({ game, userAvaliations }: { game: Models.GamesStore, userAvaliations: Avaliations[] | null }) => {

  const { user, addToCart } = authHook()

  const [filterSelected, setFilterSelected] = useState({ type: "Todos", show: "Mais Úteis da semana" })
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [typeCarouselIndex, setTypeCarouselIndex] = useState<"video" | "image">(game.videos.length > 0 ? "video" : "image")
  const [haveGameInLibrary, setHaveGameInLibrary] = useState(user ? (user.games.find(c => c.id === game.id) ? true : false) : false)
  const [haveGameInCart, setHaveGameInCart] = useState(user ? (user.cart.find(c => c.id === game.id) ? true : false) : false)
  const [isAnim, setIsAnim] = useState<boolean>(false)
  const [mainWidth, setMainWidth] = useState<number>(0)
  const MainRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const urlSlugify = slugfyString(game.name)
    const newUrl = `/store/games/${game.id}/${urlSlugify}`
    history.replaceState(null, "", newUrl)
  }, [game])


  useEffect(() => {
    const updateWidth = () => {
      if (MainRef.current) {
        setMainWidth(MainRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    setIsAnim(true)

    return () => window.removeEventListener("resize", updateWidth)
  }, [game])

  const handleAddToCart = async () => {
    if (user) {
      if (haveGameInCart) {
        router.replace("/cart")
      } else {
        await addToCart(game.id)
        setHaveGameInCart(true)
      }
    } else {
      router.push("/auth/signIn")
    }
  }

  const selectCarousel = (index: number, type: "video" | "image") => {
    setTypeCarouselIndex(type)
    setCarouselIndex(index)
  }

  if (!game) return <p>carregando...</p>

  return (
    <S.Container>
      <S.GameTitle>{game.name}</S.GameTitle>
      <S.GameContainer>
        <S.Main ref={MainRef}>
          <S.AsdieContainerCoisaContent>
            <AsideContainer
              avaliationsLenght={game.avaliations.length}
              avaliationsPercent={game.avaliationsPercent}
              createdAt={game.createdAt}
              genres={game.genres}
              subgenres={game.subgenres}
              gameId={game.id}
              haveInCart={haveGameInCart}
              haveInLibrary={haveGameInLibrary}
              addToCart={handleAddToCart}
              price={game.price} discount={game.discount ?? 0}
              categories={game.categories}
              horizontalCap={game.horizontalCap}
              synopsis={game.synopsi}
              achievements={game.achievements ?? null}
            />
            <Line />
          </S.AsdieContainerCoisaContent>
          <GameImagesCarousel game={game} selectItem={selectCarousel} selectedItem={carouselIndex} type={typeCarouselIndex} />
          <S.Title>Descrição:</S.Title>
          <Bar height="2px" margin="5px 0" width="80%" />
          <AppDescription description={game.description} />
          {game.requesites && (
            <>
              <S.Title>Requisitos:</S.Title>
              <Bar height="2px" margin="5px 0" width="80%" />
              <AppRequerements requerements={game.requesites} />
            </>
          )}
        </S.Main>
        <S.AsideContainer>
          <AsideContainer
            avaliationsLenght={game.avaliations.length}
            avaliationsPercent={game.avaliationsPercent}
            createdAt={game.createdAt}
            genres={game.genres}
            subgenres={game.subgenres}
            gameId={game.id}
            haveInCart={haveGameInCart}
            haveInLibrary={haveGameInLibrary}
            addToCart={handleAddToCart}
            price={game.price} discount={game.discount ?? 0}
            categories={game.categories}
            horizontalCap={game.horizontalCap}
            synopsis={game.synopsi}
            achievements={game.achievements ?? null}
          />
        </S.AsideContainer>
      </S.GameContainer>
      <Line />
      {user && user.games.some(g => g.id === game.id) && (
        <PostAvaliation avaliations={userAvaliations ?? []} game={game} user={user} />
      )}
      <S.AvaliationsContainer>
        <S.Title>Avaliações dos Usuários:</S.Title>
        <Bar height="2px" margin="5px 0" width="80%" />
        {game.avaliations.length > 0 ? (
          <>
            <S.Avaliations>
              <S.BetterAvaliations>
                {game.avaliations.map((av: any, i) => (
                  <BetterAvaliations key={`avaliation-${i}`} avaliation={av} />
                ))}
              </S.BetterAvaliations>
            </S.Avaliations>
          </>
        ) : (
          <S.NoAvaliationsContainer>
            <S.NoAvaliationsSpan>
              Parece que este jogo ainda não tem avaliações
            </S.NoAvaliationsSpan>
          </S.NoAvaliationsContainer>
        )}
      </S.AvaliationsContainer>
    </S.Container>
  )
}

export default StoreGame

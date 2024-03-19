"use client"

import * as S from "./style"
import AppAchievements from "./StoreAchievements"
import { GameAchievements, GameCategories, GameImageCap, Genres, Subgenres } from "@/models/dbModels"
import DateFormater from "@/utils/dateFormater"
import avaliationNoteString from "@/utils/avaliationNoteString"
import Link from "next/link"
import slugfyString from "@/utils/urlSlug"
import ApiRequest from "@/utils/ApiRequests"
import authHook from "@/data/hooks/authHook"
import messageAuth from "@/data/hooks/messageHook"
import { useRef } from "react"

interface AsideContainerProps {
  horizontalCap: GameImageCap
  price: number
  discount: number
  synopsis: string
  categories: GameCategories[]
  genres: Genres[]
  subgenres: Subgenres[]
  achievements: GameAchievements[] | null
  haveInCart: boolean
  haveInLibrary: boolean
  addToCart: React.MouseEventHandler<HTMLButtonElement>
  gameId: number
  createdAt: string
  avaliationsPercent: number
  avaliationsLenght: number
}

const StoreAsideContainer = ({ 
  createdAt,
  genres,
  subgenres,
  categories, 
  horizontalCap, 
  synopsis, 
  achievements, 
  price, 
  discount, 
  addToCart, 
  haveInCart, 
  haveInLibrary,
  gameId,
  avaliationsPercent,
  avaliationsLenght
 }: AsideContainerProps) => {

  const { user, setUser } = authHook()
  const { showMessageBox } = messageAuth()
  const linkRef = useRef<HTMLAnchorElement>(null)


  const PriceWithDiscount = () => {
    return (
      <div>
        { discount > 0 ? (
          <S.Price>
            <S.OriginalPrice>R$ {price.toFixed(2)}</S.OriginalPrice> 
            R$ {(price - (price * discount)).toFixed(2)}
          </S.Price>
        ) : <S.Price>R$ {price.toFixed(2)}</S.Price>}
      </div>
    )
  }

  const connectToGane = async () => {
    if(user) {
      const resp = await ApiRequest(`/api/users/connect_game/${gameId}`, "post")
      if(resp) {
        if(resp.type === "success") {
          setUser(prev => {
            const uGames = [...user!.games]
            uGames.push({id: gameId})
            showMessageBox("Jogo comprado com sucesso!!", "success")
            return { ...prev!, games: uGames }
          })
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    } else {
      linkClick()
    }
  }

  const linkClick = () => {
    if(linkRef.current) {
      linkRef.current.click()
    }
  }

  return (
    <>
      <S.AsideImage>
        <img src={horizontalCap.url} />
      </S.AsideImage>
      <Link href={"/auth/signIn"} style={{ display: "none" }} />
      <S.AsideText>
        <p>{synopsis}</p>
      </S.AsideText>
      <S.AsideButtons>
      <PriceWithDiscount /> 
        {!haveInLibrary ? <S.Button onClick={connectToGane} background={true}>COMPRAR</S.Button>
        : <S.Button  background={true}>VOCÊ JA TEM ESTE JOGO</S.Button>
      }
        {!haveInLibrary && <S.Button onClick={addToCart} background={false}> {!haveInCart ? "ADICIONAR AO CARRINHO +" : "VER NO CARRINHO"} </S.Button>}
      </S.AsideButtons>
      <S.AsideInfo>
        <S.Info>
          <span>Avaliação:</span> {avaliationsLenght > 0 ? 
            <span>{avaliationNoteString(avaliationsPercent)} ({avaliationsLenght})</span> : <span>Ainda não avaliado</span>
          }
        </S.Info>
        <S.Info>
          <span>Data de lançamento:</span> <span>{DateFormater(createdAt)}</span>
        </S.Info>
        <S.Info>
          <span>Desenvolvedores: </span> <span><Link href={`/store/developers/${gameId}`}>Ver Desenvolvedores</Link></span>
        </S.Info>
      </S.AsideInfo>
      <S.AsideCategories>
        <p>tags:</p>
        <S.ListCategories>
          {categories.map((cat, i) => (
            <S.Categorie href={`/store/category/${slugfyString(cat.category)}`} key={`cat-${i}-${cat.category}`}>
              {cat.portugueseName}
            </S.Categorie>
          ))}
          {genres.map((genre, i) => (
            <S.Categorie href={`/store/genre/${slugfyString(genre.genre)}`} key={`genre-${i}-${genre.genre}`}>
              {genre.portugueseName}
            </S.Categorie>
          ))}
          {subgenres.map((subgenre, i) => (
            <S.Categorie href={`/store/subgenre/${slugfyString(subgenre.subgenre)}`} key={`subgenre-${i}-${subgenre.subgenre}`}>
              {subgenre.portugueseName}
            </S.Categorie>
          ))}
        </S.ListCategories>
        {achievements && achievements.length > 0 && 
          <AppAchievements gameId={gameId} achievements={achievements} achievementsLength={achievements.length} />
        }
      </S.AsideCategories>
    </>
  )
}

export default StoreAsideContainer
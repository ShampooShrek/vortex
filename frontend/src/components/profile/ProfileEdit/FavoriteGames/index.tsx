"use client"

import { GamesStore } from "@/models/frontModels"
import SectionTemplate from "../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useEffect, useState } from "react"
import * as S from "./style"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import api from "@/services/api"
import ButtonsContainer from "../../../ButtonsContainer"
import authHook from "@/data/hooks/authHook"
import messageAuth from "@/data/hooks/messageHook"
import ApiRequest from "@/utils/ApiRequests"

interface FavoriteGamesProps {
  favoriteGames: GamesStore[]
  games: GamesStore[]
}

const FavoriteGames: React.FC<FavoriteGamesProps> = ({ favoriteGames, games: gameProps }) => {

  const { setUser, user } = authHook()
  const { showMessageBox } = messageAuth()

  useEffect(() => {
    setUser(prevUser => ({ ...prevUser!, favorites: favoriteGames, games }))
  }, [favoriteGames, gameProps])

  const notFavoritedGames = gameProps.filter(g =>
    !favoriteGames.find(fav => fav.id === g.id)
  )

  const [inRequest, setInRequest] = useState(false)
  const [games, setGames] = useState<GamesStore[]>(notFavoritedGames!)
  const [favorites, setFavorites] = useState<GamesStore[]>(favoriteGames)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setGames(gs => {
      const filtredGames = notFavoritedGames!.filter(g =>
        g.name.replaceAll(" ", "").toLowerCase().includes(filter.replaceAll(" ", "").toLowerCase()))
      return filtredGames
    })

    setFavorites(gs => {
      const filtredGames = favoriteGames.filter(g =>
        g.name.replaceAll(" ", "").toLowerCase().includes(filter.replaceAll(" ", "").toLowerCase()))
      return filtredGames
    })
  }, [filter])

  const handleAddFavorites = (game: GamesStore) => {
    const index = games.indexOf(game)
    setFavorites(fav => {
      const newFavorite = [...fav]
      newFavorite.unshift(games[index])
      return newFavorite
    })
    setGames(gs => gs.filter(g => g.id !== gs[index].id))
  }

  const handleRemoveFavorites = (game: GamesStore) => {
    const index = favorites.indexOf(game)
    setGames(gs => {
      const newGame = [...gs]
      newGame.unshift(favorites[index])
      return newGame
    })
    setFavorites(fav => fav.filter(f => f.id !== fav[index].id))
  }

  const save = async () => {
    setInRequest(true)
    const gamesId = games.map(g => g.id)
    const favoritesId = favorites.map(fav => fav.id)

    const response = await ApiRequest("/api/users/account/favorites", "post", {
      games: gamesId,
      favorites: favoritesId
    })

    if (response) {
      if (response.type === "success") {
        setUser(u => ({ ...u!, favorites }))
        showMessageBox("Jogos atualizados com sucesso!!", "success")
      } else {
        showMessageBox(response.response as string, "error")
      }
    }
    setInRequest(false)
  }

  const cancel = () => {
    setGames(notFavoritedGames!)
    setFavorites(favoriteGames)
  }

  return (
    <SectionTemplate section="Jogos Favoritos">
      <S.Container>
        <S.Input>
          <label htmlFor="">Filtrar:</label>
          <input onChange={(e) => setFilter(e.target.value)} type="text" />
        </S.Input>
        <S.GamesSection>Favoritos:</S.GamesSection>
        <S.GamesContainer background={false}>
          {MatrizOfArray(favorites, 3).map((matriz, i) => (
            <S.GamesLine key={`${i}-${matriz.length}`}>
              {matriz.map(favorite => (
                <S.GamesCard key={`matriz-favorite-${favorite.id}`} onClick={() => handleRemoveFavorites(favorite)} background={false}>
                  <img src={favorite.horizontalCap ? favorite.horizontalCap.url : "/player.jpg"} alt="" />
                  <span>{favorite.name}</span>
                </S.GamesCard>
              ))}
            </S.GamesLine>
          ))}
        </S.GamesContainer>
        <S.GamesSection>Jogos:</S.GamesSection>
        <S.GamesContainer background={true}>
          {MatrizOfArray(games, 3).map((matriz, i) => (
            <S.GamesLine key={`${i}-${matriz.length}`}>
              {matriz.map(game => (
                <S.GamesCard key={`matriz-games-${game.id}`} onClick={() => handleAddFavorites(game)} background={true}>
                  <img src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} alt="" />
                  <span>{game.name}</span>
                </S.GamesCard>
              ))}
            </S.GamesLine>
          ))}
        </S.GamesContainer>
        <ButtonsContainer isLoading={inRequest} cancelClick={cancel} saveClick={inRequest ? () => { } : save} />
      </S.Container>
    </SectionTemplate>
  )

}

export default FavoriteGames

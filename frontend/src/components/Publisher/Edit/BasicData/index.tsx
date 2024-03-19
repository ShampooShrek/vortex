"use client"

import { useState, useEffect } from "react"
import { GamesStoreEdit } from "@/models/frontModels"
import * as S from "./style"
import { PublisherEditSectionTemplate } from "../PublisherEditTemplate"
import FormInput from "@/components/Inputs/FormInput"
import { GameCategories, GameRequesites, Genres, Subgenres, User } from "@/models/dbModels"
import PublisherEditBasicDataDevelopers from "./Developers"
import PublisherEditTags from "./Tags"
import PublisherEditRequesites from "../Requesites"
import ButtonsContainer from "@/components/ButtonsContainer"
import TextArea from "@/components/TextArea"
import { useParams } from "next/navigation"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"

interface PublisherEditBasicDataProps {
  game: GamesStoreEdit
  handleUpdateGame(data: GamesStoreEdit): void
  tags: {
    categories: GameCategories[]
    genres: Genres[]
    subgenres: Subgenres[]
  }
}

interface TagsInterface {
  categories: string[]
  genres: string[]
  subgenres: string[]
}


const PublisherEditBasicData = ({ game: gameProps, tags: PropTags, handleUpdateGame }: PublisherEditBasicDataProps) => {

  const { gameId } = useParams()
  const { showMessageBox } = messageAuth()

  const [game, setGame] = useState<GamesStoreEdit>(gameProps)
  const [requesites, setRequesites] = useState<GameRequesites | null>(gameProps.requesites)
  const [developers, setDevelopers] = useState(game.developers)
  const [inRequest, setInRequest] = useState(false)

  const [tags, setTags] = useState<TagsInterface>({
    categories: [], genres: [], subgenres: []
  })

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = ev.target.name
    const value = ev.target.value

    if (name === "discount") {
      const valueNumber = Math.round(Number(value))
      if (valueNumber > 100 || valueNumber < 0) return false

      setGame(prevGame => ({ ...prevGame, discount: valueNumber }))
    } else if (name === "price") {
      const valueNumber = Number(value)
      setGame(prevGame => ({ ...prevGame, price: valueNumber }))
    } else {
      setGame(prevGame => ({ ...prevGame, [name]: value }))
    }

  }


  const updateDevelopers = (devs: User[]) => {
    setDevelopers(devs)
  }

  const handleSetTags = (tags: string[], type: keyof TagsInterface) => {
    setTags(prevTags => ({ ...prevTags, [type]: tags }))
  }

  const handleRequesites = (requesites: GameRequesites) => {
    setRequesites(requesites)
  }

  const save = async () => {
    setInRequest(true)
    let { categories, genres, subgenres } = tags
    let { name, price, discount, synopsi } = game
    let error = false
    const dataInfo = {
      name, price: Number(price), discount: Number(discount / 100).toFixed(0), synopsi, developers: developers.map(d => d.id)
    }

    const newCategories = categories.filter((cat) => !game.categories.some((c) => c.category === cat))
    const deletedCategories = game.categories.filter((cat) => !categories.includes(cat.category)).map(c => c.category)

    const newGenres = genres.filter((genre) => !game.genres.some((g) => g.genre === genre))
    const deletedGenres = game.genres.filter((g) => !genres.includes(g.genre)).map(c => c.genre)

    const newSubgenres = subgenres.filter((subgenre) => !game.subgenres.some((sg) => sg.subgenre === subgenre))
    const deletedSubgenres = game.subgenres.filter((sg) => !subgenres.includes(sg.subgenre)).map(c => c.subgenre)

    await Promise.all([
      await ApiRequest(`/api/games/${gameId}`, "put", dataInfo)
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/requesites`, "post", requesites)
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/categories`, "post", { categories: newCategories })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/genres`, "post", { genres: newGenres })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/subgenres`, "post", { subgenres: newSubgenres })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/categories`, "put", { categories: deletedCategories })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/genres`, "put", { genres: deletedGenres })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

      await ApiRequest(`/api/games/${gameId}/subgenres`, "put", { subgenres: deletedSubgenres })
        .then(resp => resp?.type === "error" && showMessageBox(resp.response as string, "error", () => error = true)),

    ])
    if (!error) {
      handleUpdateGame(game)
      showMessageBox("Informações atualizadas com sucesso!!", "success")
    }
    setInRequest(false)

  }

  return (
    <S.Container>
      <PublisherEditSectionTemplate >
        <FormInput
          type="text"
          value={game.name}
          name="name"
          label="Nome do Jogo:"
          onChange={handleInput}
          inputStyle={{ width: "300px" }}
        />
        <FormInput
          type="number"
          value={game.price ?? 0}
          name="price"
          label="Preço do Jogo:"
          onChange={handleInput}
          inputStyle={{ width: "200px" }}

        />
        <FormInput
          type="number"
          value={(game.discount * 100).toFixed(0) ?? 0}
          name="discount"
          label="Desconto (em porcentagem %):"
          onChange={handleInput}
          inputStyle={{ width: "70px" }}
        />
        <TextArea
          value={game.synopsi ?? ""}
          label="Sinopse"
          name="synopsi"
          onChange={handleInput}
          textAreaStyle={{ width: "80%", height: "200px" }}
        />
      </PublisherEditSectionTemplate>

      <PublisherEditBasicDataDevelopers updateDevelopers={updateDevelopers} developers={developers} />

      <PublisherEditSectionTemplate title="Categorias:">
        <PublisherEditTags handleSetTags={handleSetTags} selectedtags={game.categories} tag="categories" tags={PropTags.categories} />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Gêneros:">
        <PublisherEditTags handleSetTags={handleSetTags} selectedtags={game.genres} tag="genres" tags={PropTags.genres} />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Subgêneros:">
        <PublisherEditTags handleSetTags={handleSetTags} selectedtags={game.subgenres} tag="subgenres" tags={PropTags.subgenres} />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Requesitos:">
        <PublisherEditRequesites handleRequesites={handleRequesites} requesites={game.requesites} />
      </PublisherEditSectionTemplate>
      <ButtonsContainer saveClick={inRequest ? () => { } : save} cancelClick={() => { }} isLoading={inRequest} cancelButton={false} />
    </S.Container>
  )
}

export default PublisherEditBasicData

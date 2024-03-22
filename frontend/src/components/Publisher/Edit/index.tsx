"use client"

import { useState, useEffect } from "react"
import DetailsHeader from "@/components/profile/DetailsHeader"
import authHook from "@/data/hooks/authHook"
import { FiltersOptions, GamesStoreEdit } from "@/models/frontModels"
import { redirect } from "next/navigation"
import * as S from "./style"
import ContainerGameJolt from "@/components/ContainerGameJolt"
import PublisherEditTemplate from "./PublisherEditTemplate"
import PublisherEditBasicData from "./BasicData"
import { GameCategories, Genres, Subgenres } from "@/models/dbModels"
import PublisherEditDescription from "./Description"
import PublisherEditVisualResources from "./VisualResources"
import PublisherEditFile from "./File"
import PublisherEditAchievemnets from "./Achievements"
import PublisherEditPublish from "./Publish"

interface PublisherEditProps {
  game: GamesStoreEdit
  tags: {
    categories: GameCategories[]
    genres: Genres[]
    subgenres: Subgenres[]
  }
}

const PublisherEdit = ({ game: gameProps, tags }: PublisherEditProps) => {

  const { loading, user, setUser } = authHook()

  if (!user) redirect("/home")

  const [sectionKey, setSectionKey] = useState("basicData")
  const [game, setGame] = useState(gameProps)

  const filters: FiltersOptions[] = [
    { key: "basicData", option: "Dados Basicos", onClick: () => handleSelectFilterKey("basicData") },
    { key: "description", option: "Descrição", onClick: () => handleSelectFilterKey("description") },
    { key: "graphicResorses", option: "Recursos Gráficos", onClick: () => handleSelectFilterKey("graphicResorses") },
    { key: "achievements", option: "Conquistas", onClick: () => handleSelectFilterKey("achievements") },
    { key: "arquive", option: "Arquivo", onClick: () => handleSelectFilterKey("arquive") },
    { key: "publish", option: "Publicar", onClick: () => handleSelectFilterKey("publish") },
  ]

  const handleSelectFilterKey = (key: string) => {
    setSectionKey(key)
  }

  useEffect(() => {
    const gameDevIndex = user.gameDevelopers.findIndex(g => gameProps.id === g.id)
    if (gameDevIndex >= 0) {
      setUser(prevUser => {
        const updatedUser = { ...prevUser! }
        updatedUser.gameDevelopers[gameDevIndex] = game
        return updatedUser
      })
    } else {
      setUser(prevUser => ({
        ...prevUser!,
        gameDevelopers: [...prevUser!.gameDevelopers, gameProps]
      }))
    }
  }, [game])

  const handleUpdateGame = (data: any) => {
    setGame(prevGame => ({ ...prevGame, ...data }))
  }

  if (loading) return <p></p>

  return (
    <>
      <DetailsHeader image={user.image} id={user.id} nickname={user.nickname} sections={["administração", "editar", `${game.name} (${game.id})`]} />
      <S.Container>
        <ContainerGameJolt
          filters={filters}
          selectedFilter={sectionKey}
          border={false}
          background={false}
          padding={false}
        >
          <PublisherEditTemplate headerText="" isRendering={sectionKey === "basicData"} >
            <PublisherEditBasicData handleUpdateGame={handleUpdateGame} tags={tags} game={game} />
          </PublisherEditTemplate>

          <PublisherEditTemplate headerText="" isRendering={sectionKey === "description"} >
            <PublisherEditDescription handleUpdateGame={handleUpdateGame} gameDescriptionImages={game.gameDescriptionImages ?? []} description={game.description ?? ""} />
          </PublisherEditTemplate>

          <PublisherEditTemplate headerText="" isRendering={sectionKey === "graphicResorses"} >
            <PublisherEditVisualResources
              handleUpdateGame={handleUpdateGame}
              gameBackgroundImage={game.gameBackgroundImage}
              gameIconImage={game.gameIconImage}
              gamePopularImage={game.gamePopularImage}
              horizontalCap={game.horizontalCap}
              screenShootImages={game.images}
              verticalCap={game.verticalCap}
              videos={game.videos}
            />
          </PublisherEditTemplate>

          <PublisherEditTemplate headerText="" isRendering={sectionKey === "arquive"}>
            <PublisherEditFile handleUpdateGame={handleUpdateGame} file={game.arquive} />
          </PublisherEditTemplate>

          <PublisherEditTemplate headerText="" isRendering={sectionKey === "achievements"}>
            <PublisherEditAchievemnets handleUpdateGame={handleUpdateGame} achievements={game.achievements} />
          </PublisherEditTemplate>

          <PublisherEditTemplate headerText="" isRendering={sectionKey === "publish"}>
            <PublisherEditPublish handleUpdateGame={handleUpdateGame} game={game} />
          </PublisherEditTemplate>

        </ContainerGameJolt>
      </S.Container>
    </>
  )
}

export default PublisherEdit

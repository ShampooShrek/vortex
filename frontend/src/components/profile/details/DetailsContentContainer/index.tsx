"use client"

import { FiltersOptions, UserDetails } from "@/models/frontModels"
import { useState } from "react"
import DetailsContent from "./DetailsContent"
import DetailsGamesCard from "../DetailsGamesCard"
import DetailsAvaliations from "../DetailsAvaliations"
import { DetailsUserContainer } from "@/components/UsersContainers"
import DetailsGroups from "../DetailsGroups"

interface DetailsContentContainerProps {
  details: UserDetails
}

const DetailsContentContainer = ({ details }: DetailsContentContainerProps) => {
  const [sectionKey, setSection] = useState<keyof UserDetails>("games")

  const filters: FiltersOptions[] = []

  filters.push({ onClick: () => filter("games"), option: "Jogos", key: "games" })

  details.favorites && details.favorites.length > 0 &&
    filters.push({ onClick: () => filter("favorites"), option: "Favoritos", key: "favorites" })

  details.avaliations && details.avaliations.length > 0 &&
    filters.push({ onClick: () => filter("avaliations"), option: "Avaliações", key: "avaliations" })

  details.friends && details.friends.length > 0 &&
    filters.push({ onClick: () => filter("friends"), option: "Amigos", key: "friends" })

  details.groups &&
    filters.push({ onClick: () => filter("groups"), option: "Grupos", key: "groups" })


  const filter = (newSection: keyof UserDetails) => {
    setSection(newSection)
  }

  return (
    <DetailsContent filters={filters} selectedFilter={sectionKey}>
      {sectionKey === "games" && details.games && details.games.map(game => (
        <DetailsGamesCard key={`games-${game.id}`} achievements={details.achievements!} game={game} userId={details.user.id} />
      ))}
      {sectionKey === "favorites" && details.favorites && details.favorites.map(game => (
        <DetailsGamesCard key={`favorites-${game.id}`}
          achievements={details.achievements!}
          game={game} userId={details.user.id}
        />
      ))}
      {sectionKey === "avaliations" && details.avaliations && (
        <DetailsAvaliations gamesLength={details.games!.length} avaliations={details.avaliations} />
      )}
      {sectionKey === "friends" && details.friends && (
        <DetailsUserContainer users={details.friends} />
      )}
      {sectionKey === "groups" && details.groups && (
        <DetailsGroups groups={details.groups} />
      )}
    </DetailsContent>
  )

}

export default DetailsContentContainer

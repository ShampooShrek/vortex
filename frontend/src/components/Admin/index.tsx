"use client"

import { useState, useEffect } from "react"
import DetailsHeader from "@/components/profile/DetailsHeader"
import authHook from "@/data/hooks/authHook"
import { FiltersOptions, GamesStoreEdit } from "@/models/frontModels"
import { redirect } from "next/navigation"
import ContainerGameJolt from "../ContainerGameJolt"
import AdminPendingGames from "./PendingGames"

interface AdminProps {
  pendingGames: GamesStoreEdit[]
}

const Admin = ({ pendingGames }: AdminProps) => {

  const { loading, user } = authHook()
  const [sectionKey, setSectionKey] = useState("pendingGames")

  if (loading) return ""
  if (!user) redirect("/home")


  const filters: FiltersOptions[] = [
    { key: "pendingGames", option: "Jogos Pendentes", onClick: () => handleSelectFilterKey("pendingGames") },
  ]

  const handleSelectFilterKey = (key: string) => {
    setSectionKey(key)
  }

  return (
    <>
      <DetailsHeader id={user.id} nickname={user.nickname} sections={["administração", "administrador"]} />
      <div>
        <ContainerGameJolt
          filters={filters}
          selectedFilter={sectionKey}
          border={false}
          background={false}
          padding={false}
        >
          {sectionKey === "pendingGames" && <AdminPendingGames games={pendingGames} />}
        </ContainerGameJolt>
      </div>
    </>
  )
}

export default Admin

"use client"

import { useState } from "react"
import { User } from "@/models/dbModels"
import MembersTemplate from "../MembersTemplate"
import api from "@/services/api"
import { Groups, Response, UserAuth } from "@/models/frontModels"
import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"
import ButtonsContainer from "@/components/ButtonsContainer"
import messageAuth from "@/data/hooks/messageHook"

interface MemebersManagementProps {
  group: Groups
}

const MembersManagement = ({ group }: MemebersManagementProps) => {

  const { loading, setUser, user } = authHook()


  const selectedGroup = user?.adminGroups?.find(g => g.id === group.id)
  if (!selectedGroup) {
    redirect("/home")
  }
  const { showMessageBox } = messageAuth()
  const [admins, setAdmins] = useState<User[]>(selectedGroup.admins)
  const [users, setUsers] = useState<User[]>(selectedGroup.users)
  const [inRequest, setInRequest] = useState(false)

  const handleClickUsers1 = (adm: User) => {
    const newAdmins = admins.filter(adms => adms.id !== adm.id)
    setAdmins(newAdmins)
    setUsers(prevUsers => [...prevUsers, adm])
  }

  const handleClickUsers2 = (user: User) => {
    const newUsers = users.filter(users => users.id !== user.id)
    setUsers(newUsers)
    setAdmins(prevAdmins => [...prevAdmins, user])
  }

  const saveClick = async () => {
    setInRequest(true)
    const form = {
      admins: admins.map(adm => adm.id),
      members: users.map(u => u.id)
    }

    const response = await api.put(`/api/groups/update/${group.id}/update_members`, form)
    const data: Response<Groups> = response.data

    if (data.type === "success") {
      setUser(prevUser => {
        if (prevUser) {
          const selectedGroupIndex = prevUser.adminGroups!.findIndex(g => g.id === group.id)
          const updatedGroups = [...prevUser.adminGroups!]
          const updatedGroup: Groups = { ...updatedGroups[selectedGroupIndex], ...data.response as Groups }
          updatedGroups[selectedGroupIndex] = updatedGroup
          const updatedUser: UserAuth = { ...prevUser, adminGroups: updatedGroups }
          return updatedUser
        } else {
          return prevUser
        }
      })
      showMessageBox("Usuário atualizados com sucesso!", "success")
    } else {
      showMessageBox(data.response as string, "error")
    }
    setInRequest(false)
  }

  if (loading) return ""

  return (
    <>
      <MembersTemplate
        saveClick={saveClick}
        onClickUsers1={handleClickUsers1}
        onClickUsers2={handleClickUsers2}
        emptyText1="Não foi encontrado nenhum administrador no grupo"
        emptyText2="Não foi encontrado nenhum membro no grupo"
        header2Text="membros"
        users1={admins}
        users2={users}
        header1Text="administradores"
      />
      <ButtonsContainer cancelClick={() => { }} saveClick={inRequest ? () => { } : saveClick} isLoading={inRequest} />
    </>

  )
}

export default MembersManagement

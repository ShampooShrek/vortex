"use client"

import { User } from "@/models/dbModels"
import { useState, useEffect } from "react"
import MembersTemplate from "../MembersTemplate"
import api from "@/services/api"
import { Groups, Response, UserAuth } from "@/models/frontModels"
import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"
import messageAuth from "@/data/hooks/messageHook"

interface MemebersManagementProps {
  group: Groups
}

const RemoveUsers = ({ group }: MemebersManagementProps) => {

  const { loading, setUser, user } = authHook()


  const { showMessageBox } = messageAuth()
  const selectedGroup = user?.adminGroups?.find(g => g.id === group.id)
  if (!selectedGroup) {
    redirect("/home")
  }

  const [users, setUsers] = useState<User[]>([...selectedGroup.admins, ...selectedGroup.users])

  useEffect(() => {
    const findGroup = user?.adminGroups?.find(g => g.id === group.id)
    if (findGroup) {
      const { users, admins } = findGroup
      setUsers([...admins, ...users])
    }
  }, [user])

  const handleClickUsers1 = async (user: User) => {
    const response = await api.post(`/api/groups/user/adm_quit_user/${group.id}/${user.id}`)
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
      showMessageBox("Usuário deletado!", "success")
    } else {
      showMessageBox(data.response as string, "error")
    }
  }

  if (loading) return ""

  return (
    <MembersTemplate saveClick={async () => { }}
      onClickUsers1={handleClickUsers1}
      emptyText1="Não foi encontrado membros no grupo"
      header2Text="membros"
      users1={users}
      header1Text="Membros/Administradores"
    />
    // <MembersTemplate svaeClick={() => ""} headerText="membros" users={[...admins, ...users]} />
  )
}

export default RemoveUsers

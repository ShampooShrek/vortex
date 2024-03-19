"use client"

import { User } from "@/models/dbModels"
import MembersTemplate from "../MembersTemplate"
import { useState } from "react"
import api from "@/services/api"
import { Response } from "@/models/frontModels"

interface MemebersManagementProps {
  bannedUsers: User[]
}

const BansManagement = ({ bannedUsers: BannedUsersProps}: MemebersManagementProps) => {

  const [bannedUsers, setBannedUsers] = useState<User[]>(BannedUsersProps)

  const handleClickUsers1 = async (bannedUser: User) => {
    const response = await api.post(`/api/groups/user/unban/${bannedUser.id}`)
    const data: Response<string> = response.data

    if(data.type === "success") {
      const newBannedUsers = bannedUsers.filter(adms => adms.id !== bannedUser.id)
      setBannedUsers(newBannedUsers)
    }
  }


  return (
    <MembersTemplate 
      saveClick={async () => {}} 
      emptyText1="Não foi nenhum membro banido"
      users1={bannedUsers} 
      header1Text="banidos"
      onClickUsers1={handleClickUsers1}
    />
  )
}

export default BansManagement
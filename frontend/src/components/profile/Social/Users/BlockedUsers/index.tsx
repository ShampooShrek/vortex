"use client"

import authHook from "@/data/hooks/authHook"
import SectionTemplate from "../../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useState } from "react"
import { OtherUsers } from "@/models/frontModels"
import UsersContainers from "../../../../UsersContainers"

interface BlockedUsersProsp {
  blockedusers: OtherUsers[]
}

const BlockedUsers: React.FC<BlockedUsersProsp> = ({ blockedusers }) => {

  return (
    <SectionTemplate section="Bloqueados">
       <UsersContainers headerTitle="Pesquisar por usuários" users={blockedusers} />
    </SectionTemplate>
  )
}

export default BlockedUsers


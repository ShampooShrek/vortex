"use client"

import authHook from "@/data/hooks/authHook"
import SectionTemplate from "../../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useEffect } from "react"
import EnvitesContainer from "./EnvitesContainer"
import { UserFriendsRequests } from "@/models/frontModels"

interface PendingEnvitesProps {
  senders: UserFriendsRequests[]
  receivers: UserFriendsRequests[]
}

const PendingEnvites: React.FC<PendingEnvitesProps> = ({ receivers, senders }) => {

  return (
    <SectionTemplate section="Pedidos Pendentes">
      <EnvitesContainer receivers={receivers} senders={senders}  />
    </SectionTemplate>
  )
}

export default PendingEnvites


"use client"

import authHook from "@/data/hooks/authHook"
import SectionTemplate from "../../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useState, useEffect } from "react"
import UsersContainers from "../../../../UsersContainers"
import { OtherUsers } from "@/models/frontModels"

interface FriendsProps {
  friends: OtherUsers[]
}

const Friends: React.FC<FriendsProps> = ({ friends: friendsProps }) => {
  const { user } = authHook()

  const [friends, setFriends] = useState<OtherUsers[]>([])

  useEffect(() => {
    if(user!.friends![0] && user!.friends![0].nickname) {
      setFriends(user!.friends!)
    }
  }, [user!.friends])

  return (
    <SectionTemplate section="Amigos">
      <UsersContainers headerTitle="Pesquisar Amigos" users={friends} />
    </SectionTemplate>
  )
}

export default Friends


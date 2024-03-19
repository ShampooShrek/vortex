"use client"

import SectionTemplate from "@/components/profile/ProfileDetailsSocialsLayout/SectionTemplate"
import ProfileSectionHeader from "@/components/profile/ProfileDetailsSocialsLayout/SectionsHeader"
import authHook from "@/data/hooks/authHook"
import * as S from "./style"
import Link from "next/link"
import DateFormater from "@/utils/dateFormater"
import { useEffect, useState } from "react"
import api from "@/services/api"
import { Response, UserAuth } from "@/models/frontModels"
import { GroupRequests } from "@/models/dbModels"

interface SocialGroupsRequestsProps {
  groupRequests: GroupRequests[]
}

const SocialGroupsRequests = ({ groupRequests }: SocialGroupsRequestsProps) => {

  const { setUser, loading } = authHook()


  const [userRequests, setUserRequests] = useState([...groupRequests])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (search !== "") {
      setUserRequests(() => {
        const filtredRequests = groupRequests.filter(g => g.group.name.toLowerCase().replaceAll(" ", "").
          includes(search.toLowerCase().replaceAll(" ", "")))
        return filtredRequests
      })
    }
  }, [search])

  useEffect(() => {
    setUser(prevUser => ({ ...prevUser!, groupRequests }))
  }, [groupRequests])

  const cancelRequest = async (requestId: number) => {
    const response = await api.post(`/api/groups/user/request/cancel_request/${requestId}`)
    const data: Response<string> = response.data

    if (data.type === "success") {
      setUser(prevUser => {
        const updatedRequests = prevUser!.groupRequests!.filter(r => r.id !== requestId)
        const updatedUser: UserAuth = { ...prevUser!, groupRequests: updatedRequests }
        setUserRequests(updatedRequests)
        return updatedUser
      })
    }
  }

  if (loading) return ""

  return (
    <SectionTemplate section="Convites Pendentes">
      <ProfileSectionHeader
        onChange={ev => setSearch(ev.target.value)}
        placeholder="Pesquisar Por Nome"
        text="Pesquisar Grupos"
        value={search}
        margin={false}
      />
      <S.GroupContainer>
        {userRequests.map(g => (
          <S.GroupCard key={`requests-${g.id}`}>
            <S.GroupImageStatus>
              <S.GroupImg src={g.group.image ? g.group.image.url : "group_image.jpg"} />
              <S.UserContent>
                <Link replace href={`/groups/${g.group.groupLink}`}>{g.group.name}</Link>
                <span>{DateFormater(g.date)}</span>
              </S.UserContent>
            </S.GroupImageStatus>
            <S.GroupButtonsActions>
              <S.ButtonAction onClick={() => cancelRequest(g.id)}>Cancelar Pedido</S.ButtonAction>
            </S.GroupButtonsActions>
          </S.GroupCard>
        ))}
      </S.GroupContainer>
    </SectionTemplate>
  )
}

export default SocialGroupsRequests

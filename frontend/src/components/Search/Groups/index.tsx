"use client"

import { Group, GroupRequests, UserImage } from "@/models/dbModels";
import SearchTemplate from "../SearchTemplate";

import { useState, useEffect } from "react"
import ApiRequest from "@/utils/ApiRequests";
import * as S from "./style"
import authHook from "@/data/hooks/authHook";
import { Groups, OtherUsers, SocialIdsRequestInterface, SocialRequestInterface, UserFriendsRequests } from "@/models/frontModels";
import Link from "next/link";
import messageAuth from "@/data/hooks/messageHook";

interface Users {
  id: string
  nickname: string
  image: UserImage
}

interface SearchGroupsProps {
  data: SocialIdsRequestInterface | string | null
}

export default function SearchGroups({ data }: SearchGroupsProps) {

  const { user, setUser } = authHook()
  const { showMessageBox } = messageAuth()

  const [userSocial, setUserSocial] = useState(data)
  const [searchValue, setSearchValue] = useState("")
  const [requestSearchValue, setRequestSearchValue] = useState("")
  const [searchGroups, setSearchGroups] = useState<Group[] | null>(null)

  if (data && typeof data !== "string" && !user?.adminGroups) return ""

  const handleOnKeyDown = async (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    if (key === "Enter") {
      const groups = await ApiRequest<Group[]>(`/api/groups/search/${searchValue}`, "get")
      if (groups) {
        if (groups.type === "success") {
          setSearchGroups(groups.response as Group[])
          setRequestSearchValue(searchValue)
        } else {
          showMessageBox(groups.response as string, "error")
        }
      }
    }
  }

  const GroupRequest = async (groupId: number | GroupRequests) => {
    if (userSocial && typeof userSocial !== "string") {
      const resp = await ApiRequest(`/api/groups/user/request/${groupId}`, "post")
      if (resp) {
        if (resp.type === "success") {
          const groupRequests = [...userSocial.groupRequests]
          groupRequests.push(groupId as GroupRequests)
          setUserSocial(prev => ({ ...prev as SocialRequestInterface, groupRequests }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const CancelRequest = async (groupId: number | GroupRequests) => {
    if (userSocial && typeof userSocial !== "string") {
      const groupRequest = userSocial.groupRequests.find(g => g.id === groupId)
      const resp = await ApiRequest(`/api/groups/user/request/cancel_request/${groupRequest!.id}`, "post")
      if (resp) {
        if (resp.type === "success") {
          const groupRequests = [...userSocial.groupRequests].filter(r => r.id !== groupRequest!.id)
          setUserSocial(prev => ({ ...prev as SocialRequestInterface, groupRequests }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const RenderButton = ({ group }: { group: Group }) => {
    const { type, id: groupId } = group
    if (user && userSocial && typeof userSocial !== "string") {
      const { adminGroups, groups, groupRequests } = userSocial
      if (adminGroups.some(g => g.id === groupId) || groups.some(g => g.id === groupId)) {
        return <span>Você está neste grupo!</span>
      } else if (groupRequests.some(g => g.groupId === g.id)) {
        return <S.Button onClick={() => CancelRequest(groupId)}>Cancelar pedido de participação</S.Button>
      } else {
        if (type === "PRIVATE") {
          return <S.Button onClick={() => GroupRequest(groupId)}>Enviar pedido de participação!!</S.Button>
        } else if (type === "PUBLIC") {
          return <S.Button onClick={() => GroupRequest(groupId)}>Participar do grupo</S.Button>
        } else {
          return <S.Button onClick={() => GroupRequest(groupId)}>Enviar pedido de participação!!</S.Button>
        }
      }
    }
  }

  return (
    <SearchTemplate
      changeEvent={ev => setSearchValue(ev.target.value)}
      onKeyDownEvent={handleOnKeyDown}
      subtitle="Encotrar grupos pelo nome"
      title="Buscar Grupos"
      inputValue={searchValue}
    >
      {searchGroups !== null && searchGroups.map(g => (
        <S.SearchUsersCard key={`search-groups-${g.groupLink}`}>
          <S.SearchUsersImageNickname>
            <S.SearchUsersImage replace href={`/groups/${g.groupLink}`}>
              <img src={g.image ? g.image.url : "/player.jpg"} alt="" />
            </S.SearchUsersImage>
            <S.SearchusersNickname replace href={`/groups/${g.groupLink}`} >{g.name}</S.SearchusersNickname>
          </S.SearchUsersImageNickname>
          {user && <RenderButton group={g} />}
        </S.SearchUsersCard>
      ))}
      {searchGroups !== null && searchGroups.length < 1 && (
        <S.NotFoundMessageContainer>
          <S.NotFoundMessage>
            <span>Não foi encontrado nenhum grupo com o termo &quot;{requestSearchValue}&quot;</span>

          </S.NotFoundMessage>
        </S.NotFoundMessageContainer>
      )}
    </SearchTemplate>
  )
}

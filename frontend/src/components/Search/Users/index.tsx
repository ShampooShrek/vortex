"use client"

import { UserImage } from "@/models/dbModels";
import SearchTemplate from "../SearchTemplate";

import { useState, useEffect } from "react"
import ApiRequest from "@/utils/ApiRequests";
import * as S from "./style"
import authHook from "@/data/hooks/authHook";
import { OtherUsers, SocialRequestInterface, UserFriendsRequests } from "@/models/frontModels";
import Link from "next/link";
import messageAuth from "@/data/hooks/messageHook";

interface Users {
  id: string
  nickname: string
  image: UserImage
}

interface SearchUsersProps {
  data: SocialRequestInterface | string | null
}

export default function SearchUsers({ data }: SearchUsersProps) {

  const { user, setUser } = authHook()
  const { showMessageBox } = messageAuth()

  const [userSocial, setUserSocial] = useState(data)
  const [searchValue, setSearchValue] = useState("")
  const [requestSearchValue, setRequestSearchValue] = useState("")
  const [searchUsers, setSearchUsers] = useState<Users[] | null>(null)

  if (data && typeof data !== "string" && !user?.adminGroups) return ""

  const handleOnKeyDown = async (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    if (key === "Enter") {
      const users = await ApiRequest<Users[]>(`/api/users/search/${searchValue}`, "get")
      if (users) {
        if (users.type === "success") {
          setSearchUsers(users.response as Users[])
          setRequestSearchValue(searchValue)
        } else {
          showMessageBox(users.response as string, "error")
        }
      }
    }
  }

  const SendRequest = async (friendId: string) => {
    if (userSocial && typeof userSocial !== "string") {
      const response = await ApiRequest<UserFriendsRequests>(`/api/users/friends/requests/send_request/${friendId}`, "post")

      if (response) {
        if (response.type === "success") {
          const userRequests = [...userSocial.friendRequestsSent]
          userRequests.push(response.response as UserFriendsRequests)
          setUserSocial(prev => ({ ...prev as SocialRequestInterface, friendRequestsSent: userRequests }))
        } else {
          showMessageBox(response.response as string, "error")
        }
      }
    }
  }

  const CancelRequest = async (requestId: number) => {
    if (userSocial && typeof userSocial !== "string") {
      const response = await ApiRequest<UserFriendsRequests>(`/api/users/friends/requests/request_action/${requestId}`, "post", { status: "CANCELED" })

      if (response) {
        if (response.type === "success") {
          const userRequests = [...userSocial.friendRequestsSent].filter(r => r.id !== requestId)
          setUserSocial(prev => ({ ...prev as SocialRequestInterface, friendRequestsSent: userRequests }))
        } else {
          showMessageBox(response.response as string, "error")
        }
      }
    }
  }

  const AcceptRequest = async (requestId: number, friendId: string | OtherUsers) => {
    if (userSocial && typeof userSocial !== "string") {
      const response = await ApiRequest<UserFriendsRequests>(`/api/users/friends/requests/request_action/${requestId}`, "post", { status: "ACCEPTED" })

      if (response) {
        if (response.type === "success") {
          const userRequests = [...userSocial.friendRequestsReceived].filter(r => r.id !== requestId)
          const friends = [...userSocial.friends]
          friends.push(friendId as OtherUsers)
          setUserSocial(prev => ({ ...prev as SocialRequestInterface, friendRequestsReceived: userRequests, friends }))
        } else {
          showMessageBox(response.response as string, "error")
        }
      }
    }
  }

  const RenderButton = ({ friendId }: { friendId: string }) => {
    if (user && userSocial && typeof userSocial !== "string") {
      if (userSocial.friends!.some(f => f.id === friendId)) {
        return <span>Vocês são amigos</span>

      } else if (userSocial.friendRequestsReceived?.some(f => f.sender.id === friendId)) {
        return <S.Button onClick={() =>
          AcceptRequest(userSocial.friendRequestsReceived.find(f => f.sender.id === friendId)!.id, friendId)}>
          Aceitar pedido de amizade
        </S.Button>

      } else if (userSocial.friendRequestsSent?.some(f => f.receiver.id === friendId)) {
        return <S.Button onClick={() => CancelRequest(userSocial.friendRequestsSent?.find(f => f.receiver.id === friendId)!.id)}>
          Cancelar pedido de amizade
        </S.Button>

      } else if (userSocial.userBlocks?.some(f => f.id === friendId)) {
        return <S.Button>Desbloquear Usuario</S.Button>

      } else if (friendId === user.id) {
        return <Link replace href={`/profile/${user.id}`}>Ver perfil</Link>

      } else {
        return <S.Button onClick={() => SendRequest(friendId)}>Enviar Pedido de amizade</S.Button>
      }
    }
  }

  return (
    <SearchTemplate
      changeEvent={ev => setSearchValue(ev.target.value)}
      onKeyDownEvent={handleOnKeyDown}
      subtitle="Encontre usuário pelo nickname"
      title="Buscar Usuário"
      inputValue={searchValue}
    >
      {searchUsers !== null && searchUsers.map(({ id, image, nickname }) => (
        <S.SearchUsersCard key={`search-users-${id}`}>
          <S.SearchUsersImageNickname>
            <S.SearchUsersImage replace href={`/profile/${id}`}>
              <img src={image ? image.url : "/player.jpg"} alt="" />
            </S.SearchUsersImage>
            <S.SearchusersNickname replace href={`/profile/${id}`} >{nickname}</S.SearchusersNickname>
          </S.SearchUsersImageNickname>
          {user && <RenderButton friendId={id} />}
        </S.SearchUsersCard>
      ))}
      {searchUsers !== null && searchUsers.length < 1 && (
        <S.NotFoundMessageContainer>
          <S.NotFoundMessage>
            <span>Não foi encontrado nenhum usuário com o nickname &quot;{requestSearchValue}&quot;</span>
          </S.NotFoundMessage>
        </S.NotFoundMessageContainer>
      )}
    </SearchTemplate>
  )
}

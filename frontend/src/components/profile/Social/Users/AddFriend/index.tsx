"use client"

import authHook from "@/data/hooks/authHook"
import SectionTemplate from "../../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useEffect, useState } from "react"
import * as S from "./style"
import { Response, OtherUsers, UserFriendsRequests } from "@/models/frontModels"
import api from "@/services/api"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import ProfileSectionHeader from "@/components/profile/ProfileDetailsSocialsLayout/SectionsHeader"
import messageAuth from "@/data/hooks/messageHook"



const AddFriend: React.FC = () => {
  const { user, setUser } = authHook()
  const { showMessageBox } = messageAuth()
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<OtherUsers[]>([])

  const router = useRouter()

  useEffect(() => {
    if (search !== "") {
      const timeOut = setTimeout(async () => {
        const response = await api.get(`/api/users/search/${search}`)
        const data: Response<OtherUsers[]> = response.data

        if (data.type === "success") {
          setUsers(data.response as OtherUsers[])
        }
      }, 500)

      return () => clearTimeout(timeOut)
    } else {
      setUsers([])
    }
  }, [search])

  const SendRequest = async (friendId: string) => {
    try {
      const response = await api.get(`/api/users/${user!.id}/friends/requests/send_request/${friendId}`)
      const data: Response<UserFriendsRequests> = response.data


      if (data.type === "success") {
        setUser(prevU => (
          {
            ...prevU!,
            friendRequestsSent: [...prevU!.friendRequestsSent ?? [], data.response as UserFriendsRequests]
          }
        ))
      }

    } catch (err: any) {
      showMessageBox("Ops, não foi possivel fazer a requesição, tente novamente mais tarde!", "error")
    }
  }

  return (
    <SectionTemplate section="Adicionar Amigo">
      <S.Container>
        <ProfileSectionHeader
          placeholder="Pesquisar por Nickname"
          onChange={(ev) => setSearch(ev.target.value)}
          text="Pesquisar por Usuário"
          value={search}
        />
        <S.UsersContainer>
          {users.length > 0 ? users.map(u => (
            <S.UsersCard key={u.id}>
              <div style={{ display: "flex" }}>
                <S.UsersImg src={u.image ? u.image.url : "/player.jpg"} />
                <S.UserContent onClick={() => router.push(`/profile/${u.id}`)}> {u.nickname} </S.UserContent>
              </div>
              <S.ButtonAction onClick={() => SendRequest(u.id)}>Enviar Pedido</S.ButtonAction>
            </S.UsersCard>
          )) : search.length > 0 && (
            <S.UsersCard>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2>Usuário não encontrado</h2>
              </div>
            </S.UsersCard>
          )}
        </S.UsersContainer>
      </S.Container>
    </SectionTemplate>
  )
}

export default AddFriend


"use client"

import { FriendRequest } from "@/models/dbModels"
import * as S from "./style"
import api from "@/services/api"
import { useEffect, useState } from "react"
import authHook from "@/data/hooks/authHook"
import { OtherUsers, Response, UserFriendsRequests } from "@/models/frontModels"
import ProfileSectionHeader from "@/components/profile/ProfileDetailsSocialsLayout/SectionsHeader"

interface EnvitesContainerProps {
  receivers: UserFriendsRequests[]
  senders: UserFriendsRequests[]
}

type RequestTypes = "DECLINED" | "ACCEPTED" | "CANCELED"

const EnvitesContainer = ({ receivers: receiversProps, senders: sendersProps }: EnvitesContainerProps) => {

  const { user, setUser } = authHook()

  const [receivers, setReceivers] = useState(receiversProps)
  const [receiversSearch, setReceiversSearch] = useState("")

  const [senders, setSenders] = useState(sendersProps)
  const [sendersSearch, setSendersSearch] = useState("")

  useEffect(() => {
    setUser(prevUser => ({ ...prevUser!, friendRequestsReceived: receivers, friendRequestsSent: senders }))
  }, [receivers, senders])

  useEffect(() => {
    if (sendersSearch !== "") {
      setSenders(() =>
        sendersProps.filter(f => f.receiver.nickname.toLowerCase().replaceAll(" ", "")
          .includes(sendersSearch.replaceAll(" ", "".toLowerCase())))
      )
    } else {
      setSenders(sendersProps)
    }
  }, [sendersSearch])

  useEffect(() => {
    if (receiversSearch !== "") {
      setReceivers(() =>
        receiversProps.filter(f => f.sender.nickname.toLowerCase().replaceAll(" ", "")
          .includes(receiversSearch.replaceAll(" ", "".toLowerCase())))
      )
    } else {
      setReceivers(receiversProps)
    }
  }, [receiversSearch])

  const RequestAction = async (requestId: number, status: RequestTypes, action: "SENDER" | "RECEIVER") => {

    const response = await api.post(`/api/users/friends/requests/request_action/${requestId}`, {
      status
    })
    const data: Response<OtherUsers | FriendRequest> = response.data

    if (data.type === "success") {
      if (action === "RECEIVER") {
        setUser(prevU => ({
          ...prevU!,
          friendRequestsSent: prevU!.friendRequestsSent!.filter(r => r.id !== requestId)
        }))

      } else {
        if (status === "ACCEPTED") {
          const requestUser = receivers.find(r => r.id === requestId)!.sender
          const newFriends = [...user!.friends!]
          newFriends.push(requestUser)
          setUser(prevU => ({
            ...prevU!,
            friends: newFriends
          }))
        }
      }
      setSenders(prev => prev.filter(r => r.id !== requestId))
      setReceivers(prev => prev.filter(r => r.id !== requestId))
    }
  }


  return (
    <S.Container>
      <S.Cards>
        <ProfileSectionHeader
          onChange={ev => setSendersSearch(ev.target.value)}
          placeholder="Pesquisar Por Nickname"
          text="Pedidos Enviados"
          value={sendersSearch}
          margin={false}
        />
        <S.UsersContainer>
          {senders.map(u => (
            <S.UsersCard key={u.receiver.id}>
              <div style={{ display: "flex" }}>
                <S.UsersImg src={u.receiver.image ? u.receiver.image.url : "/player.jpg"} />
                <S.UserContent> {u.receiver.nickname} </S.UserContent>
              </div>
              <S.ButtonAction>
                <S.ButtonAction onClick={() => RequestAction(u.id, "CANCELED", "RECEIVER")}>Cancelar Envio</S.ButtonAction>
              </S.ButtonAction>
            </S.UsersCard>
          ))}
        </S.UsersContainer>
      </S.Cards>
      <S.Cards>
        <ProfileSectionHeader
          onChange={ev => setReceiversSearch(ev.target.value)}
          placeholder="Pesquisar Por Nickname"
          text="Pedidos Recebidos"
          value={receiversSearch}
          margin={false}
        />
        <S.UsersContainer>
          {receivers.map(u => (
            <S.UsersCard key={u.sender.id}>
              <div style={{ display: "flex" }}>
                <S.UsersImg src={u.sender.image ? u.sender.image.url : "/player.jpg"} />
                <S.UserContent> {u.sender.nickname} </S.UserContent>
              </div>
              <S.ButtonsContainer>
                <S.ButtonAction onClick={() => RequestAction(u.id, "ACCEPTED", "SENDER")}>Aceitar</S.ButtonAction>
                <S.ButtonAction onClick={() => RequestAction(u.id, "DECLINED", "SENDER")}>Recusar</S.ButtonAction>
              </S.ButtonsContainer>
            </S.UsersCard>
          ))}
        </S.UsersContainer>
      </S.Cards>
    </S.Container>
  )
}

export default EnvitesContainer

"use client"

import { useEffect, useState } from "react"

import { GroupRequests, User } from "@/models/dbModels"
import * as S from "./style"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import ButtonsContainer from "@/components/ButtonsContainer"
import { PlusIcon, XIcon } from "@/components/Icons"
import api from "@/services/api"
import { Groups, Response, UserAuth } from "@/models/frontModels"
import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"


interface RequestManagementProps {
  group: Groups
}

const RequestManagement = ({ group }: RequestManagementProps) => {

  const { loading, setUser, user } = authHook()


  const selectedGroup = user?.adminGroups?.find(g => g.id === group.id)

  if (!selectedGroup) {
    redirect("/home")
  }

  const [requests, setRequests] = useState<GroupRequests[]>(selectedGroup.groupRequests)
  const [search, setSearch] = useState("")
  const [qtdeMatriz, setMatrizQtde] = useState(3)

  useEffect(() => {
    const findGroup = user?.adminGroups?.find(g => g.id === group.id)
    if (findGroup) {
      setRequests(findGroup.groupRequests)
    }
  }, [])

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth
    if (clientWidth > 960) {
      setMatrizQtde(3)
    }
    if (clientWidth < 960) {
      setMatrizQtde(2)
    }
    if (clientWidth <= 600) {
      setMatrizQtde(1)
    }
  }

  useEffect(() => {
    if (search !== "") {
      setRequests(() =>
        selectedGroup.groupRequests.filter(u => u.requestUser.nickname.replaceAll(" ", "").toLowerCase()
          .includes(search.replaceAll(" ", "").toLowerCase())))
    }
  }, [search])

  const requestAction = async (requestId: number, type: "DECLINED" | "ACCEPTED") => {
    const response = await api.post(`/api/groups/user/request/action/${requestId}`, { type })
    const data: Response<Groups | string> = response.data

    if (data.type === "success") {
      if (typeof data.response !== "string") {
        setUser(prevUser => {
          const selectedGroupIndex = prevUser!.adminGroups!.findIndex(g => g.id === group.id)
          const updatedGroups = [...prevUser!.adminGroups!]
          let updatedGroup: Groups = { ...updatedGroups[selectedGroupIndex], ...data.response as Groups }
          const groupRequest = updatedGroup.groupRequests.filter(f => f.id !== requestId)
          updatedGroup.groupRequests = groupRequest
          updatedGroups[selectedGroupIndex] = updatedGroup
          const updatedUser: UserAuth = { ...prevUser!, adminGroups: updatedGroups }
          return updatedUser
        })
      } else {
        setUser(prevUser => {
          const selectedGroupIndex = prevUser!.adminGroups!.findIndex(g => g.id === group.id)
          const updatedGroups = [...prevUser!.adminGroups!]
          let updatedGroup: Groups = { ...updatedGroups[selectedGroupIndex] }
          const groupRequest = updatedGroup.groupRequests.filter(f => f.id !== requestId)
          updatedGroup.groupRequests = groupRequest
          updatedGroups[selectedGroupIndex] = updatedGroup
          const updatedUser: UserAuth = { ...prevUser!, adminGroups: updatedGroups }
          return updatedUser
        })
      }
    }
    setRequests(prev => prev.filter(r => r.id !== requestId))
  }

  if (loading) return ""

  return (
    <S.Container className="oloko">
      <S.InputContainer>
        <S.Input
          type="text"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Informe um nickname" />
      </S.InputContainer>
      <S.UsersCard style={{ marginBottom: "10px" }}>
        <S.UsersCardHeader>
          <span>{selectedGroup.groupRequests.length} solicitações</span>
        </S.UsersCardHeader>
        <S.UsersCardContent>
          {requests.length > 0 ? MatrizOfArray(requests, qtdeMatriz).map((matriz, i) => (
            <S.UsersCardLine key={`users1-matriz-${i}`} >
              {matriz.map(r => {
                const user = r.requestUser
                return (
                  <S.UsersCardLineContent key={user.id}>
                    <S.LeftCardContent>
                      <S.UsersImg src={user.image ? user.image.url : "/player.jpg"} />
                      <S.UserContent>
                        <h3>{user.nickname}</h3>
                      </S.UserContent>
                    </S.LeftCardContent>
                    <S.RightCardContent>
                      <PlusIcon onClick={() => requestAction(r.id, "ACCEPTED")} />
                      <XIcon onClick={() => requestAction(r.id, "DECLINED")} />
                    </S.RightCardContent>
                  </S.UsersCardLineContent>
                )
              })}
            </S.UsersCardLine>
          )) : <S.NoItemWarning>{search !== "" ? "Usuário não encontrado" : "Sem solicitações pendentes"}</S.NoItemWarning>}
        </S.UsersCardContent>
      </S.UsersCard>
    </S.Container>
  )
}

export default RequestManagement

"use client"

import { OtherUsers } from "@/models/frontModels"
import * as S from "./style"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import ProfileSectionHeader from "../profile/ProfileDetailsSocialsLayout/SectionsHeader"
import { useEffect, useState } from "react"
import authHook from "@/data/hooks/authHook"

interface UsersContainersProps {
  users: OtherUsers[]
  headerTitle: string
}

const UsersContainers = ({ users: PropsUsers, headerTitle }: UsersContainersProps) => {

  const { userStatus } = authHook()

  const [users, setUsers] = useState<OtherUsers[]>([])
  const [search, setSearch] = useState("")
  const [qtdeMatriz, setQtdeMatriz] = useState(3)

  useEffect(() => {
    setUsers(PropsUsers)
  }, [PropsUsers])

  useEffect(() => {
    if (search !== "") {
      setUsers(prevUsers => {
        const filtredUsers = PropsUsers.filter(u => u.nickname.toLowerCase().replaceAll(" ", "").
          includes(search.toLowerCase().replaceAll(" ", "")))
        return filtredUsers
      })
    } else {
      setUsers(PropsUsers)
    }
  }, [search])


  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("DOMContentLoaded", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth

    if (clientWidth > 764) {
      setQtdeMatriz(3)
    } else if (clientWidth < 764 && clientWidth > 600) {
      setQtdeMatriz(2)
    } else {
      setQtdeMatriz(1)
    }

  };

  return (
    <>
      <ProfileSectionHeader
        placeholder="Pesquisar por Nickname"
        onChange={(ev) => setSearch(ev.target.value)}
        text={headerTitle}
        value={search}
      />
      <S.Container>
        {users.length > 0 && MatrizOfArray(users, qtdeMatriz).map(matriz => {
          if (matriz.length > 0) {
            return (
              <S.UsersLine key={matriz[0].id}>
                {matriz.map(u => {
                  const { id, image, nickname, status } = u
                  return (
                    <S.UsersCard replace href={`/profile/${id}`} key={id}>
                      <S.UsersImg src={image ? image.url : "/player.jpg"} />
                      <S.UserContent>
                        <h3>{nickname}</h3>
                        <span>{userStatus(id)}</span>
                      </S.UserContent>
                    </S.UsersCard>
                  )
                })}
              </S.UsersLine>
            )
          }
        })}
      </S.Container>
    </>
  )
}

interface DetailsUserContainerProps {
  users: OtherUsers[]
}

export const DetailsUserContainer = ({ users: PropsUsers }: DetailsUserContainerProps) => {

  const { userStatus } = authHook()

  const [qtdeMatriz, setQtdeMatriz] = useState(3)

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("DOMContentLoaded", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth

    if (clientWidth > 764) {
      setQtdeMatriz(3)
    } else if (clientWidth < 764 && clientWidth > 600) {
      setQtdeMatriz(2)
    } else {
      setQtdeMatriz(1)
    }

  };

  return (
    <>
      <S.Container>
        {PropsUsers.length > 0 && MatrizOfArray(PropsUsers, qtdeMatriz).map(matriz => {
          if (matriz.length > 0) {
            return (
              <S.UsersLine key={matriz[0].id}>
                {matriz.map(u => {
                  const { id, image, nickname } = u
                  return (
                    <S.UsersCard replace href={`/profile/${id}`} key={id}>
                      <S.UsersImg src={image ? image.url : "/player.jpg"} />
                      <S.UserContent>
                        <h3>{nickname}</h3>
                        <span>{userStatus(id)}</span>
                      </S.UserContent>
                    </S.UsersCard>
                  )
                })}
              </S.UsersLine>
            )
          }
        })}
      </S.Container>
    </>
  )
}

export default UsersContainers

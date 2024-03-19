"use client"

import { User } from "@/models/dbModels"
import * as S from "./style"
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "@/components/Icons"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import ButtonsContainer from "@/components/ButtonsContainer"
import { useEffect, useState } from "react"
import authHook from "@/data/hooks/authHook"

interface MemebersManagementProps {
  users1: User[]
  users2?: User[]
  header1Text: string
  header2Text?: string
  emptyText1: string
  emptyText2?: string
  saveClick(): Promise<void>
  cancelClick?(): void
  onClickUsers1(user: User): Promise<void> | void
  onClickUsers2?(user: User): Promise<void> | void
}

const MembersTemplate = ({
  users1: users1Props,
  users2: users2Props,
  header1Text,
  header2Text,
  saveClick,
  cancelClick,
  emptyText1,
  emptyText2,
  onClickUsers1,
  onClickUsers2
}: MemebersManagementProps) => {

  const { user } = authHook()

  const [users1, setUsers1] = useState<User[]>(users1Props)
  const [users2, setUsers2] = useState<User[] | null>(users2Props ?? null)
  const [search, setSearch] = useState("")
  const [qtdeMatriz, setMatrizQtde] = useState(3)

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
    filterByName()
  }, [search])

  const filterByName = () => {
    if (search !== "") {
      if (users2 !== null) {
        setUsers2(() =>
          users2Props!.filter(u => u.nickname.replaceAll(" ", "").toLowerCase()
            .includes(search.replaceAll(" ", "").toLowerCase())))
      }
      setUsers1(() =>
        users1Props.filter(u => u.nickname.replaceAll(" ", "").toLowerCase()
          .includes(search.replaceAll(" ", "").toLowerCase())))
    }
  }

  useEffect(() => {
    setUsers1(users1Props)
    setUsers2(users2Props ?? null)
    filterByName()
  }, [users1Props, users2Props])

  return (
    <S.Container className="oloko">
      <S.InputContainer>
        <S.Input
          type="text"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Procure por nickname" />
      </S.InputContainer>
      <S.UsersCard style={{ marginBottom: "10px" }}>
        <S.UsersCardHeader>
          <span>{users1Props ? users1Props.length : 0} {header1Text}</span>
        </S.UsersCardHeader>
        <S.UsersCardContent>
          {users1.length > 0 ? MatrizOfArray(users1, qtdeMatriz).map((matriz, i) => (
            <S.UsersCardLine key={`users1-matriz-${i}`} >
              {matriz.map(u => (
                <S.UsersCardLineContent key={u.id}>
                  <S.LeftCardContent>
                    <S.UsersImg src={u.image ? u.image.url : "/player.jpg"} />
                    <S.UserContent>
                      <h3>{u.nickname}</h3>
                    </S.UserContent>
                  </S.LeftCardContent>

                  {u.id !== user!.id && (
                    <S.RightCardContent>
                      <ArrowDownIcon onClick={() => onClickUsers1(u)} />
                    </S.RightCardContent>
                  )}
                </S.UsersCardLineContent>
              ))}
            </S.UsersCardLine>
          )) : (
            <S.NoItemWarning>{emptyText1}</S.NoItemWarning>
          )}
        </S.UsersCardContent>
      </S.UsersCard>
      {users2 !== null && (
        <S.UsersCard>
          <S.UsersCardHeader>
            <span>{users2Props!.length} {header2Text}</span>
          </S.UsersCardHeader>
          <S.UsersCardContent>
            {users2.length > 0 ? MatrizOfArray(users2, qtdeMatriz).map((matriz, i) => (
              <S.UsersCardLine key={`users2-matriz-${i}`} >
                {matriz.map(u => (
                  <S.UsersCardLineContent key={u.id}>
                    <S.LeftCardContent>
                      <S.UsersImg src={u.image ? u.image.url : "/player.jpg"} />
                      <S.UserContent>
                        <h3>{u.nickname}</h3>
                      </S.UserContent>
                    </S.LeftCardContent>
                    {u.id !== user!.id && (
                      <S.RightCardContent>
                        <ArrowUpIcon onClick={() => onClickUsers2!(u)} />
                      </S.RightCardContent>
                    )}
                  </S.UsersCardLineContent>
                ))}
              </S.UsersCardLine>
            )) : (
              <S.NoItemWarning>{emptyText2}</S.NoItemWarning>
            )}
          </S.UsersCardContent>
        </S.UsersCard>
      )}
    </S.Container>
  )
}

export default MembersTemplate

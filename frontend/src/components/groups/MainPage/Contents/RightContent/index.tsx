"use client"
import { Bar } from "@/styles/global"
import * as S from "./style"
import DateFormater from "@/utils/dateFormater"
import { GamesStore } from "@/models/frontModels"
import Link from "next/link"
import { EditIcon } from "@/components/Icons"
import authHook from "@/data/hooks/authHook"
import { useEffect, useState } from "react"
import { User } from "@/models/dbModels"

interface RightContentProps {
  membersLength: number | null
  createdAt: string
  type: "PUBLIC" | "PRIVATE" | "RESTRICT"
  associedGames: GamesStore[]
  userInGroup: boolean
  userIsAdmin: boolean
  groupLink: string
  users: User[]
  admins: User[]
}

const GroupRightContent = ({ createdAt, membersLength: membersLenght, associedGames, userInGroup, userIsAdmin, groupLink, users, admins }: RightContentProps) => {
  const { user, loading, usersOnline } = authHook()
  const [membersOnline, setMembersOnline] = useState(0)
  const [inGroup, setInGroup] = useState<boolean>(false)


  useEffect(() => {
    if (!loading) {
      if (user) {
        const isInGroup = (users.some(u => u.id === user.id) || admins.some(u => u.id === user.id)) ? true : false
        setInGroup(isInGroup)
      }
    }
  }, [loading, user])

  useEffect(() => {
    let onlineMembers = 0
    users.forEach(u => {
      if (usersOnline.some(uOnline => uOnline.id === u.id)) {
        onlineMembers++
      }
    })
    admins.forEach(u => {
      if (usersOnline.some(uOnline => uOnline.id === u.id)) {
        onlineMembers++
      }
    })
    setMembersOnline(onlineMembers)
  }, [usersOnline, users, admins])

  return (
    <S.Container>
      <S.Card>
        <S.UsersQtdContainer>
          <S.UsersQtdContent color="red">
            <h3>{membersLenght}</h3>
            <span>membros</span>
          </S.UsersQtdContent>
          <S.UsersQtdContent color="blue">
            <h3>{membersOnline}</h3>
            <span>on-line</span>
          </S.UsersQtdContent>
        </S.UsersQtdContainer>
        {inGroup && (
          <S.ButtonCard href="/chat">
            Chat
          </S.ButtonCard>
        )}
        <Bar height="1px" margin="15px auto" width="80%" />
        <S.DateCreat>criado dia {DateFormater(createdAt)}</S.DateCreat>
      </S.Card>
      {userInGroup && (
        <S.Card>
          <Link href={`#`}><EditIcon /> Sair do Grupo</Link>
          {userIsAdmin && <Link replace href={`${groupLink}/edit`}><EditIcon /> Editar Grupo</Link>}
        </S.Card>
      )}
      {associedGames && associedGames.length > 0 && (
        <S.Card>
          <S.AssociedGamesHeader>Jogos Associados:</S.AssociedGamesHeader>
          <Bar height="1px" margin="10px auto" width="80%" />
          <S.GamesCardContainer>
            {associedGames.map(g => (
              <S.GamesCards key={g.id}>
                <img src={g.gameIconImage ? g.gameIconImage.url : "/player.jpg"} />
                <Link href={`/store/games/${g.id}`}>{g.name}</Link>
              </S.GamesCards>
            ))}
          </S.GamesCardContainer>
        </S.Card>
      )}
    </S.Container>
  )
}

export default GroupRightContent

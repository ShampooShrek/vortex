"use client"

import { Group, GroupHistoric } from "@/models/dbModels"
import * as S from "./style"
import DateFormater from "@/utils/dateFormater"
import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

interface MemebersManagementProps {
  group: Group
}

const GroupHistoric = ({ group }: MemebersManagementProps) => {

  const { user } = authHook()

  const selectedGroup = user?.adminGroups?.findIndex(g => g.id === group.id)
  if (selectedGroup === -1) {
    redirect("/home")
  }

  const [groupHistoric, setGroupHistoric] = useState<GroupHistoric[]>(user!.adminGroups![selectedGroup!].groupHistoric)

  useEffect(() => {
    if (user?.adminGroups) {
      const findGroup = user.adminGroups.find(g => g.id === group.id)
      if (findGroup) {
        setGroupHistoric(findGroup.groupHistoric)
      }
    }
  }, [user])

  return (
    <S.Container>
      <S.HistoricCard>
        <S.HistoricCardHeader>
          <span>{groupHistoric.length} itens do grupo</span>
        </S.HistoricCardHeader>
        <S.HistoricCardContent>
          {groupHistoric.map((h, i) => (
            <S.HistoricCardLine key={`line-${i}-${h.user.id}`} index={i}>
              <h3>{DateFormater(h.date)}</h3> - <span>{h.message}</span>
            </S.HistoricCardLine>
          ))}
        </S.HistoricCardContent>
      </S.HistoricCard>
    </S.Container>
  )
}

export default GroupHistoric

"use client"

import authHook from "@/data/hooks/authHook"
import * as S from "./style"
import { useEffect, useState } from "react"
import { Groups } from "@/models/frontModels"
import { ArrowDownIcon } from "@/components/Icons"
import { GroupHeaderEdit } from "../groupHeader"

interface GroupComponents {
  section: string
  component: React.ReactElement<any>
  sectionIcon: React.ReactElement
}

interface EditGroupProps {
  components: GroupComponents[]
  group: Groups
}

const EditGroup = ({ components, group: groupProps }: EditGroupProps) => {
  const { user, setGroups, loading } = authHook()
  const [group, setGroup] = useState(groupProps)
  const [componentSelected, setComponentSelected] = useState<GroupComponents>(components[0])
  const [isOpen, setIsOpen] = useState(false)
  const [requestsLength, setRequestsLength] = useState(group.groupRequests ? group.groupRequests.length : 0)


  useEffect(() => {
    if (!user?.adminGroups?.some(g => g.id === group.id)) {
      setGroups(group)
    } else {
      const findGroup = user.adminGroups.find(g => g.id === group.id)
      if (findGroup) {
        setGroup(findGroup)
        setRequestsLength(findGroup.groupRequests && findGroup.groupRequests.length ? findGroup.groupRequests.length : 0)
      }
    }
  }, [user])

  const UpdateSectionUserRequests = (text: string): boolean => {
    if (text.includes("Solicitação de Participação")) {
      return true
    } else {
      return false
    }
  }


  if (loading) return <></>

  return (
    <>
      <GroupHeaderEdit
        group={group}
        section={"Editar"}
      />
      <S.Container>
        <S.LeftContainer>
          {componentSelected.component}
        </S.LeftContainer>

        <S.RightContainer>
          <S.SelectedSection onClick={() => setIsOpen(prev => !prev)}>
            <span>{componentSelected.sectionIcon} {componentSelected.section}</span>
            <ArrowDownIcon />
          </S.SelectedSection>
          {components.map((c, i) => (
            <S.RightContainerItem key={`section-${i}-${c.section}`} isOpen={isOpen} isSelected={componentSelected.section === c.section} onClick={() => { setComponentSelected(components[i]); setIsOpen(false) }}>
              <S.RightContainerItemContent isOpen={isOpen} isSelected={componentSelected.section === c.section}>
                {c.sectionIcon} {UpdateSectionUserRequests(c.section) ? `${c.section} (${requestsLength})` : c.section}
              </S.RightContainerItemContent>
            </S.RightContainerItem>
          ))}
        </S.RightContainer>
      </S.Container>
    </>
  )
}

export default EditGroup

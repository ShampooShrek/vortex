"use client"

import SectionTemplate from "@/components/profile/ProfileDetailsSocialsLayout/SectionTemplate"
import ProfileSectionHeader from "@/components/profile/ProfileDetailsSocialsLayout/SectionsHeader"
import authHook from "@/data/hooks/authHook"
import * as S from "./style"
import Link from "next/link"
import { useState, useEffect } from "react"
import api from "@/services/api"
import { Groups, Response, UserAuth } from "@/models/frontModels"


interface SocialGroupsProps {
  groups: Groups[]
  adminGroups: Groups[]
}

const SocialGroups = ({ adminGroups, groups }: SocialGroupsProps) => {

  const { user, setUser, loading } = authHook()


  const [userGroupsAdmins, setUserGroupsAdmins] = useState([...adminGroups])
  const [userGroupsMember, setUserGroupsMember] = useState([...groups])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (search !== "") {
      setUserGroupsAdmins(prevGroups => {
        const filtredGroups = adminGroups.filter(g => g.name.toLowerCase().replaceAll(" ", "").
          includes(search.toLowerCase().replaceAll(" ", "")))
        return filtredGroups
      })
      setUserGroupsMember(prevGroups => {
        const filtredGroups = groups.filter(g => g.name.toLowerCase().replaceAll(" ", "").
          includes(search.toLowerCase().replaceAll(" ", "")))
        return filtredGroups
      })
    } else {
      setUserGroupsAdmins([...adminGroups])
      setUserGroupsMember([...groups])
    }
  }, [search])

  useEffect(() => {
    setUser(prevUser => ({ ...prevUser!, adminGroups, groups }))
  }, [adminGroups, groups])

  const quitGroup = async (groupId: number) => {
    const response = await api.post(`/api/groups/user/quit_group/${groupId}`)
    const data: Response<string> = response.data

    if (data.type === "success") {
      setUser(prevUser => {
        const filtredGroupMembers = prevUser!.groups!.filter(g => g.id !== groupId)
        const filtredGroupAdmins = prevUser!.adminGroups!.filter(g => g.id !== groupId)
        const updatedUser: UserAuth = { ...prevUser!, adminGroups: filtredGroupAdmins, groups: filtredGroupMembers }
        setUserGroupsAdmins(updatedUser.adminGroups!)
        setUserGroupsMember(updatedUser.groups!)
        return updatedUser
      })
    }
  }

  if (loading) return ""

  return (
    <SectionTemplate section="Grupos">
      <ProfileSectionHeader
        onChange={ev => setSearch(ev.target.value)}
        placeholder="Pesquisar Por Nome"
        text="Pesquisar Grupos"
        value={search}
        margin={false}
      />
      <S.GroupContainer>
        {userGroupsAdmins.map(g => (
          <S.GroupCard key={`admins-${g.groupLink}`}>
            <S.GroupImageStatus>
              <S.GroupImg src={g.image ? g.image.url : "group_image.jpg"} />
              <S.UserContent>
                <Link replace href={`/groups/${g.groupLink}`}>{g.name}</Link>
              </S.UserContent>
            </S.GroupImageStatus>
            <S.GroupButtonsActions>
              <Link replace href={`/groups/${g.groupLink}/edit`}><S.ButtonAction>Editar</S.ButtonAction></Link>
              <S.ButtonAction onClick={() => quitGroup(g.id)}>Sair do grupo</S.ButtonAction>
            </S.GroupButtonsActions>
          </S.GroupCard>
        ))}
        {userGroupsMember.map(g => (
          <S.GroupCard key={`members-${g.groupLink}`}>
            <S.GroupImageStatus>
              <S.GroupImg src={g.image ? g.image.url : "group_image.jpg"} />
              <S.UserContent>
                <Link replace href={`/groups/${g.groupLink}`}>{g.name}</Link>
              </S.UserContent>
            </S.GroupImageStatus>
            <S.GroupButtonsActions>
              <S.ButtonAction onClick={() => quitGroup(g.id)}>Sair do grupo</S.ButtonAction>
            </S.GroupButtonsActions>
          </S.GroupCard>
        ))}
      </S.GroupContainer>
    </SectionTemplate>
  )
}

export default SocialGroups

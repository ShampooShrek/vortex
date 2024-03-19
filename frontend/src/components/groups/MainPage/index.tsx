"use client"

import { Group } from "@/models/dbModels"
import * as S from "./style"
import GroupHeader from "../groupHeader"
import GroupLeftContent from "./Contents/LeftContent"
import { Line } from "@/styles/global"
import GroupRightContent from "./Contents/RightContent"
import authHook from "@/data/hooks/authHook"
import { UserGroups } from "@/models/frontModels"

interface GroupMainPageProps {
  group: Group
  groupLink: string
  userGroups: UserGroups | null
}

const GroupMainPage = ({ group: {
  name,
  banner,
  image,
  description,
  header,
  membersLength,
  createdAt,
  type,
  gameRelation,
  id,
  users,
  admins
}, groupLink, userGroups }: GroupMainPageProps) => {

  const { user, loading } = authHook()

  let userHasInGroup = false;
  let userIsAdmin = false;

  if (!loading && user && userGroups) {
    userHasInGroup = (userGroups.groups.find(g => g.id === id) || userGroups.adminGroups.find(g => g.id === id)) ? true : false

    if (userHasInGroup) {
      userIsAdmin = userGroups.adminGroups.find(g => g.id === id) ? true : false
    }
  }


  return (
    <S.Container>
      <GroupHeader groupId={id} type={type} userInGroup={userHasInGroup} name={name} banner={banner} image={image} />
      <Line />
      <S.ContentContainer>
        <S.LeftContent>
          <GroupLeftContent description={description} header={header} name={name} />
        </S.LeftContent>
        <S.RightContent>
          <GroupRightContent
            users={users}
            admins={admins}
            groupLink={groupLink}
            userIsAdmin={userIsAdmin}
            userInGroup={userHasInGroup}
            associedGames={gameRelation}
            createdAt={createdAt}
            membersLength={membersLength}
            type={type}
          />
        </S.RightContent>
      </S.ContentContainer>
    </S.Container>
  )
}

export default GroupMainPage

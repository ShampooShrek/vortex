"use client"

import { useEffect } from "react"
import { Bar } from "@/styles/global"
import * as S from "./style"
import { Groups, OtherUsers } from "@/models/frontModels"
import { useRouter } from "next/navigation"
import Link from "next/link"
import authHook from "@/data/hooks/authHook"

interface ProfileContentProps {
  name: string
  number: number
  list?: {
    type: "Friends" | "Groups"
    content: (OtherUsers[] | Groups[])
  }
  bar?: boolean
  userId: string
}

const ProfileContent = ({ name, number, list, bar = true, userId }: ProfileContentProps) => {

  const router = useRouter()
  const { userStatus } = authHook()

  const RenderList = () => {
    if (list) {
      return (
        <>
          {list.content && list.content.length > 0 && list.content.map(e => {
            if ("nickname" in e) {
              const { id, image, nickname } = e as OtherUsers
              return (
                <S.List key={`${e.id}-user`}>
                  <Link replace href={`/profile/${id}`}>
                    <img src={image ? image.url : "/player.jpg"} />
                    <div>
                      <h4>{nickname}</h4>
                      <span>{userStatus(id)}</span>
                    </div>
                  </Link>
                </S.List>
              )
            } else {
              const { image, name, users, groupLink } = e as Groups
              return (
                <S.List key={`${e.id}-group`}>
                  <Link replace href={`/groups/${groupLink}`}>
                    <img src={image ? image.url : "/group_image.jpg"} />
                    <div>
                      <h4>{name}</h4>
                      {users.length > 0 && <span>{users.length}</span>}
                    </div>
                  </Link>
                </S.List>
              )
            }
          })}
        </>
      )
    }
  }

  return (
    <>
      <S.Container>
        <S.ContentContainer>
          <S.ContentName href={`/profile/${userId}/details`}>{name}:</S.ContentName>
          <S.ContentNumber>{number}</S.ContentNumber>
        </S.ContentContainer>
        {list && (
          <S.ContentList>
            <RenderList />
          </S.ContentList>
        )}
      </S.Container>
      {bar && <Bar className="bar" width="100%" height="1px" margin="20px auto 20px auto" />}

    </>
  )
}

export default ProfileContent

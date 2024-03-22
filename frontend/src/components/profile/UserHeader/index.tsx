"use client"

import { OtherUsers, Profile, SocialIdsRequestInterface, SocialRequestInterface, UserFriendsRequests } from "@/models/frontModels"
import Link from "next/link"

import * as S from "./style"
import { useState, useEffect } from "react"
import ApiRequest from "@/utils/ApiRequests"
import { FriendRequest, UserIdRequest } from "@/models/dbModels"
import messageAuth from "@/data/hooks/messageHook"

interface UserHeaderProps {
  user: UserIdRequest | null
  userRequest: Profile | OtherUsers
  social: SocialIdsRequestInterface | null
  userId: string
}

export default function UserHeader({ social: socialProps, user, userId, userRequest }: UserHeaderProps) {

  const { nickname, name, image } = userRequest

  const [social, setSocial] = useState(socialProps)

  const { showMessageBox } = messageAuth()

  const SendRequest = async () => {
    if (social) {
      const resp = await ApiRequest<UserFriendsRequests>(`/api/users/friends/requests/send_request/${userId}`, "post")

      if (resp) {
        if (resp.type === "success") {
          const updatedRequest = [...social.friendRequestsSent]
          updatedRequest.push(resp.response as UserFriendsRequests)
          setSocial(prev => ({ ...prev!, friendRequestsSent: updatedRequest }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const CancelRequest = async () => {
    if (social) {
      const request = social.friendRequestsSent.find(r => r.receiver.id === userId)!
      const resp = await ApiRequest(`/api/users/friends/requests/request_action/${request.id}`, "post", { status: "CANCELED" })

      if (resp) {
        if (resp.type === "success") {
          const updatedRequest = social.friendRequestsSent.filter(r => r.id !== request.id)
          setSocial(prev => ({ ...prev!, friendRequestsSent: updatedRequest }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const AcceptRequest = async () => {
    if (social) {
      const request = social.friendRequestsReceived.find(r => r.sender.id === userId)!
      const resp = await ApiRequest<OtherUsers>(`/api/users/friends/requests/request_action/${request.id}`, "post", { status: "ACCEPTED" })

      if (resp) {
        if (resp.type === "success") {
          const updatedRequest = social.friendRequestsReceived.filter(r => r.id !== request.id)
          const updatedFriends = [...social.friends]
          updatedFriends.push(resp.response as OtherUsers)
          setSocial(prev => ({ ...prev!, friendRequestsReceived: updatedRequest, friends: updatedFriends }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const RemoveFriend = async () => {
    if (social) {
      const resp = await ApiRequest(`/api/users/friends/remove_friend/${userId}`, "delete")

      if (resp) {
        if (resp.type === "success") {
          const updatedFriends = social.friends.filter(f => f.id !== userId)
          setSocial(prev => ({ ...prev!, friends: updatedFriends }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const BlockUser = async () => {
    if (social) {
      const friend = social.friends.find(f => f.id === userId)
      const resp = await ApiRequest(`/api/users/blocked_users/block/${userId}`, "post")

      if (resp) {
        if (resp.type === "success") {
          const updatedFriends = social.friends.filter(f => f.id !== userId)
          const updatedFriendsSenders = social.friendRequestsSent.filter(f => f.receiver.id !== userId)
          const updatedFriendsReceivers = social.friendRequestsReceived.filter(f => f.sender.id !== userId)
          const updatedBlocks = [...social.userBlocks]
          if (friend) {
            updatedBlocks.push(friend!)
          } else {
            updatedBlocks.push(userRequest as OtherUsers)
          }
          setSocial(prev => ({ ...prev!, friends: updatedFriends, userBlocks: updatedBlocks, friendRequestsReceived: updatedFriendsReceivers, friendRequestsSent: updatedFriendsSenders }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  const UnblockUser = async () => {
    if (social) {
      const resp = await ApiRequest(`/api/users/blocked_users/desblock/${userId}`, "post")

      if (resp) {
        if (resp.type === "success") {
          const updatedBlocks = social.userBlocks.filter(b => b.id !== userId)
          setSocial(prev => ({ ...prev!, userBlocks: updatedBlocks }))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }



  return (
    <S.UserHeaderContainer>
      <S.UserHeaderImageAside>
        <S.UserImageHeader src={image?.url ?? "/player.jpg"} />
        <S.UserHeaderContent>
          <S.UserNickname>{nickname}</S.UserNickname>
          <S.UserRealName>{name}</S.UserRealName>
        </S.UserHeaderContent>
      </S.UserHeaderImageAside>
      {user && (
        <S.UserHeaderActions>
          {user.id === userId ? (
            <S.ActionButtonLink replace href={`/profile/${userId}/edit`}>Editar</S.ActionButtonLink>
          ) : (
            <>
              {social
                && !social.friendRequestsReceived.some(f => f.sender.id === userId)
                && !social.friendRequestsSent.some(f => f.receiver.id === userId)
                && !social.friends.some(f => f.id === userId)
                && !social.userBlocks.some(u => u.id === userId)
                && !social.blockedByUsers.some(u => u.id === userId)
                && <S.ActionButton onClick={() => SendRequest()}>Enviar Pedido de Amizade</S.ActionButton>
              }

              {social && (social.userBlocks.some(u => u.id === userId) || social.blockedByUsers.some(u => u.id === userId)) && (
                <S.ActionButton style={{ opacity: 0.5, cursor: "auto" }} >Enviar Pedido de Amizade</S.ActionButton>
              )}

              {social && social.friendRequestsSent.some(f => f.receiver.id === userId)
                && <S.ActionButton onClick={() => CancelRequest()}>Cancelar pedido de amizade</S.ActionButton>}

              {social && social.friendRequestsReceived.some(f => f.sender.id === userId)
                && <S.ActionButton onClick={() => AcceptRequest()}>Aceitar pedido de amizade</S.ActionButton>}

              {social && social.friends.some(f => f.id === userId)
                && <S.ActionButtonLink replace href={"/chat"}>Mandar mensagem</S.ActionButtonLink>}

              {social && social.friends.some(f => f.id === userId)
                && <S.ActionButton onClick={() => RemoveFriend()}>Desfazer Amizade</S.ActionButton>}

              {social && social.userBlocks.some(b => b.id === userId)
                && <S.ActionButton onClick={() => UnblockUser()}>Desbloquear usuário</S.ActionButton>}

              {social && !social.userBlocks.some(b => b.id === userId)
                && <S.ActionButton onClick={() => BlockUser()}>Bloquar usuário</S.ActionButton>}
            </>
          )}
        </S.UserHeaderActions>
      )}
    </S.UserHeaderContainer>
  )
}

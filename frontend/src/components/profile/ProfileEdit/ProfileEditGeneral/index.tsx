"use client"

import SectionTemplate from "../../ProfileDetailsSocialsLayout/SectionTemplate"
import { ChangeEvent, use, useEffect, useState } from "react"
import ButtonsContainer from "../../../ButtonsContainer"
import api from "@/services/api"
import authHook from "@/data/hooks/authHook"
import { Response } from "@/models/frontModels"
import FormInput from "@/components/Inputs/FormInput"
import TextArea from "@/components/TextArea"
import { User } from "@/models/dbModels"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"

interface ProfileEditGeneralProps {
  nickname: string | null | undefined
  name: string | null | undefined
  description: string | null | undefined
  email: string | null | undefined
  age?: number | null | undefined
}

interface PutResponse {
  bio: string,
  nickname: string,
  age: number,
  name: string,
  email: string
}

interface ProfileEditGeneralProps2 {
  user: User
}

const ProfileEditGeneral: React.FC<ProfileEditGeneralProps2> = ({ user }) => {
  const { setUser } = authHook()
  const { showMessageBox } = messageAuth()
  
  const [inRequest, setInRequest] = useState(false)
  
  const [updateUser, setUpdateUser] = useState<ProfileEditGeneralProps>({
    description: user?.bio,
    email: user?.email,
    name: user?.name,
    nickname: user?.nickname,
  })

  const cancelEvent = () => {
    setUpdateUser({
      description: user?.bio,
      email: user?.email,
      name: user?.name,
      nickname: user?.nickname,
    })
  }

  const saveEvent = async () => {
    setInRequest(true)
    const response = await ApiRequest<PutResponse>(`/api/users/${user!.id}`, "put", { ...updateUser, bio: updateUser.description })
    if (response) {
      if(response.type === "success") {
        const data = response.response as PutResponse
        setUser(u => ({ ...u!, ...data as PutResponse }))
        showMessageBox("Usuário atualizado com sucesso!!", "success")
      } else {
        showMessageBox(response.response as string, "error")
      }
    }
    setInRequest(false)
  }
  
  const handleInput = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = ev.target.name
    setUpdateUser(u => ({ ...u, [target]: ev.target.value }))
  }
  
  
  return (
    <SectionTemplate section="Geral">
      <FormInput 
        label="Nome:" 
        onChange={handleInput} 
        value={updateUser.name ?? ""} 
        name="name" 
        type="text" 
      />

      <FormInput 
        label="Nickname:" 
        onChange={handleInput} 
        value={updateUser.nickname ?? ""} 
        name="nickname" 
        type="text" 
      />

      <FormInput 
        label="E-mail:" 
        onChange={handleInput} 
        value={updateUser.email ?? ""} 
        name="email" 
        type="text" 
      />

      <TextArea 
        label="Descrição:" 
        onChange={handleInput} 
        name="description" 
        value={updateUser.description ?? ""} 
      />
      
      <ButtonsContainer 
      cancelClick={cancelEvent} 
      saveClick={inRequest ? () => {} : saveEvent} 
      isLoading={inRequest}
      />
    </SectionTemplate>
  )
}

export default ProfileEditGeneral
"use client"

import { redirect, useRouter } from "next/navigation"

import authHook from "@/data/hooks/authHook"
import * as S from "./style"
import ConfirmEmailInputs from "@/components/auth/confirm_email"
import api from "@/services/api"
import { Response } from "@/models/frontModels"
import Link from "next/link"



const ConfirmEmail = () => {

  const router = useRouter()
  const { loading, user, setUser, logged } = authHook()

  if(loading) return ""

  if(user === null || user.confEmail) redirect("/home")

  const sendNewEmail = async () => {
    const response = await api.post(`/api/users/${user!.id}/send_new_email`)
    const data: Response<string> = response.data

    if(data.type === "success") {
      alert("qaaa")
    }
  } 

  const sendEmailCode = async (code: string) => {
    const response = await api.post(`/api/users/${user!.id}/confirm_email`, { code })
    const data: Response<string> = response.data
    
    if(data.type === "success") {
      setUser(prevUser => ({ ...prevUser!, confEmail: true }))
      router.push(`/home`)
    }
  }


  return (
    <S.Container>
      <S.CardContainer>
        <S.Card>
          <ConfirmEmailInputs sendCode={sendEmailCode} email={user!.email} />
        </S.Card>
        <S.SendNewEmailContent>
          <span>Não recebeu o código? <a onClick={sendNewEmail}>Reenvie o código </a> 
          ou <Link href={`/profile/${user!.id}/edit`}>atualize o e-mail</Link></span>
        </S.SendNewEmailContent>
      </S.CardContainer>
    </S.Container>

  )
}

export default ConfirmEmail
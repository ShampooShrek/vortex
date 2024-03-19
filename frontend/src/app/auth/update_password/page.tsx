"use client"

import { Layout } from "@/components/layout"
import { User } from "@/models/dbModels"
import ApiRequest from "@/utils/ApiRequests"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import * as S from "./style"
import FormInput from "@/components/Inputs/FormInput"
import messageAuth from "@/data/hooks/messageHook"
import Link from "next/link"



export default function UpdatePasswordPage() {

  const { showMessageBox } = messageAuth()

  const params = useSearchParams()
  const key = params.get("key")

  const [user, setUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const getUser = async () => {
      const resp = await ApiRequest<User>(`/api/users/recover_key/${key}`, "get")
      if(resp) {
        if(resp.type === "success") {
          setUser(resp.response as User)
        } else {
          showMessageBox(resp.response as string, "error", handleLinkClick)
        }
      }
    }
    getUser()
  }, [])

  const handleLinkClick = () => {
    if(linkRef.current) {
      linkRef.current.click()
    }
  }

  const handleFormClick = async () => {
    if(user && user.id) {
      const resp = await ApiRequest<string>("/api/users/password/update_password", "put", { key, userId: user.id, newPassword, confPassword })
      if(resp) {
        if(resp.type === "success") {
          showMessageBox(resp.response, "success", handleLinkClick)
        } else {
          showMessageBox(resp.response, "error")
        }
      }
    }
  }


  return (
    <Layout header={false} topBarUser={false} >
      <Link ref={linkRef} style={{ display: "none" }} href={"/auth/signIn"}></Link>
      <S.Container>
        <S.Card>
          <S.Title><h1>Atualizar Senha</h1></S.Title>
        <FormInput 
          type="password"
          value={newPassword}
          label="Nova Senha:"
          inputStyle={{ width: "100%" }}
          onChange={ev => setNewPassword(ev.target.value)}
        />
        <FormInput 
          type="password"
          value={confPassword}
          label="Confirmar Senha:"
          inputStyle={{ width: "100%" }}
          onChange={ev => setConfPassword(ev.target.value)}
        />
        <S.Button onClick={handleFormClick}>Atualizar Senha</S.Button>
        </S.Card>
      </S.Container>
    </Layout>
  )
}
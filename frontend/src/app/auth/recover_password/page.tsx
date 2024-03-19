"use client"

import { Layout } from "@/components/layout"
import { useRef, useState } from "react"

import * as S from "./style"
import FormInput from "@/components/Inputs/FormInput"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"
import Link from "next/link"



export default function UpdatePasswordPage() {
  const { showMessageBox } = messageAuth()

  const [email, setEmail] = useState("")
  const linkRef = useRef<HTMLAnchorElement>(null)

  const sendEmail = async () => {
    const resp = await ApiRequest<string>(`/api/users/recover/recover_password`, "post", { email })
    if (resp) {
      if (resp.type === "success") {
        showMessageBox(resp.response, "success", handleLinkClick)
      } else {
        showMessageBox(resp.response, "error")
      }
    }
  }

  const handleLinkClick = () => {
    if (linkRef.current) {
      linkRef.current.click()
    }
  }

  return (
    <Layout header={false} topBarUser={false} >
      <Link ref={linkRef} href={"/auth/signIn"} style={{ display: "none" }} ></Link>
      <S.Container>
        <S.Card>
          <S.Title><h1>Recuperar Senha</h1></S.Title>
          <S.Description>enviaremos um link do formulário pelo seu e-mail</S.Description>
          <FormInput
            type="email"
            value={email}
            label="Seu Email:"
            inputStyle={{ width: "100%" }}
            onChange={ev => setEmail(ev.target.value)}
          />
          <S.Button onClick={sendEmail}>Enviar</S.Button>
        </S.Card>
      </S.Container>
    </Layout>
  )
}

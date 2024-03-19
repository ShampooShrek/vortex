"use client"

import { getCookie } from "cookies-next"
import Link from "next/link"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Layout } from "@/components/layout"
import { useRouter } from "next/navigation"
import * as S from "./style"
import authHook from "@/data/hooks/authHook"
import messageAuth from "@/data/hooks/messageHook"

interface Login {
  name: string
  password: string
}

const SignIn = () => {
  const { login } = authHook()
  const router = useRouter()
  const { showMessageBox } = messageAuth()
  const [inRequest, setInRequest] = useState(false)
  const [user, setUser] = useState<Login>({ name: "", password: "" })
  const passwordRef = useRef<HTMLInputElement>(null)

  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const token = getCookie("vortex-auth-token")
    if (token) router.push("/home")
  }, [])

  const handleInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    setUser({ ...user, [name]: e.target.value })
  }

  const handleLogin = async () => {
    setInRequest(true)
    const resp = await login(user.name, user.password)
    if (typeof resp === "string") {
      showMessageBox(resp, "error")
      setInRequest(false)
    } else {
      window.location.href = "/search/games"
    }
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    const name = ev.currentTarget.name
    if (key === "Enter") {
      if (name === "name" && passwordRef.current) {
        if (passwordRef.current.value !== "") {
          handleLogin()
        } else {
          passwordRef.current.focus()
        }
      } else if (name === "password") {
        handleLogin()
      }
    }
  }

  return (
    <Layout topBarUser={false} header={false} topbar={true} >
      <S.Container>
        <Link ref={linkRef} replace href={"/home"} style={{ display: "none" }} />
        <S.ContainerCard>
          <S.ContainerLogo>
            <img src="/logo.png" alt="logo" />
          </S.ContainerLogo>
          <S.ContainerForm>
            <h1>Login</h1>
            <S.ContainerFormInputs>
              <S.ContainerFormInput>
                <label>Nickname | E-mail: </label>
                <input onKeyDown={handleKeyDown} name="name" onChange={handleInputLogin} type="text" />
              </S.ContainerFormInput>
              <S.ContainerFormInput>
                <label>Senha: </label>
                <input onKeyDown={handleKeyDown} ref={passwordRef} type="password" name="password" onChange={handleInputLogin} />
                <Link href={"/auth/recover_password"}>Esqueceu a senha?</Link>
              </S.ContainerFormInput>
            </S.ContainerFormInputs>
            <S.ContainerFormButton onClick={() => inRequest ? {} : handleLogin()}>{inRequest ? <img src="/loading.gif" /> : "Logar"}</S.ContainerFormButton>
            <S.ContainerFormLinkSignUp>
              <p>Não tem uma conta? <Link href={"/auth/signUp"}>Cadastre-se!</Link></p>
            </S.ContainerFormLinkSignUp>
          </S.ContainerForm>
        </S.ContainerCard>
      </S.Container>
    </Layout>
  )
}


export default SignIn

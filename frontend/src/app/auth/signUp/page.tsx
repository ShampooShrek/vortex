"use client"

import Link from "next/link"
import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, RefObject, useEffect, useRef, useState } from "react"
import { Layout } from "@/components/layout"
import * as S from "./style"
import SignUpInputs from "./inputs"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import ApiRequest from "@/utils/ApiRequests"
import { User } from "@/models/dbModels"
import messageAuth from "@/data/hooks/messageHook"


interface Register {
  name: string
  email: string
  password: string
  nickname: string
  confPassword: string
}

interface InputRefs {
  name: RefObject<HTMLInputElement>;
  password: RefObject<HTMLInputElement>;
  confPassword: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  nickname: RefObject<HTMLInputElement>;
}

const SignUp = () => {
  const router = useRouter()

  const { showMessageBox } = messageAuth()

  const [register, setRegister] = useState<Register>({
    name: "", password: "", confPassword: "", email: "", nickname: ""
  })

  const [activedInputs, setActivedInputs] = useState({
    name: true, password: false, confPassword: false, email: false, nickname: false
  })

  useEffect(() => {
    const token = getCookie("vortex-auth-token")
    if (token) router.push("/home")
  }, [])


  const inputRefs: InputRefs = {
    name: useRef<HTMLInputElement>(null),
    nickname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confPassword: useRef<HTMLInputElement>(null),
  }

  const [focusInput, setFocusInput] = useState("")
  const [signUpButton, setSignUpButton] = useState(false)
  const [typePassword, setTypePassword] = useState<"text" | "password">("password")
  const [typeConfPassword, setTypeConfPassword] = useState<"text" | "password">("password")

  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleInputRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    setRegister({ ...register, [name]: e.target.value })
  }

  const handleFocusInput = (name: string) => {
    setFocusInput(name)
  }

  const handleNextButtonClick = (name: (keyof InputRefs)) => {
    setActivedInputs({ ...activedInputs, [name]: true })

    setTimeout(() => {
      if (inputRefs[name].current) {
        inputRefs[name].current?.focus()
      }
    }, 1)
  }


  const verifyPasswords = async () => {
    if (register.confPassword !== register.password) {
      alert("senhas não conferem")
    } else {
      setSignUpButton(true)
      setFocusInput("")

      const response = await ApiRequest<User>("/api/users", "post", {
        ...register
      })

      if (response) {
        if (response?.type === "success") {
          showMessageBox("Usuário registrado com sucesso!", "success", handleAnchorClick)
        } else {
          showMessageBox(response.response as string, "error")
        }

      }
    }
  }

  const handleAnchorClick = () => {
    if (linkRef.current) linkRef.current.click()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>,
    name: (keyof InputRefs) | "verify") => {
    if (e.key === "Enter" && name !== "verify") {
      handleNextButtonClick(name)
    } else if (e.key === "Enter" && name === "verify") {
      verifyPasswords()
    }
  }

  return (
    <Layout topBarUser={false} header={false} topbar={true}>
      <Link ref={linkRef} href={"/auth/confirm_email"} style={{ display: "none" }}></Link>
      <S.Container>
        <h3>Já tem uma conta? <Link href="/auth/signIn">faça login!!</Link></h3>
        <S.ContainerCard>
          <S.ContainerForm>
            <h1>Register</h1>
            <S.ContainerFormInputs>
              <SignUpInputs isActive={activedInputs.name}
                ref={inputRefs.name}
                label="Nome: "
                inputName="name" onFocus={() => handleFocusInput("name")}
                onClick={() => handleNextButtonClick("nickname")}
                onKeyDown={(e) => handleKeyDown(e, "nickname")}
                onChange={handleInputRegister} inputType="text"
                renderButton={focusInput === "name"}
              />
              <SignUpInputs isActive={activedInputs.nickname}
                ref={inputRefs.nickname}
                label="Nickname: "
                inputName="nickname" onFocus={() => handleFocusInput("nickname")}
                onClick={() => handleNextButtonClick("email")}
                onKeyDown={(e) => handleKeyDown(e, "email")}
                onChange={handleInputRegister} inputType="text"
                renderButton={focusInput === "nickname"}
              />
              <SignUpInputs isActive={activedInputs.email}
                ref={inputRefs.email}
                label="E-mail: "
                inputName="email" onFocus={() => handleFocusInput("email")}
                onClick={() => handleNextButtonClick("password")}
                onKeyDown={(e) => handleKeyDown(e, "password")}
                onChange={handleInputRegister} inputType="text"
                renderButton={focusInput === "email"}
              />
              <SignUpInputs isActive={activedInputs.password}
                chooseType={() => setTypePassword(typePassword === "password" ? "text" : "password")}
                ref={inputRefs.password}
                label="Senha: "
                onClick={() => handleNextButtonClick("confPassword")}
                onKeyDown={(e) => handleKeyDown(e, "confPassword")}
                inputName="password" onFocus={() => handleFocusInput("password")}
                onChange={handleInputRegister} inputType={typePassword}
                renderButton={focusInput === "password"}
              />
              <SignUpInputs isActive={activedInputs.confPassword}
                chooseType={() => setTypeConfPassword(typeConfPassword === "password" ? "text" : "password")}
                onKeyDown={(e) => handleKeyDown(e, "verify")}
                ref={inputRefs.confPassword}
                label="Confirme a senha: "
                onClick={verifyPasswords}
                inputName="confPassword" onFocus={() => handleFocusInput("confPassword")}
                onChange={handleInputRegister} inputType={typeConfPassword}
                renderButton={focusInput === "confPassword"}
              />

            </S.ContainerFormInputs>
            <S.ContainerFormButton isActived={signUpButton}>Criar a Conta!</S.ContainerFormButton>
          </S.ContainerForm>
        </S.ContainerCard>
      </S.Container>
    </Layout>
  )
}


export default SignUp

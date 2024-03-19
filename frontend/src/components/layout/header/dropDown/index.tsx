"use client"

import authHook from "@/data/hooks/authHook";
import * as S from "./style";
import Link from "next/link";

interface DropDownProps {
  isLogged?: boolean
  isActived: boolean
  userId?: string
  isAdmin?: boolean
}

export function DropDown({ isActived = false, isLogged, userId, isAdmin }: DropDownProps) {
  const { logout } = authHook()
  return (
    <S.Container isActived={isActived}>
      <S.List>
        {isLogged ? (
          <>
          <Link replace href={`/profile/${userId}`} >Perfil</Link>
          <Link replace href={`/profile/${userId}/social`}>Social</Link>
          <Link replace href={`/transactions`}>Transações</Link>
          <Link replace href={`/publisher`}>Publicar</Link>
          {isAdmin &&    <Link replace href={`/admin`}>Administrador</Link>}
          <S.AppLink>Baixar APP</S.AppLink>
          <a onClick={logout}>Sair</a>
          </>
        ) : (
          <>
            <Link replace href={`/auth/signIn`} >Entrar</Link>
            <Link replace href={`/auth/signUp`} >Registrar-se</Link>
          </>
        )}
      </S.List>
    </S.Container>
  )
}

"use client"

import { useEffect, useState } from "react"
import { DropDown } from "../header/dropDown"
import { useRouter } from "next/navigation"
import * as S from "./style"
import authHook from "@/data/hooks/authHook"

function TopBar({ userDiv }: { userDiv: boolean }) {

  const [dropDown, setDropDown] = useState<boolean>(false)
  const router = useRouter()
  const { user, logged, loading } = authHook()

  return (
    <S.TopBar>
      <S.Logo onClick={() => router.push("/home")}>VORTEX</S.Logo>
      {!loading && (
        <S.RightDiv>
          {userDiv && (
            <S.RightItem onClick={() => setDropDown(prev => !prev)} onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}
              itemWidth="180px">
              <span>{user ? user?.nickname : "Conta"}</span>
              <DropDown isAdmin={user?.isAdm} isLogged={logged} userId={user?.id ?? ""} isActived={dropDown} />
            </S.RightItem >
          )}
          <S.RightItem button={true} itemWidth="140px">
            <span>Baixar APP</span>
          </S.RightItem>
        </S.RightDiv>
      )}
    </S.TopBar>
  )
}

export default TopBar
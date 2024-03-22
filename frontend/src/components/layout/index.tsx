"use client"

import { Header } from "@/components/layout/header"
import { ReactNode, useEffect } from "react"
import { Main } from "./main";
import TopBar from "./topBar";
import authHook from "@/data/hooks/authHook";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { User } from "@/models/dbModels";
import { UserAuth } from "@/models/frontModels";

interface LayoutProps {
  topBarUser?: boolean;
  topbar?: boolean
  header?: boolean
  children: ReactNode
  needConfirmEmail?: boolean
  mainMargin?: boolean
}

export function Layout({ children, header = true, topbar = true, topBarUser = true, needConfirmEmail = false, mainMargin = true }: LayoutProps) {

  const queryClient = new QueryClient()

  const { loading, setUser, user } = authHook()
  const router = useRouter()


  useEffect(() => {
    if (!loading && user !== null) {
      if (!user.confEmail && needConfirmEmail) {
        router.push("/auth/confirm_email")
      }
    }
  }, [loading, user])

  if (loading) return <></>

  return (
    <QueryClientProvider client={queryClient}>
      {topbar && (<TopBar userDiv={topBarUser} />)}
      {header && (<Header />)}
      <Main mainMargin={mainMargin}>{children}</Main>
    </QueryClientProvider>
  )
}

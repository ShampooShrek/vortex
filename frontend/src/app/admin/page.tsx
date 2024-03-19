import Admin from "@/components/Admin"
import { Layout } from "@/components/layout"
import { UserAuth } from "@/models/frontModels"
import { GetAdminCoisas, GetUserByToken } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const useCookies = cookies()
  const token = useCookies.get('vortex-auth-token')
  let user: UserAuth | null = null

  if (!token) redirect("/home")

  const resp: UserAuth | string = await GetUserByToken(token.value)
  if (typeof resp !== "string") user = resp as UserAuth

  if (!user || !user.isAdm) redirect("/home")

  const adminData = await GetAdminCoisas(token!.value)

  if (typeof adminData === "string") redirect("/home")


  return (
    <Layout needConfirmEmail>
      {/* @ts-ignore */}
      <Admin pendingGames={adminData.games} />
    </Layout>
  )

}

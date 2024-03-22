import Admin from "@/components/Admin"
import { Layout } from "@/components/layout"
import { GetAdminData } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const useCookies = cookies()
  const token = useCookies.get('vortex-auth-token')
  if (!token) redirect("/home")

  const adminData = await GetAdminData(token!.value)

  if (typeof adminData === "string") redirect("/home")


  return (
    <Layout needConfirmEmail>
      {/* @ts-ignore */}
      <Admin pendingGames={adminData.games} />
    </Layout>
  )

}

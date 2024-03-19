import Chat from "@/components/Chat";
import { Layout } from "@/components/layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export default async function ChatPage() {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  if(!token) redirect("/home")

  return (
    <Layout mainMargin={false} header={false}>
      <Chat />
    </Layout>
  )
}
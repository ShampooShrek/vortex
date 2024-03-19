import { Layout } from "@/components/layout"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import CreateGroupForm from "@/components/groups/CreateGroupForm"


const CreateGroup = async () => {
  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")
  if(!token) redirect("/home")

  return (
    <Layout needConfirmEmail>
      <CreateGroupForm />
    </Layout>
  )
}

export default CreateGroup
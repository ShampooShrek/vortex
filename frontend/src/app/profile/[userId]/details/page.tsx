import { Layout } from "@/components/layout"
import DetailsContentContainer from "@/components/profile/details/DetailsContentContainer"
import DetailsHeader from "@/components/profile/DetailsHeader"
import { GetUserDetails } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface UserDetailsProps {
  params: {
    userId: string
  }
}

const UserDedails = async ({ params: { userId } }: UserDetailsProps) => {
  const useCookies = cookies()
  
  const token = useCookies.get("vortex-auth-token")

  const user = await GetUserDetails(userId, token?.value ?? null)

  if(typeof user === "string") redirect("/home")

  return (
    <Layout needConfirmEmail>
      <DetailsHeader sections={["Detalhes"]} id={userId} image={user.user.image} nickname={user.user.nickname}/>
      <DetailsContentContainer details={user} /> 
    </Layout>
  )
}

export default UserDedails
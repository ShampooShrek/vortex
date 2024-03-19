import SearchUsers from "@/components/Search/Users";
import { Layout } from "@/components/layout";
import { cookies } from "next/headers";
import { SocialRequest } from "@/utils/ApiRequests"


export default async function SearchUsersPage() {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  let data = null;

  if(token) {
    data = await SocialRequest(token.value)
  }

  return (
    <Layout>
      <SearchUsers  data={data} />
    </Layout>
  )
}
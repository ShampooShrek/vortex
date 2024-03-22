import { Layout } from "@/components/layout";
import { cookies } from "next/headers";
import { SocialIdsRequest } from "@/utils/ApiRequests"
import SearchGroups from "@/components/Search/Groups";


export default async function SearchGroupsPage() {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  let data = null;

  if (token) {
    data = await SocialIdsRequest(token.value)
  }

  return (
    <Layout>
      <SearchGroups data={data} />
    </Layout>
  )
}

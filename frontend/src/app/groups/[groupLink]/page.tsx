import GroupMainPage from "@/components/groups/MainPage"
import { Layout } from "@/components/layout"
import { Group } from "@/models/dbModels"
import { UserGroups } from "@/models/frontModels"
import { GetGroup, GetGroups } from "@/utils/ApiRequests"
import { cookies } from "next/headers"

interface GroupProps {
  params: { groupLink: string }
}

const Group = async ({ params: { groupLink } }: GroupProps) => {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")
  let userGroups: UserGroups | null = null
  if (token) {
    const groups = await GetGroups(token.value)
    if (typeof groups !== "string") userGroups = groups
  }

  const group: Group | string = await GetGroup(groupLink)

  if (typeof group === "string") return <h1>error</h1>

  return (
    <Layout>
      <GroupMainPage userGroups={userGroups} groupLink={groupLink} group={group} />
    </Layout>
  )
}

export default Group

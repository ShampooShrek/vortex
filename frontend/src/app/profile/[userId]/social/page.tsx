import { Layout } from "@/components/layout"
import ProfileLayout from "@/components/profile/ProfileDetailsSocialsLayout"
import SocialGroups from "@/components/profile/Social/Groups/Group"
import SocialGroupsRequests from "@/components/profile/Social/Groups/Requests"
import BlockedUsers from "@/components/profile/Social/Users/BlockedUsers"
import Friends from "@/components/profile/Social/Users/Friends"
import PendingEnvites from "@/components/profile/Social/Users/PendingEnvites"
import { SocialRequestInterface } from "@/models/frontModels"
import { GetUserByToken, SocialRequest } from "@/utils/ApiRequests"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface SocialProps {
  params: { userId: string }
}

type Sections = {
  title: string
  sections: {
    name: string
    sectionName: string
    component?: React.ReactElement<any>
    link?: string
  }[]
}


const Social = async ({ params: { userId } }: SocialProps) => {
  const cookiesStore = cookies()
  const token = cookiesStore.get("vortex-auth-token")
  if (token?.value) {
    const data = await GetUserByToken(token.value)
    if (typeof data === "string" || data.id !== userId)
      redirect(`/profile/${userId}`)
  } else {
    redirect(`/profile/${userId}`)
  }

  const socialDataResponse = await SocialRequest(token.value)

  if (typeof socialDataResponse === "string") redirect(`/profile/${userId}`)

  const { adminGroups, userBlocks, friendRequestsReceived, friendRequestsSent, friends, groupRequests, groups }
    = socialDataResponse as SocialRequestInterface

  const sections: Sections[] = [
    {
      title: "Usuários", sections: [
        { name: "Amigos", sectionName: "friends", component: <Friends friends={friends} /> },
        { name: "Adicionar Amigo", sectionName: "addFriend", link: "/search/users" },
        {
          name: "Pedidos Pendentes", sectionName: "pendingEnvites",
          component: <PendingEnvites receivers={friendRequestsReceived} senders={friendRequestsSent} />
        },
        { name: "Bloqueados", sectionName: "blockedUsers", component: <BlockedUsers blockedusers={userBlocks} /> },
      ]
    },
    {
      title: "Grupos", sections: [
        { name: "Grupos", sectionName: "groups", component: <SocialGroups adminGroups={adminGroups} groups={groups} /> },
        { name: "Convites Pendentes", sectionName: "groupEnvites", component: <SocialGroupsRequests groupRequests={groupRequests} /> },
        { name: "Procurar Grupos", sectionName: "searchGroups", link: "/search/groups" },
        { name: "Criar Grupo...", sectionName: "createGroup", link: "/create/create_group" },
      ]
    }
  ]

  return (
    <Layout>
      <ProfileLayout sections={sections} userId={userId} socialData={socialDataResponse} headerSections={["social"]} />
    </Layout>
  )
}

export default Social

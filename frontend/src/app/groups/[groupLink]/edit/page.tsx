import EditGroupForm from "@/components/groups/Edit/EditGroupForm"
import { Group, User } from "@/models/dbModels"
import { GetGroup, GetUserByToken } from "@/utils/ApiRequests"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Layout } from "@/components/layout"
import GroupHeader, { GroupHeaderEdit } from "@/components/groups/groupHeader"
import EditGroup from "@/components/groups/Edit"
import ButtonsContainer from "@/components/ButtonsContainer"
import TopBar from "@/components/layout/topBar"
import MembersManagement from "@/components/groups/Edit/MembersManagement"
import BansManagement from "@/components/groups/Edit/BansManagement"
import GroupHistoric from "@/components/groups/Edit/groupHistoric"
import RequestManagement from "@/components/groups/Edit/RequestsManagement"
import { EditIcon, AddMemberIcon, MembersManagementIcon, UserIcon, PastIcon, PlusIcon, RemoveUserIcon, BlockUserIcon } from "@/components/Icons"
import RemoveUsers from "@/components/groups/Edit/RemoveMembers"
import { Groups } from "@/models/frontModels"

interface GroupEditProps {
  params: { groupLink: string }
}

interface GroupComponents {
  section: string
  sectionIcon: React.ReactElement
  component: React.ReactElement<any>  
}

const GroupEdit = async ({ params: { groupLink } }: GroupEditProps) => {
  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")
  if(!token) redirect("/home")

  const userPromise = GetUserByToken(token.value)
  const groupPromise = GetGroup(groupLink)

  const [user, group]: [User | string, Groups | string] = await Promise.all([userPromise, groupPromise])

  if(typeof user === "string" || typeof group === "string") redirect("/home")

  const userHavePermission = group.admins.find(u => u.id === user.id)

  if(!userHavePermission) redirect(`/home`)

  
  if(typeof group === "string") return <h1>error</h1>

  const userInGroup = [...group.admins, ...group.users].find(u => u.id === user.id) ? true : false

  if(!userInGroup) redirect("/home")

  const components: GroupComponents[] = [
    { section: "Editar", sectionIcon: <EditIcon />, component: <EditGroupForm group={group} groupLink={groupLink} /> },
    { section: "Gerenciar Membros", sectionIcon: <MembersManagementIcon/>, component: <MembersManagement group={group} /> },
    { section: "Remover Membros", sectionIcon: <RemoveUserIcon/>, component: <RemoveUsers group={group} /> },
    { section: "Histórico do Grupo", sectionIcon: <PastIcon />, component: <GroupHistoric group={group} /> },
    { section: `Solicitação de Participação`, sectionIcon: <PlusIcon />,
      component: <RequestManagement group={group}/> },
  ]

  return (
    <Layout>
      <EditGroup group={group} components={components} />
    </Layout>
  )

}

export default GroupEdit
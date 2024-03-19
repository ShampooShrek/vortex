import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Layout } from "@/components/layout"
import { EditRequest, GetUserByToken } from "@/utils/ApiRequests"
import ProfileLayout from "@/components/profile/ProfileDetailsSocialsLayout"
import ProfileEditGeneral from "@/components/profile/ProfileEdit/ProfileEditGeneral"
import ProfileImage from "@/components/profile/ProfileEdit/ProfileImage"
import FavoriteGames from "@/components/profile/ProfileEdit/FavoriteGames"
import EditPrivacity from "@/components/profile/ProfileEdit/Privacy"
import { Edit } from "@/models/frontModels"

interface ProfileEditProps {
  params: { userId: string }
}

type Sections = {
  title: string
  sections: {
    name: string
    sectionName: string
    component: React.ReactElement<any>
  }[]
}


const Social = async ({ params: { userId } }: ProfileEditProps) => {
  const cookiesStore = cookies()
  const token = cookiesStore.get("vortex-auth-token")
  if (token?.value) {
    const data = await GetUserByToken(token.value)
    if (typeof data === "string" || data.id !== userId)
      redirect(`/profile/${userId}`)
  } else {
    redirect(`/home`)
  }

  const userEditResponse = await EditRequest(token.value)

  if (typeof userEditResponse === "string") redirect("/home")

  const user = userEditResponse as Edit

  const sections: Sections[] = [
    {
      title: "Geral", sections: [
        { name: "Usuário", sectionName: "user", component: <ProfileEditGeneral user={user} /> },
        { name: "Foto de Perfil", sectionName: "perfilImage", component: <ProfileImage image={user.image} /> },
        { name: "Jogos Favoritos", sectionName: "favoriteGames", component: <FavoriteGames favoriteGames={user.favorites} games={user.games} /> },
        { name: "Privacidade", sectionName: "privacity", component: <EditPrivacity privacity={user.privacity} /> },
      ]
    }
    // { name: "Grupo Favorito", section: "favoriteGroups" },
  ]

  return (
    <Layout>
      <ProfileLayout sections={sections} userId={userId} headerSections={["editar"]} />
    </Layout>
  )
}

export default Social

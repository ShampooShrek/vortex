import { Layout } from "@/components/layout"
import * as S from "./style"
import { ProfileCardContainer, ProfileFavoriteContainer } from "@/components/profile/MainPage/ProfileCardContainer"
import ProfileAside from "@/components/profile/MainPage"
import ProfileAvaliation from "@/components/profile/MainPage/ProfileAvaliation"
import { Line } from "@/styles/global"
import ProfileGroupContainer from "@/components/profile/MainPage/ProfileGroupContent"
import { Profile, Response, SocialRequestInterface, UserAuth } from "@/models/frontModels"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import * as ApiRequests from "@/utils/ApiRequests"
import Link from "next/link"
import UserHeader from "@/components/profile/UserHeader"

interface ProfileProps {
  params: { userId: string }
}


const Profile = async ({ params: { userId } }: ProfileProps) => {

  const useCookies = cookies()
  const token = useCookies.get('vortex-auth-token')
  let user: UserAuth | null = null
  let social: SocialRequestInterface | null = null

  if (token) {
    const resp: UserAuth | string = await ApiRequests.GetUserByToken(token.value)
    if (typeof resp !== "string") {
      user = resp as UserAuth
      const socialResponse = await ApiRequests.SocialRequest(token.value)
      if (typeof socialResponse !== "string") {
        social = socialResponse
      }
    }
  }

  const userRequest: Response<Profile> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    cache: "no-store",
    headers: {
      'authorization': token ? `Bearer ${token.value}` : ""
    }
  }).then(resp => resp.json())

  if (typeof userRequest.response === "string") redirect("/home")

  const { games, groups: userGroups, friends, favorites, wishList, nickname, image, name, gamesAvaliations, userAchievements, adminGroups, privacity, id }
    = userRequest.response as Profile

  const groups = [...adminGroups ?? [], ...userGroups ?? []]

  return (
    <Layout header={true} topBarUser={true} topbar={true}>
      <S.Container>
        <UserHeader userRequest={userRequest.response} social={social} user={user} userId={userId} />
        <Line />
        <S.Content>
          {(privacity.friendList === "PRIVATE" && privacity.gamesPrivacy === "PRIVATE" && privacity.groupList === "PRIVATE" && user && user.id !== id) ? (
            <h1>Esse Perfil é privado</h1>
          ) : (
            <>
              <S.ProfileContent>
                {games && games.length > 0 && <ProfileCardContainer userAchievements={userAchievements!} games={games!} title="Últimas Atividades:" />}
                {favorites && favorites.length > 0 && <ProfileFavoriteContainer userAchievements={userAchievements!} game={favorites![0]} />}
                {groups && groups.length > 0 && <ProfileGroupContainer group={groups[0]} />}
                {gamesAvaliations && gamesAvaliations.length > 0 && <ProfileAvaliation avaliations={gamesAvaliations} />}
              </S.ProfileContent>
              <ProfileAside
                userId={userId}
                wishListQtd={wishList?.length}
                achievementsQtd={userAchievements?.length}
                avaliationsQtd={gamesAvaliations?.length}
                favoritesQtd={favorites?.length}
                friends={friends}
                gamesQtd={games?.length}
                group={groups}
              />
            </>
          )}
        </S.Content>
      </S.Container>
    </Layout>
  )
}

export default Profile

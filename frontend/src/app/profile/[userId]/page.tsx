import { Layout } from "@/components/layout"
import * as S from "./style"
import { ProfileCardContainer, ProfileFavoriteContainer } from "@/components/profile/MainPage/ProfileCardContainer"
import ProfileAside from "@/components/profile/MainPage"
import ProfileAvaliation from "@/components/profile/MainPage/ProfileAvaliation"
import { Line } from "@/styles/global"
import ProfileGroupContainer from "@/components/profile/MainPage/ProfileGroupContent"
import { Profile, Response, SocialRequestInterface, UserAuth, UserFriendsRequests } from "@/models/frontModels"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import * as ApiRequests from "@/utils/ApiRequests"
import UserHeader from "@/components/profile/UserHeader"
import { UserIdRequest } from "@/models/dbModels"

interface ProfileProps {
  params: { userId: string }
}


const Profile = async ({ params: { userId } }: ProfileProps) => {

  const useCookies = cookies()
  const token = useCookies.get('vortex-auth-token')

  const promises: Promise<any>[] = []

  if (token) {
    promises.push(ApiRequests.GetIdByToken(token.value))
    promises.push(ApiRequests.SocialIdsRequest(token.value))
  } else {
    promises.push(new Promise((res) => res(null)))
    promises.push(new Promise((res) => res(null)))
  }

  const userFetch: Promise<Response<Profile | string>> = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    cache: "no-store",
    headers: {
      'authorization': token ? `Bearer ${token.value}` : ""
    }
  }).then(resp => resp.json())

  promises.push(userFetch)

  let [userResp, socialResp, userRequest] = await Promise.all(promises)

  let user: UserIdRequest | null = null
  let social: SocialRequestInterface | null = null

  if (userResp && typeof userResp !== "string") {
    if (socialResp && typeof socialResp !== "string") {
      user = userResp as UserAuth
      social = socialResp
    }
  }

  if (typeof userRequest.response === "string") {
    let requests = 0
    while (typeof userRequest.response === "string" && requests < 5) {
      requests++
      userRequest = await promises[2]
    }
    if (requests >= 5 && typeof userRequest.response === "string") {
      redirect("/home")
    }
  }

  const { games, groups: userGroups, friends, favorites, wishList, gamesAvaliations, userAchievements, adminGroups, privacity, id }
    = userRequest.response as Profile
  console.log(userRequest.response)

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

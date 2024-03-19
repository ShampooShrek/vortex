"use client"

import { Groups, OtherUsers } from "@/models/frontModels"
import ProfileContent from "./ProfileContent"
import * as S from "./style"
import authHook from "@/data/hooks/authHook"

type ProfileAsideProps = {
  friends?: OtherUsers[]
  group?: Groups[]
  gamesQtd?: number
  avaliationsQtd?: number
  achievementsQtd?: number
  favoritesQtd?: number
  wishListQtd?: number
  userId: string
} 


const ProfileAside = ({ achievementsQtd =0, avaliationsQtd =0, favoritesQtd =0, gamesQtd = 0, 
friends, group, wishListQtd =0, userId}
  :ProfileAsideProps) => {

    const { userStatus } = authHook()

  return (
    <S.AsideContent>
      <S.AsideStatus>{userStatus(userId)}</S.AsideStatus>
      <S.AsideContentContainer>
        { gamesQtd > 0 && <ProfileContent userId={userId}  name="Jogos" number={gamesQtd!} />}
        { favoritesQtd > 0 && <ProfileContent userId={userId} name="Favoritos" number={favoritesQtd!}/>}
        { wishListQtd > 0 && <ProfileContent userId={userId} name="Lista de Desejos" number={wishListQtd!} /> }
        { achievementsQtd > 0 && <ProfileContent userId={userId} name="Conquistas" number={achievementsQtd!} /> }
        { avaliationsQtd > 0 && <ProfileContent userId={userId} name="Avaliações" number={avaliationsQtd!} /> }
        { group && group.length > 0 && <ProfileContent userId={userId} list={{ content: group!, type: "Groups" }} name="Grupos" number={group.length} /> }
        { (friends && friends.length > 0) && <ProfileContent userId={userId} bar={false} list={{ content: friends!, type: "Friends" }} name="Amigos" number={friends.length!} /> }
      </S.AsideContentContainer>
    </S.AsideContent>
  )
}

export default ProfileAside
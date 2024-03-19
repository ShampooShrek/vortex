import { Groups } from "@/models/frontModels"
import ProfileContentContainer from "../ProfileContentContainer"
import * as S from "./style"


interface ProfileGroupContainerProps {
  group: Groups
}

const ProfileGroupContainer = ({ group: { name, image, users, type } }: ProfileGroupContainerProps) => {

  return (
    <ProfileContentContainer title="Grupo Preferido: ">
      <S.Container>
        <S.Image> <img src={image ? image.url : "/groupImage.jpg"} /></S.Image>
        <S.Content>
          <S.HeaderContent>
            <S.GroupTitle>
              <S.ImageTitle> <img src={image ? image.url : "/groupImage.jpg"} /></S.ImageTitle>
              <h3>{name}</h3><span>- {type === "PRIVATE" ? "grupo privado" : "grupo publico"}</span>
            </S.GroupTitle>
          </S.HeaderContent>
        </S.Content>
      </S.Container>
    </ProfileContentContainer>
  )
}

export default ProfileGroupContainer

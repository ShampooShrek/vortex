import * as S from "./style"

interface ProfileContentContainerProps {
  title: string
  children: React.ReactNode
}

const ProfileContentContainer = ({ children, title }: ProfileContentContainerProps) => {

  return (
    <>
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.CardContainer>
        {children}
      </S.CardContainer>
    </>
  )
}

export default ProfileContentContainer
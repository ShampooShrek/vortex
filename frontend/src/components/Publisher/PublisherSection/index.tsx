import * as S from "./style"

interface PublisherSection {
  title: string
  children: React.ReactNode
}

export const PublisherSection = ({ children, title }: PublisherSection ) => {
  return (
    <S.Container>
      <S.SectionTitleContainer>
        <S.SectionTitle>{title}</S.SectionTitle>
        <S.SectionLine />
      </S.SectionTitleContainer>
      {children}
    </S.Container>
  )
}

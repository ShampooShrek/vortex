
import * as S from "./style"

interface PublisherEditTemplateProps {
  headerText: string
  children: React.ReactNode
  isRendering: boolean
}

const PublisherEditTemplate = ({ headerText, children, isRendering }: PublisherEditTemplateProps) => {

  return (
    <S.Container isRendering={isRendering} >
      <S.HeaderEdit>
        <span>{headerText}</span>
      </S.HeaderEdit>
      <div>{children}</div>
    </S.Container>
  )
}

interface PublisherEditSectionTemplate {
  title?: string
  children: React.ReactNode
}

export const PublisherEditSectionTemplate = ({ children, title }: PublisherEditSectionTemplate) => {

  return (
    <S.Sections>
      {title && (
        <>
          <S.SectionTitle>{title}</S.SectionTitle>
          <S.SectionLine></S.SectionLine>
        </>
      )}
      <S.SectionContent>
        {children}
      </S.SectionContent>
    </S.Sections>
  )
}

export default PublisherEditTemplate
import * as S from "./style"

interface PublisherEditTextBox {
  sections: {
    title: string
    content: string
  }[]
}

const PublisherEditTextBox = ({ sections }: PublisherEditTextBox) => {

  return (
    <S.Box>
      {sections.map((section, i) => (
        <S.Section key={`section-${section.title}-${i}`} >
          <S.SectionName>
            <span>{section.title}</span>
          </S.SectionName>
          <S.SectionContent>
            <span>{section.content}</span>
          </S.SectionContent>
        </S.Section>
      ))}
    </S.Box>
  )
}

export default PublisherEditTextBox
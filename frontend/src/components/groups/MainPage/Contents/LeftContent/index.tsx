
import bbcode from "@/utils/bbcode"
import * as S from "./style"

interface GroupLeftContentProps {
  header: string | null
  description: string | null
  name: string
}

const GroupLeftContent = ({ description, header, name }: GroupLeftContentProps) => {

  return (
    <S.Container>
      <S.AboutHeader>SOBRE {name}</S.AboutHeader>
      {header && <S.GroupHeader>{header}</S.GroupHeader>}
      <S.GroupDescription>
        {description ? bbcode.toReact(description) : <h2>Nada Informado.</h2>}
      </S.GroupDescription>
    </S.Container>
  )
} 

export default GroupLeftContent
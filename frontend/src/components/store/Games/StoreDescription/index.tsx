import ReactHtmlParser from "react-html-parser"
import * as S from "./style"
import bbcode from "@/utils/bbcode"

const AppDescription = ({ description }: { description: string }) => {

  return (
    <S.DescriptionContainer>
      <S.Description>{bbcode.toReact(description)}</S.Description>
    </S.DescriptionContainer>
  )
}

export default AppDescription
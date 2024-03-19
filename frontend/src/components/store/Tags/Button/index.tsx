import { ArrowLeftDefault, ArrowRightDefault } from "@/components/Icons"
import * as S from "./style"

interface ButtonNextPreviewProps {
  onClick(...args: any): void
  type: "preview" | "next"
}

const ButtonNextPreview = ({ onClick, type }: ButtonNextPreviewProps) => {

  return (
    <S.ActionButton type={type} onClick={onClick}>
      {type === "next" ? <ArrowRightDefault /> :<ArrowLeftDefault /> }
    </S.ActionButton>
  )
}

export default ButtonNextPreview
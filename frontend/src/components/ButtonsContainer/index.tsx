import { MouseEventHandler } from "react"
import * as S from "./style"
import vars from "@/styles/vars"

interface ButtonsContainerProps {
  cancelClick: MouseEventHandler
  saveClick: MouseEventHandler
  cancelButton?: boolean
  saveButtonText?: string | React.ReactElement
  cancelButtonText?: string
  isLoading?: boolean
}

const ButtonsContainer = ({ cancelClick, isLoading, saveClick, cancelButton = true, saveButtonText: SaveButtonContent = "Salvar", cancelButtonText = "Cancelar" }: ButtonsContainerProps) => {

  return (
    <S.Container>
      {cancelButton && <S.Button onClick={cancelClick} background={vars.containers.primaryColor} color={vars.colorAlpha}>{cancelButtonText}</S.Button>}
      <S.Button onClick={saveClick} background={vars.secundaryColor} color={vars.color}>
        {isLoading !== null ? isLoading ? <img  src="/loading.gif"/> : SaveButtonContent : SaveButtonContent}
      </S.Button>
    </S.Container>
  )
}

export default ButtonsContainer
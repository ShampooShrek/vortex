import { ChangeEventHandler } from "react"
import * as S from "./style"
import { CSSProperties } from "styled-components"

interface TextAreaProps {
  name?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
  value: string | number
  label?: string 
  textAreaStyle?: CSSProperties
  sectionStyle?: CSSProperties
}

const TextArea = ({ value, label, name, onChange, sectionStyle, textAreaStyle , onKeyDown}: TextAreaProps) => {

  return (
    <S.TextAreaSection style={sectionStyle}>
      {label && <S.Label>{label}</S.Label>}
      <S.TextArea onKeyDown={onKeyDown} style={textAreaStyle} value={value} name={name} onChange={onChange} />
    </S.TextAreaSection>
  )
}

export default TextArea
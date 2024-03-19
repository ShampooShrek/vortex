import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react"
import * as S from "./style"
import { CSSProperties } from "styled-components"


interface InputProps {
  placeholder?: string
  name?: string
  type: "text" | "number" | "password" | "email"
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  value: string | number
  label?: string 
  pattern?: string
  inputStyle?: CSSProperties
  sectionStyle?: CSSProperties
  marginBottom?: boolean
}

const FormInput = ({ 
    type, 
    value,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    placeholder,
    label,
    name,
    inputStyle,
    sectionStyle,
    pattern,
    marginBottom = true 
  }: InputProps) => {
  return (
    <S.InputSection marginBottom={marginBottom} style={sectionStyle}>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        style={inputStyle}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        type={type}
        pattern={pattern}
        placeholder={placeholder}
        name={name}
      />
    </S.InputSection>
  )
}

export default FormInput
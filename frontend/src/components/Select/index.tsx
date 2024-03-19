import { ChangeEventHandler } from "react"

import * as S from "./style"
import { CSSProperties } from "styled-components"

interface SelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: string
  name: string
  options: {
    value: string
    text: string
  }[]
  marginTop?: boolean
  sectionStyle?: CSSProperties
}

const Select = ({ name, onChange, options, value, marginTop = true, sectionStyle }: SelectProps) => {

  return (
    <S.Options style={sectionStyle} marginTop={marginTop} onChange={onChange} name={name} value={value} >
      {options.map((option, i) => (
        <option key={`option-${option.value}-${i}`} value={option.value}>{option.text}</option>
      ))}
  </S.Options>
  )
}

export default Select
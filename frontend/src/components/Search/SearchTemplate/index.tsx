"use client"

import FormInput from "@/components/Inputs/FormInput"
import * as S from "./style"

interface SearchTemplateProps {
  title: string
  subtitle: string
  changeEvent: React.ChangeEventHandler<HTMLInputElement>
  onKeyDownEvent: React.KeyboardEventHandler<HTMLInputElement>
  children: React.ReactNode
  inputValue: string
}

export default function SearchTemplate({ changeEvent, onKeyDownEvent, subtitle, title, children, inputValue }: SearchTemplateProps) {

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.TitleContainer>
      <S.SearchContainer>
        <FormInput 
          inputStyle={{ width: "100%", padding: "15px" }}
          type="text" value={inputValue}
          onChange={changeEvent} onKeyDown={onKeyDownEvent} 
          marginBottom={false}
        />
        <S.SearchResponseContainer>
          {children}
        </S.SearchResponseContainer>
      </S.SearchContainer>
    </S.Container>
  )
}
"use client"

import messageAuth from "@/data/hooks/messageHook"
import { CheckIcon, ExclamationIcon, XIcon } from "../Icons"
import * as S from "./style"

interface MessageBoxProps {
  content: string
  type: "error" | "success"
  callback?: () => void
}

export default function MessageBox({ content, type, callback }: MessageBoxProps) {

  const { hideMessageBox } = messageAuth()

  const handleHideMmessageBox = () => {
    hideMessageBox()
    if(callback) {
      callback()
    }
  }

  return (
    <>
      <S.Black onClick={handleHideMmessageBox}/>
    <S.Container>
      <S.Close onClick={handleHideMmessageBox}>
        <XIcon />
      </S.Close>
      <S.TypeIcon typeResponse={type}>
        {type === "error" ? <ExclamationIcon /> : <CheckIcon />}
      </S.TypeIcon>
      <S.Message>
        <span>{content}</span>
      </S.Message>
    </S.Container>
    
    </>
  )
}
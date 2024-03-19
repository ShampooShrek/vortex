"use client"

import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, forwardRef } from "react"
import * as S from "./style"
import { CloseEye, OpenEye } from "@/components/Icons"

interface InputProps {
  label: string
  inputName: string
  inputType: "email" | "text" | "password"
  onFocus: FocusEventHandler<HTMLInputElement>
  onClick: MouseEventHandler<HTMLButtonElement>
  chooseType?: MouseEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
  isActive: boolean
  renderButton: boolean
}


const SignUpInputs = forwardRef<HTMLInputElement, InputProps>(
  ({ inputName, inputType, isActive, label, renderButton, onChange, onClick, onFocus, onKeyDown, chooseType }, ref) => {

    const RenderEye = () => {
      if (inputType === "text") {
        return <CloseEye onClick={chooseType} />
      } else {
        return <OpenEye onClick={chooseType} />
      }
    }

    return (
      <S.ContainerFormInput isActived={isActive}>
        <label>{label}</label>
        <input ref={ref} type={inputType} name={inputName} onKeyDown={onKeyDown} onChange={onChange} onFocus={onFocus} />
        {renderButton && <button onClick={onClick}>proximo</button>}
        {(inputName === "password" || inputName === "confPassword") && (
          <RenderEye />
        )}
      </S.ContainerFormInput>
    )
  })

SignUpInputs.displayName = "SignUpInputs"

export default SignUpInputs


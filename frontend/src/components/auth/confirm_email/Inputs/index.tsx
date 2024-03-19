"use client"

import { 
  ChangeEventHandler, 
  FocusEventHandler, 
  ClipboardEventHandler, 
  KeyboardEventHandler, 
  useEffect, 
  useRef 
} from "react"

import { Input } from "./style"

interface ConfirmEmailInputsProps {
  onPaste: ClipboardEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler<HTMLInputElement> 
  onFocus: FocusEventHandler<HTMLInputElement>
  value: string
  name: string
  focus: boolean
}

const Inputs = ({
  onChange, onPaste, onKeyDown, onFocus, value, name, focus }: ConfirmEmailInputsProps) => {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(focus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [focus])

  return (
    <Input
      ref={inputRef} 
      name={name}
      value={value}
      onPaste={onPaste}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      type="text" 
      maxLength={1}
      // autofocus="true" 
    />
  )
}

export default Inputs
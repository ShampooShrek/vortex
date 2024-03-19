"use client"

import { ChangeEvent, ClipboardEvent, KeyboardEvent, useState, FocusEvent, useEffect } from "react"
import Inputs from "./Inputs"
import * as S from "./style"

interface ConfirmEmailInputsProps {
  sendCode(code: string): Promise<void>
  email: string

}

const ConfirmEmailInputs = ({ email, sendCode}: ConfirmEmailInputsProps) => {

  const [inputValues, setInputValues] = useState<string[]>(["", "", "", "", "", "", "", ""])
  const [inputFocus, setInputFocus] = useState<number>(0)

  useEffect(() => {
    const haveEmptyValues = inputValues.includes("")
    if(!haveEmptyValues) {
      const code = inputValues.join("")
      sendCode(code)
    }
  }, [inputValues])

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value !== "" && ev.target.value !== " ") {
      const inputIndex = Number(ev.target.name.split("_")[1])
      const updatedInputs = [...inputValues]
      updatedInputs[inputIndex] = ev.target.value
      setInputValues(updatedInputs)
      if (ev.target.value === "") {
        setInputFocus(inputIndex - 1)
      } else {
        setInputFocus(inputIndex + 1)
      }
    }
  }

  const handleFocusChange = (ev: FocusEvent<HTMLInputElement>) => {
    const inputIndex = Number(ev.target.name.split("_")[1])
    setInputFocus(inputIndex)
  }

  const handlePastChange = (ev: ClipboardEvent<HTMLInputElement>) => {
    const pastClip = ev.clipboardData
    const pastValue = pastClip.getData("text")

    let pastIndex = 0
    let i = 0
    const updatedInputs = [...inputValues]

    for (i; i <= pastValue.length - 1; i++) {
      if (i < inputValues.length) {
        updatedInputs[i] = pastValue[pastIndex]
        pastIndex++
      } else break
    }
    setInputFocus(i > 7 ? 7 : i)
    setInputValues(updatedInputs)
  }

  const handleKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    const value = ev.currentTarget.value
    const direction = ev.currentTarget.selectionStart
    if (key === "ArrowRight" && (direction! >= 1 || value === "")) {
      setInputFocus(prevInputFocus => prevInputFocus < 7 ? prevInputFocus + 1 : 7)
    } else if (key === "ArrowLeft" && direction! <= 0) {
      setInputFocus(prevInputFocus => prevInputFocus > 0 ? prevInputFocus - 1 : 0)
    } else if (key === "Backspace") {
      const inputIndex = Number(ev.currentTarget.name.split("_")[1])
      const updatedInputs = [...inputValues]
      if (direction! >= 1) {
        updatedInputs[inputIndex] = ""
        setInputValues(updatedInputs)
      } else if (direction! <= 1) {
        updatedInputs[(inputIndex - 1) >= 0 ? inputIndex - 1 : 0] = ""
        setInputValues(updatedInputs)
        setInputFocus(inputFocus > 0 ? inputIndex - 1 : 0)
      }
    }
  }

  return (
    <S.Container>
      <S.TextContainer>
        <S.Text>Está quase acabando!</S.Text>
        <S.Text>Ensirá o codigo enviado para <S.EmailText>{email}</S.EmailText></S.Text>
        <S.Text></S.Text>
      </S.TextContainer>
      <S.InputContainers>
        <Inputs
          focus={inputFocus === 0}
          value={inputValues[0]}
          name="input_0"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 1}
          value={inputValues[1]}
          name="input_1"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 2}
          value={inputValues[2]}
          name="input_2"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 3}
          value={inputValues[3]}
          name="input_3"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 4}
          value={inputValues[4]}
          name="input_4"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 5}
          value={inputValues[5]}
          name="input_5"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 6}
          value={inputValues[6]}
          name="input_6"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
        <Inputs
          focus={inputFocus === 7}
          value={inputValues[7]}
          name="input_7"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onPaste={handlePastChange}
          onFocus={handleFocusChange}
        />
      </S.InputContainers>
    </S.Container>
  )
}

export default ConfirmEmailInputs

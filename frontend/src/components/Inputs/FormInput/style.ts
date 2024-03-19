import vars from "@/styles/vars";
import styled from "styled-components";

interface InputSectionProps {
  marginBottom: boolean
}

export const InputSection = styled.div<InputSectionProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.marginBottom ? "20px" : "0"};

`

export const Input = styled.input`
  outline: 0;
  border: 1px solid ${vars.containers.primaryColor};
  padding: 10px;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  border-radius: 3px;
  background-color: ${vars.containers.secundaryColor};
`

export const Label = styled.label`
  font-size: .9rem;
  color: ${vars.colorAlpha};
  margin-bottom: 5px;
`
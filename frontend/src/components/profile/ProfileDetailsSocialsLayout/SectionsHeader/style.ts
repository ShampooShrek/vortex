import vars from "@/styles/vars"
import styled from "styled-components"

export const EnvitesHeader = styled.div`
  width: 100%;  
  padding: 10px;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Input = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 50%;
    outline: 0;
    border: 1px solid ${vars.containers.primaryColor};
    padding: 10px;
    font-size: 1rem;
    color: ${vars.colorAlpha};
    border-radius: 3px;
    background-color: ${vars.containers.secundaryColor};
  }

  label {
    font-size: 1rem;
    text-align: center;
  }
`
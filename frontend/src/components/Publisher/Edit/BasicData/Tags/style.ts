import vars from "@/styles/vars"
import styled, { keyframes } from "styled-components"

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    width: 40%;
  }

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 764px) {
    input {
      width: 100%;
    }
  }
`

export const InputsTagsSelectedsContainer = styled.div`
  background-color: ${vars.containers.primaryColor};
  width: 40%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const InputsTagsSelecteds = styled.span`
  margin: 5px;
  color: ${vars.color};
  padding: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  border: 1px solid ${vars.lineColor};

  svg {
    cursor: pointer;
    margin-left: 10px;
    width: 1.1rem;
    height: 1.1rem;

    path {
      color: ${vars.secundaryColor};
    }
  }
`

const DropDownAnim =  keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`

export const InputDropDownContainer = styled.div`
  z-index: 1;
  width: 40%;
  background-color: ${vars.containers.primaryColor};
  position: absolute;
  top: 100%;
  animation: ${DropDownAnim} .3s ease-in-out;
  display: flex;
  flex-direction: column;
`

export const InputDropDownContent = styled.span`
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  transition: .2s ease-in-out;
  
  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`
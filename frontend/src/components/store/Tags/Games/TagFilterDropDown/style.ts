import vars from "@/styles/vars";
import styled from "styled-components";

export const Container = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
`

export const DropDownButton = styled.div`
  user-select: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  color: ${vars.color};
  cursor: pointer;
  margin: 10px 0;
  width: 100%;

  svg {
    margin-right: 5px;
    width: 25px;
  }
`

type DropDownProps = {
  isOpen: boolean
}

export const DropDownContainer = styled.div<DropDownProps>`
  z-index: 2;
  padding: 30px 20px;
  position: absolute;
  display: ${props => props.isOpen ? "flex" : "none"};
  flex-direction: column;
  align-items: start;
  top: 100%;
  left: 0;
  width: 290px;
  background-color: ${vars.containers.secundaryColor};
  border-radius: 10px;
`

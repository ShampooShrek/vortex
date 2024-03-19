import vars from "@/styles/vars";
import styled from "styled-components";


type StyledProps = {
  
}

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

`

export const Button = styled.button`
  cursor: pointer;
  width: 50px;
  margin-right: 20px;
  outline: 0;
  border: 0;
  background-color: #0008;
  border: 1px solid ${vars.secundaryColor};
  padding: 5px 15px;
  transition: .3s ease-in-out;

  &.selected {
    background-color: ${vars.secundaryColor};
    transform: scale(1.2, 1.2);
  }

  &:hover {
    background-color: ${vars.secundaryColor};
  }
`
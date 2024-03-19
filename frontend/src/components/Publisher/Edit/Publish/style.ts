import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div``

export const Message = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: ${vars.containers.secundaryColor};
  border: 1px solid ${vars.containers.primaryColor};
  
  span {
    font-size: .8rem;
    color: ${vars.color};
  }
`

export const ButtonDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  cursor: pointer;
  padding: 10px 25px;
  border: 2px solid ${vars.containers.primaryColor};
  background-color: ${vars.containers.secundaryColor};
  font-size: 1.2rem;

`
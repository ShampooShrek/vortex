import vars from "@/styles/vars"
import styled from "styled-components"

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const InputCard = styled.div`
  padding: 20px;
  background-color: ${vars.containers.secundaryColor};
  border: 4px solid ${vars.containers.primaryColor};
  margin: 20px;
`

export const Items = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: ${vars.containers.secundaryColor};
`


type Ul = {
  isOpen: boolean
}
export const Ul = styled.ul<Ul>` 
  display: ${props => props.isOpen ? "block" : "none"};
  list-style: none;
  padding: 0;
  padding-left: 10px;
  margin: 0;
`

export const Li = styled.li`
  /* list-style: circle; */
  font-size: .8rem;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${vars.lineColor};

  &:hover {
    background-color: ${vars.containers.primaryColor};
  }


  
`

export const Span = styled.span`
  cursor: pointer;
  font-size: .8rem;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid ${vars.lineColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  
  &:hover {
    background-color: ${vars.containers.primaryColor};
  }
`
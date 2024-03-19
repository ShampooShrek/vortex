import vars from "@/styles/vars";
import styled from "styled-components";


export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  padding: 20px;
  border: 2px solid ${vars.containers.primaryColor};
  background-color: ${vars.containers.secundaryColor};
`

export const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  
  /* h5 {
    font-size: 1.2rem;
    color: ${vars.color};
    font-weight: normal;
    width: 20%;
  }

  span {
    font-size: 1rem;
    color: ${vars.colorAlpha};
    width: 70%;
  } */
`

export const SectionName = styled.div`  
  width: 20%;
  
  span {
    font-size: 1rem;
    color: ${vars.color};
    font-weight: normal;
  }
`

export const SectionContent = styled.div`
  width: 80%;
  
  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }
`
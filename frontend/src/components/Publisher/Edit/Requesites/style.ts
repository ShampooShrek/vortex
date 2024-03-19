import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: stretch;
  }
`

export const RequesitesContainer = styled.div`
  display: block;
  justify-content: start;
  width: calc(50% - 20px);

  @media screen and (max-width: 600px) {
    width: 100%;

    &:first-child {
      margin-bottom: 40px;
    }
  }
`

export const HeaderRequesitesContainer = styled.h4`
  font-size: .8rem;
  text-transform: uppercase;
  margin-bottom: 5px;
  color: ${vars.colorAlpha};
`


export const RequesitesContent = styled.div`
  display: block;

  @media screen and (max-width: 764px) {
    input {
      width: 100%;
    }
  }
`
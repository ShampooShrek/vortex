import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 764px) {
    flex-direction: column-reverse;
  }
`

export const ContentContainer = styled.div`
  width: 70%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 764px) {
    width: 100%;
    margin: 0;
  }
`

export const AsideAvaliations = styled.div`
  width: 30%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.secundaryColor};

  @media screen and (max-width: 764px) {
    width: 100%;
    margin: 0;
    margin-bottom: 30px;
    flex-direction: row;
    padding: 10px;
  }
`

export const AsideAvaliationsContent = styled.div`
  width: 50%;
  display: flex;
  align-items: start;
  
  h1 {
    color: ${vars.color};
    font-size: 2.5rem;
  }

  span {
    color: ${vars.colorAlpha};
    font-size: .8rem;
  }

  &:first-child {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 764px) {
    width: 100%;
    justify-content: center;
    margin: 0;
  }
`
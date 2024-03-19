import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 764px) {
    justify-content: start;
    flex-direction: column-reverse;
  }
`

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const Title = styled.div`
  margin: 20px 0;

  h2 {
    font-size: 2rem;
    font-weight: normal;
    color: ${vars.color};
  }
`

export const Card = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  background-color: ${vars.containers.primaryColor};
  margin-bottom: 10px;
  border-radius: 10px;
`

export const CardImage = styled.div`
  margin-right: 20px;
  width: 25%;

  img {
    width: 100%;
    border-radius: 10px;
  }
`

export const CardContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    font-weight: normal;
    margin-bottom: 5px;
    font-size: 1.8rem;

    @media screen and (max-width: 764px) {
      font-size: 1.5rem;
    }
  }

  span {
    color: ${vars.colorAlpha};
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: end;

  button {
    cursor: pointer;
    width: 100%;
    padding: 10px 0;
    border: 0;
    outline: 0;
    background-color: ${vars.containers.secundaryColor};
    transition: .2s;

    &:first-child {
      margin-right: 10px;
    }

    &:hover {
      filter: brightness(1.3);
    }
  }

  @media screen and (max-width: 764px) {
    flex-direction: column;
    justify-content: start;

    button:first-child {
      margin: 10px 0;
    }
  } 
`

export const Aside = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 764px) {
    width: 100%;
    margin: 20px 0;
  }
`

export const AsideTitle = styled.h2`
  font-weight: normal;
  text-align: center;
  margin-bottom: 15px;
`

export const AsideContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AsideContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.2rem,;
    color: ${vars.colorAlpha};
  }
`

export const BuyButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  color: ${vars.color};
  background-color: ${vars.secundaryColor};
  border: 0;
  outline: 0;
  font-size: 1.5rem;  
  cursor: pointer;
  transition: .2s;
  
  &:hover {
    filter: brightness(1.5);
  }
`


export const EmptyCartContainer = styled.div`
  width: 100%;
  display: flex;  
  align-items: center;
  justify-content: center;
`

export const EmptyCart = styled.div`
  margin-top: 40px;
  background-color: ${vars.containers.secundaryColor};
  border: 2px solid ${vars.containers.primaryColor};
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-size: 1.8rem;
    font-weight: normal;
    color: ${vars.color};
  }

  a {
    margin-top: 10px;
    font-size: 1.2rem;
    color: ${vars.colorAlpha}
  }
`
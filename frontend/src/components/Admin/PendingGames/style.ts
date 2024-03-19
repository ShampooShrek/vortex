import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start  ;
`

export const CardsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

export const Card = styled.div`
  padding: 10px;
  display: flex;
  background-color: ${vars.containers.primaryColor};
  margin-bottom: 10px;
`

export const CardImage = styled.div`
  width: 300px;
  height: 150px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const CardContent = styled.div`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Header = styled.div``

export const Title = styled.h4`
  font-weight: normal;
  font-size: 1.5rem;
  margin-bottom: 5px;
`

export const Date = styled.span`
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

type ActionsProps = {
  typeButton: "accept" | "decline"
}

export const Actions = styled.div`
  display: flex;
  align-items: center;
`

export const Svg = styled.div<ActionsProps>`
  margin-right: 10px;
  svg {
  padding: 5px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  background-color: ${props => props.typeButton === "accept" ? "green" : "red"};
  border-radius: 5000px;
  transition: .1s ease-in-out;

  &:hover {
    filter: brightness(1.5);
  }
}
`

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  a {
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    width: calc(33.33% - 5px);
    padding: 10px 0;
    border: 0;
    background-color: ${vars.containers.secundaryColor};
    transition: .2s;

    &:hover {
      filter: brightness(1.4);
    }
  }
`

export const AsideGames = styled.div`
  width: 25%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.secundaryColor};
`

export const AsideGamesContent = styled.div`
  width: 50%;
  display: flex;
  align-items: start;
  
  h1 {
    color: ${vars.color};
    font-size: 2.2rem;
    margin-right: 5px;
  }

  span {
    color: ${vars.colorAlpha};
    font-size: .8rem;
  }


`
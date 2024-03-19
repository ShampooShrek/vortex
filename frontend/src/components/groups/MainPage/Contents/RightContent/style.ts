"use client"

import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";


type StyledProps = {
  color?: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: ${vars.containers.primaryColor};

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1rem;
    svg {
      margin-right: 5px;
      width: 1.2rem;
      height: 1.2rem;
      color: ${vars.colorAlpha};
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:hover, &:hover svg path {
      color: ${vars.colorAlpha};
    }
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`
export const ButtonCard = styled(Link)`
  
  padding: 5px 70px;
  border-radius: 5px;
  margin: 15px auto 0 auto;
  background-color: ${vars.secundaryColor};
  color: ${vars.color};
  cursor: pointer;
`

export const UsersQtdContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export const UsersQtdContent = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    color: ${props => props.color};
  }

  span {
    font-size: .8rem;
    color: ${props => props.color};
    text-transform: uppercase;
  }
`

export const DateCreat = styled.span`
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

export const AssociedGamesHeader = styled.span`
  color: ${vars.colorAlpha};
  font-size: .8rem;
`

export const GamesCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const GamesCards = styled.div`
  width: 100%;
  background-color: ${vars.containers.secundaryColor};
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: ${vars.color};
    font-size: 1rem;
  }

  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border: 1px solid ${vars.secundaryColor};
  }
  
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`


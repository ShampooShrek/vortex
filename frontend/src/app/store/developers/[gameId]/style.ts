"use client"

import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";

interface StyledProps {
  isActived: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const CardContainers = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
  &:nth-child(2) {
    margin-top: 20px;
  }
`

export const Card = styled.div`
  padding: 10px;
  /* border-radius: 5px; */
  background-color: ${vars.containers.secundaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const CardLeft = styled.div`
  display: flex;
`

export const CardLeftImage = styled.div<StyledProps>`
  position: relative;
  width: 60px;
  height: 60px;

  margin-right: 10px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${props => props.isActived ? "transparent" : "#000a"} ;
  } 
`

export const CardLeftContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`

export const CardLeftTitle = styled.h3`
  font-size: 1.1rem;
  color: ${vars.color};
`

export const CardLeftDescription = styled.span`
  font-size: .9rem;
  color: ${vars.colorAlpha};
`

export const CardRightTime = styled.span`
  font-size: .9rem;
  color: ${vars.colorAlpha};
`


export const HeaderContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 200px;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  align-items: center;
  justify-content: space-between;

  
    @media screen and (max-width: 500px) {
      align-items: center;
      justify-content: center;
      flex-direction: column-reverse;
    }
` 
export const GameContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const GameName = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`

export const Section = styled.span`
  font-size: .8rem;
`

export const GameImage = styled(Link)`
  cursor: pointer;

  img {
    width: 300px;
  }

    @media screen and (max-width: 700px) {
      img {
        width: 200px;
      }
  }

`

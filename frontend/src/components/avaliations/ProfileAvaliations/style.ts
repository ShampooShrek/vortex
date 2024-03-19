"use client"

import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";

interface StyledProps {
  seeMore: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  background-color: ${vars.containers.secundaryColor};
  /* border: 2px solid ${vars.secundaryColor}; */

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`

export const GameContainer = styled.div`
  margin-right: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
`

export const Game = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const GameImage = styled.img`
  width: 200px;

  @media screen and (max-width: 600px) {
    width: 150px;
  }
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`

export const GameName = styled.h3`
  font-weight: normal;
  margin-top: 10px;
  font-size: 1rem;
  color: ${vars.color};
` 

export const AvaliationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
interface AvaliationProps {
  avaliation: "LIKE" | "DISLIKE"
}

export const Avaliation = styled(Link)<AvaliationProps>`
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;

  svg {
    width: 52px;
    height: 52px;
    margin-right: 10px;

    path {
      color: ${props => props.avaliation === "LIKE" ? vars.lineColor : vars.secundaryColor};
    }
  }

`

export const AvaliationTitle = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: .7rem;
    color: #bbb;
  }
`

export const AvaliationContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
`

export const AvaliationDate = styled.h4`
  font-size: .7rem;
  color: #fff;
  margin: 20px 0;
  font-weight: normal;
`

export const AvaliationContent = styled.div<StyledProps>`
  height: ${props => props.seeMore ? "auto" : "100px"};
  overflow: hidden;
  width: 100%;
  position: relative;
  font-size: .9rem;
`

export const AvaliationGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient( to bottom, #fff0 5%, ${vars.topBar.background} 95%);
  /* background-color: #000; */
`

export const SeeMore = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: end;

  span {
    color: ${vars.secundaryColor};
    cursor: pointer;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    font-weight: normal;
    font-size: .8rem;
    margin-bottom: 10px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
`

export const Bar = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${vars.secundaryColor};
  margin: 10px auto;
`

export const Buttons = styled.button`
  font-size: .8rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: 0;
  background-color: ${vars.secundaryColor};
  margin-right: 2px;
`

export const VoteInfo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  span {
    color: #bbb;
    font-size: .8rem;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`
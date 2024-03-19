"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  seeMore: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${vars.topBar.background + "77"};
  border: 2px solid ${vars.secundaryColor};
`

export const UserContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid ${vars.secundaryColor};
  border-radius: 50%;
  margin-right: 5px;
`

export const UserName = styled.h3`
  font-weight: normal;
  font-size: 1.2rem;
  color: ${vars.color};
` 

export const AvaliationContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`

export const Avaliation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;

  img {
    width: 52px;
    height: 52px;
    margin-right: 10px;
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
  height: ${props => props.seeMore === true ? "auto" : "100px"};
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
"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${vars.topBar.background + "77"};
  border: 2px solid ${vars.secundaryColor};
`

export const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border: 2px solid ${vars.secundaryColor};
  border-radius: 50%; 
  margin-right: 5px;
`

export const UserName = styled.h3`
  font-weight: normal;
  font-size: 1rem;
  color: ${vars.color};
`

export const AvaliationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Avaliation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AvaliationNoteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const AvaliationImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

export const AvaliationTitle = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1rem;
  }

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

export const AvaliationContent = styled.div`
  height: auto;
  overflow: hidden;
  width: 100%;
  position: relative;
  font-size: .8rem;
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
  font-size: .7rem;
  cursor: pointer;
  padding: 3px 8px;
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
    font-size: .7rem;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`
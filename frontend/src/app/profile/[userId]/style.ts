"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    justify-content: inherit;
    flex-direction: column-reverse;
  }
`

export const ProfileContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 0;
 }
`

//#region ProfileContent
export const UserDescription = styled.textarea`
  width: 100%;
  height: 300px;
  resize: none;
  padding: 10px;
  overflow-x: auto;
  color: ${vars.color};
  outline: 0;
  border: 0;
  background-color: ${vars.topBar.background};
  font-size: 1rem;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  
  }

  &::-webkit-scrollbar-track {
    background: ${vars.topBar.background};
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${vars.secundaryColor};
    height: 3rem;
    border-radius: 50px;
  }
`

//#endregion

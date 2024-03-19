"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

export const AsideContent = styled.div`
  width: 30%;
  height: 100%;
  padding: 20px;
  background-color: #0007;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 20px;

  @media screen and (max-width: 900px) {
    width: 100%;
    align-items: start;

    .bar {
      display: none;
    }
  }
`

export const AsideStatus = styled.h5`
  font-size: 1.6rem;
  font-weight: normal;
  margin-bottom: 40px;

  @media screen and (max-width: 900px) {
    margin-bottom: 10px;
  }
`

export const AsideContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
`

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

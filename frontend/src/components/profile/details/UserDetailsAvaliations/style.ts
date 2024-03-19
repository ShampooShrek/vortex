"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

interface AvaliationProps {
  avaliation: "LIKE" | "DISLIKE"
}

export const Avaliation = styled.div<AvaliationProps>`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  svg {
    width: 52px;
    height: 52px;
    margin-right: 10px;

    path {
      color: ${props => props.avaliation === "LIKE" ? vars.lineColor : vars.secundaryColor};
    }
  }

  @media screen and (max-width: 500px) {
      width: 100%;
    }
`

export const AvaliationDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${vars.containers.secundaryColor};

  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }

  span:first-child {
    margin-bottom: 10px;
  }
`

type AvaliationHeaderType = {
  inEditMode: boolean
}

export const AvaliationHeader = styled.div<AvaliationHeaderType>`
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: .2s ease-in-out;

  img {
    width: 52px;
    height: 52px;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${props => !props.inEditMode && vars.containers.secundaryColor};
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

export const AvaliationContent = styled.div`
  width: 100%;
  position: relative;
  font-size: .9rem;
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
  padding: 10px;
  display: flex;

  button {
    margin-right: 10px;
    padding: 5px 0;
    width: 100px;
    outline: 0;
    border: 0;
    color: ${vars.color};
    background-color: ${vars.secundaryColor};
    cursor: pointer;
  }
`

export const Bar = styled.div`
  width: 100%;
  height: 1px;
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

export const Game = styled.div`
  width: 150px;
  display: flex;
  flex-direction: colunmn;
  justify-content: center;

  img {
    cursor: pointer;
    width: 100%;
  }
  
  @media screen and (max-width: 500px) {
    display: none;
  }
`
export const LikeDeslikeButtons = styled.div`
  display: flex;
  margin-top: 5px;
`

interface LikeDeslikeButtonProps {
  isSelected: boolean
}

export const LikeDeslikeButton = styled.button<LikeDeslikeButtonProps>`
  cursor: pointer;
  background-color: ${vars.secundaryColor};
  width: 100px;
  padding: 4px 0;
  border-radius: 5px;
  outline: 0;
  border: 1px solid black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => props.isSelected ? "brightness(1.6)" : "brightness(1);"};

  &:first-child {
    margin-right: 5px;
  }

  &:hover {
    filter: brightness(1.6);
  }
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
`

export const HeaderForm = styled.div`
  display: flex;
  flex-direction: column;
`

export const AvaliationButtons = styled.div`
margin-top: 10px;
  display: flex;
  align-items: center;

`



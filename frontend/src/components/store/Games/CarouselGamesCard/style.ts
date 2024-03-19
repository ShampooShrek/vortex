"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  MainWidth: number
  marginRight: number
  defaultMargin: number
}

export const Card = styled.div<StyledProps>`
  position: relative;
  width: calc((${props => `${props.MainWidth}px`} / 3) - ${props => props.marginRight}px);
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 2px;
  cursor: pointer;
  background-color: ${vars.topBar.background};
  
  &:not(:last-child) {
    margin-right: ${props => props.defaultMargin}px;
  }

  &:hover img {
    transform: scale(1.02, 1.02)
  }
  
`

export const GameImage = styled.img`
  transition: .2s;
  width: 100%;
  height: 80%;
  /* object-fit: cover; */
  margin-bottom: 10px;
  border-radius: 2px;
`

export const GameContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const GameName = styled.span`
  font-size: 1.1rem;
  margin-bottom: 5px;
`

export const GamePrice = styled.span`
  font-size: .8rem;
`
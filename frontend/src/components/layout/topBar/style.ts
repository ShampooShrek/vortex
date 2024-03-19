"use client"

import vars from "@/styles/vars"
import styled from "styled-components"

interface StyleProps {
  itemWidth: string
  button?: boolean | false
}

export const TopBar = styled.div`
  width: 100%;
  height: ${vars.topBar.height};
  background-color: ${vars.topBar.background};
  display: flex;
  position: relative;
`

export const Logo = styled.div`
  font-size: 1.6rem;
  margin: auto 0;
  margin-left: 20px;
  cursor: pointer;
`


export const RightDiv = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
`

export const RightItem = styled.div<StyleProps>`
  cursor: ${props => props.button ? "pointer" : "" };
  position: relative;
  width: ${props => props.itemWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter .3s ;
  background-color: ${vars.topBar.rightItemsColors};

  &:hover {
    filter: ${props => props.button ? "brightness(1.1)" : "" };
  }

  span {
    font-size: .8rem;
    letter-spacing: 1px;
  }
  & > span {
    pointer-events: none;
  }

  @media screen and (max-width: 500px) {
    &:last-child {
      display: none;
    }
  }
`
"use client"

import vars from "@/styles/vars"
import styled, { keyframes } from "styled-components"

type StyleProps = {
  isActived: boolean
}

const DropDownClose = keyframes`
  from {
    opacity: 100;
    transform: translateY(20px);
  } to {
    opacity: 0;
    transform: translateY(0);
  }
`

export const Container = styled.div<StyleProps>`
  position: absolute;
  width: 100%;
  padding: 5px;
  top: 40px;
  background-color: ${vars.dropDown.background};
  pointer-events: ${props => props.isActived ? "default" : "none"};
  opacity: ${props => props.isActived ? 100 : 0};
  transform: translateY(${props => props.isActived ? "20px" : "0"});
  transition: all .3s ;
  z-index: 200;
`
export const List = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;

  a {
    text-decoration: none;
    cursor: pointer;
    color: #bbb;
    width: 100%;
    padding: 10px 0;
    position: relative;

    &::after {
      content: "";
      position: relative;
      width: 100px;
      top: 0;
      height: 10px;
      background-color: ${vars.lineColor};
    }
  }

  span {
    text-decoration: none;
    cursor: pointer;
    color: #bbb;
    width: 100%;
    padding: 10px 0;
    position: relative;

    &::after {
      content: "";
      position: relative;
      width: 100px;
      top: 0;
      height: 10px;
      background-color: ${vars.lineColor};
    }

    /* &:hover &::before {
      width: 100%;
      bottom: 0;
      height: 1px;
      color: ${vars.lineColor};
    } */
  }

  span:hover {
    color: ${vars.color};
  }
  a:hover {
    color: ${vars.color};
  }
`

export const AppLink = styled.a`
  text-decoration: none;
  display: none;

  @media screen and (max-width: 500px) {
    display: block;
  }
`
"use client"

import vars from "@/styles/vars";
import styled, { keyframes } from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`

export const FilterName = styled.span`
  color: #fff;
  font-size: 1rem;
  margin-right: 10px;
`

export const FilterButton = styled.div`
  text-align: center;
  position: relative;
  padding: 5px 20px 5px 5px;
  background-color: ${vars.secundaryColor};

  span {
    font-size: 1.1rem;
  }
`

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

export const DropDownContainer = styled.div<StyleProps>`
  position: absolute;
  width: 100%;
  padding: 5px;
  left: 0;
  top: 100%;
  background-color: ${vars.secundaryColor};
  pointer-events: ${props => props.isActived ? "default" : "none"};
  opacity: ${props => props.isActived ? 100 : 0};
  transition: all .3s ;
  animation: ${DropDownClose} .3s;
  z-index: 2;
`
export const DropDownList = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;

  span {
    cursor: pointer;
    color: #bbb;
    width: 100%;
    padding: 10px 0;
    font-size: .7rem;
  }

  span:hover {
    color: #fff;
  }
`


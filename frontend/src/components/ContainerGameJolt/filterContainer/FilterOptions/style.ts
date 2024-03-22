"use client"

import vars from "@/styles/vars"
import styled from "styled-components"

interface StyledProps {
  isSelected?: boolean
}

export const FilterOptions = styled.div<StyledProps>`
  cursor: pointer;
  background-color: ${vars.containers.primaryColor};
  z-index: 0;
  border: 1.5px solid ${vars.secundaryColor};
  border-bottom: 4px solid ${vars.secundaryColor};
  border-bottom: ${props => props.isSelected ? "2px solid " + vars.secundaryColor + "00"
    : "2px solid " + vars.secundaryColor};
  margin-right: 10px;
  font-size: .9rem;
  padding: 8px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  &:first-child {
    margin-left: 20px;
  }

  @media screen and (max-width: 600px) {
    font-size: .8rem;
    margin-right: 5px;
    padding: 6px;

  &:first-child {
    margin-left: 4px;
  }
  }

  @media screen and (max-width: 400px) {
    font-size: .70rem;
    margin-right: 4px;
    padding: 6px 2px;
  }
  
`

"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  isSelected?: boolean
}

export const FilterContainer = styled.div`
  position: relative;
  /* border-bottom: 4px solid #000; */
  display: flex;
  align-items: end;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${vars.secundaryColor};
    z-index: -10;
    border-radius: -5px
  }
`

export const FilterOptions = styled.div<StyledProps>`
  cursor: pointer;
  background-color: #131419;
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
`
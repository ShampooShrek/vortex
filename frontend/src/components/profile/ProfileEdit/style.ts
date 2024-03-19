"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: space-between;
  margin-bottom: 100px;
  margin-top: 50px;
`

export const AsideNavigation = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`

export const AsideNavigationItem = styled.span<StyledProps>`
  cursor: pointer;
  color: ${props => props.selected ? vars.color : vars.colorAlpha};
  background-color: ${props => props.selected ? vars.secundaryColor : "transparent"};
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: ${vars.secundaryColor};
    color: ${vars.color};
  }
`

export const Section = styled.div`
  width: 75%;
`

export const SectionTitle = styled.h3`
  font-weight: normal;
  font-size: 2rem;
  margin-bottom: 20px;
`

"use client"

import vars from "@/styles/vars";
import styled from "styled-components";
import Link from "next/link";

interface StyledProps {
  selected: boolean
}

export const AsideNavigation = styled.div`
  padding: 10px;
  width: 25%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  background-color: ${vars.containers.primaryColor};

  @media screen and (max-width: 900px) {
    display: none;
  }
`

export const AsideNavigationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

export const AsideNavigationTitle = styled.h2`
  font-weight: normal;
  font-size: .7rem;
  color: ${vars.colorAlpha};
  margin-bottom: 5px;
  text-transform: uppercase;
`

export const AsideNavigationItemContent = styled.span<StyledProps>`
  cursor: pointer;
  width: 100%;
  color: ${vars.color}; 
  background-color: ${props => props.selected ? vars.containers.secundaryColor : "transparent"};
  padding: 10px;
  transition: background-color .2s ease-in-out;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
    color: ${vars.color};
  }
  `

export const AsideNavigationItemContentLink = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;

  a {
    color: ${vars.color}; 
    text-decoration: none;
    font-size: 1rem;
    padding: 10px;
    width: 100%;
    background-color: transparent;
    transition: background-color .2s ease-in-out;
    &:hover {
      background-color: ${vars.containers.secundaryColor};
      color: ${vars.color};
    }
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


export const TopBarNavigationContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: none;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    display: flex;
  }
`

export const TopBarNavigation = styled.div`
  width: 100%;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  
  svg {
    width: 30px;
  }
`

export const TopbarNavigationTitle = styled.h3`
  font-weight: normal;
`

interface TopBarNavigationDropDownProps {
  isOpen: boolean
}

export const TopBarNavigationDropDown = styled.div<TopBarNavigationDropDownProps>`
  display: ${props => props.isOpen ? "flex" : "none"};
  width: 100%;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
`

export const TopbarNavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 0 10px;
`

export const TopBarNavigationSectionTitle = styled.h2`
  font-weight: normal;
  font-size: .7rem;
  color: ${vars.colorAlpha};
  margin-bottom: 5px;
  text-transform: uppercase;
`

export const TopBarNavigationContent = styled.div<StyledProps>`
  cursor: pointer;
  width: 100%;
  color: ${vars.color}; 
  background-color: ${props => props.selected ? vars.containers.secundaryColor : "transparent"};
  padding: 10px;
  transition: background-color .2s ease-in-out;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
    color: ${vars.color};
  }
`

export const TopBarNavigationContentLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  color: ${vars.color}; 
  background-color: transparent;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
    color: ${vars.color};
  }
`
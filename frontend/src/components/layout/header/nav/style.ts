"use client"

import vars from "@/styles/vars"
import Link from "next/link"
import styled from "styled-components"

export const NavComponent = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Links = styled.div`
  width: 30%;
  a {
    margin-right: 30px;
    text-decoration: none;
    font-size: 20px;
  }

  a:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 650px) {
    display: none;
  }
`

export const Icons = styled.div`
  padding-left: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  span {
    position: relative;
  }

  svg {
    cursor: pointer;
    width: 30px;
    margin-left: 30px;
  }

  svg:last-child {
    margin-left: 30px;
  }

  a {
    position: relative;
    
    & > span {
      position: absolute;
      top: -2px;
      right: -5px;
      font-size: .8rem;
    }
  }

    @media screen and (max-width: 650px) {
    display: none;
  }

`

export const MobileIcons = styled.div`
  display: none;  
  width: 100%;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
    
    &:first-child {
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 650px) {
    display: flex;
  }
`

interface InputType {isOpen: Boolean}

export const Input = styled.input<InputType>`
  color: ${vars.colorAlpha};
  width: 100%;
  position: relative;
  padding: 5px 5px;
  border-radius: 4px;
  outline: 0;
  border: 1px solid black;
  background-color: ${vars.containers.secundaryColor};
  transform-origin: right;
  transform: scaleX(${props => props.isOpen === true ? '30px' : 0});
  transition: transform .5s;
  font-size:  1.1rem;
  z-index: 0;
` 

export const SearchSpan = styled.span`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;

  svg {
    margin-left: 10px;
  }
`

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`

export const DropDownSearch = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 150%;
  padding: 10px;
  background-color: ${vars.containers.primaryColor};

  a {
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
`

export const DropDownCards = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.containers.primaryColor};
  transition: .2s ease-in-out;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`

export const DropDownCardImage = styled.img`
  width: 120px;
  margin-right: 10px;
`

export const DropDownContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const DropDownContentName = styled.span`
  font-size: 1rem;
  color: ${vars.color};
`

export const DropDownContentPrice = styled.span`
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

interface NavMobileAsideProps {
  isOpen: boolean
}

export const NavMobileBlack = styled.div<NavMobileAsideProps>`
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0004;
  z-index: 9;

  @media screen and (max-width: 650px) {
    display: ${props => props.isOpen ? "block" : "none"};
  }
`

export const NavMobileAside = styled.div<NavMobileAsideProps>`
  min-width: 200px;
  height: 100vh;
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(${props => props.isOpen ? "0" : "-100%"});
  transition: transform 0.3s ease-in-out;
  background-color: ${vars.containers.secundaryColor};
  z-index: 10;

  @media screen and (max-width: 650px) {
    display: flex;
  }
`

export const NavMobileAsideIcon = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 50px;
    height: 50px;
  }
`

export const NavMobileAsideItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const NavMobileAsideItems = styled(Link)`
  width: 100%;
  text-decoration: none;
  padding: 15px 10px;
  font-size: 1.2rem;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`
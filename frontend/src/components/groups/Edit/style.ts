"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  min-height: 100vh;

  @media screen and (max-width: 764px) {
    flex-direction: column-reverse;
    justify-content: start;
  }
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 60%;

  @media screen and (max-width: 764px) {
    width: 100%;
  }

`

interface RightContainerProps {
  isOpen: boolean
}

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 38%;
  padding: 20px;
  background-color: ${vars.containers.primaryColor};

  @media screen and (max-width: 764px) {
    width: 100%;
    margin-bottom: 40px;
  }
`

export const SelectedSection = styled.div`
  background-color: ${vars.containers.primaryColor};
  width: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
  }
  span {
      font-size: 1.1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    width: 1.4rem;
    height: 1.4rem;
  }
  }

  @media screen and (max-width: 764px) {
    display: flex;
  }
`

interface RightContentItemProps {
  isSelected: boolean
  isOpen: boolean
}

export const RightContainerItem = styled.div<RightContentItemProps>`
  cursor: pointer;
  display: flex;
  padding: 10px;
  width: 100%;
  transition: .2s ease-in-out;
  background-color: ${props => props.isSelected ? vars.containers.secundaryColor : ""};

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }

  @media screen and (max-width: 764px) {
    display: ${props => props.isOpen ? "flex" : "none"};
    padding: 10px 0;
  }
`

export const RightContainerItemContent = styled.span<RightContentItemProps>`
  color: ${props => props.isSelected ? vars.color : vars.colorAlpha};
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    width: 1.4rem;
    height: 1.4rem;
  }
`
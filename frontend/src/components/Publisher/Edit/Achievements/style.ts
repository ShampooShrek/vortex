import vars from "@/styles/vars";
import styled from "styled-components";
import { motion } from "framer-motion"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Black = styled.div`
  width: 100%;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 120;
  background-color: #0005;
`

export const FormCardAchievements = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: ${vars.containers.primaryColor};
  border: 1px solid ${vars.secundaryColor};
  border-radius: 5px;
  z-index: 125;
  
  @media screen and (max-width: 500px) {
    width: 100%;

    div > button {
      width: 30px !important;
    }
  }
`

export const SelectContainer = styled.div`
  display: flex;
  
  select {
    margin-right: 10px;
  }
`

export const FormCardImage = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  label {
    font-size: .9rem;
    color: ${vars.colorAlpha};
    margin-bottom: 5px;
  }

  img {
    width: 64px;
    height: 64px;
  }

  margin-bottom: 10px;
`
export const CardContainers = styled.div`
  margin-top: 10px;
`

export const Card = styled.div`
  padding: 10px;
  /* border-radius: 5px; */
  background-color: ${vars.containers.secundaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const CardLeft = styled.div`
  display: flex;
`

export const CardLeftImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  } 
`

export const CardLeftContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`

export const CardLeftTitle = styled.h3`
  font-size: 1.1rem;
  color: ${vars.color};
`

export const CardLeftDescription = styled.span`
  font-size: .9rem;
  color: ${vars.colorAlpha};
`

type CardRightProps = {
  firstIconColor: string
  secondIconColor: string
}

export const CardRight = styled.div<CardRightProps>`
  svg {
    cursor: pointer;
    width: 25px;
    height: 25px;

    &:first-child path {
      color: ${props => props.firstIconColor ?? vars.colorAlpha};
    }

    &:last-child path {
      color: ${props => props.secondIconColor ?? vars.colorAlpha};
    }

    &:first-child {
      margin-right: 10px;
    }
  }
`

export const AddAchievementButton = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.containers.secundaryColor};
  border: 2px solid ${vars.containers.primaryColor};
  outline: 0;
  margin-bottom: 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: .2s ease-in-out;

  &:hover {
    filter: brightness(1.2);
  }
`
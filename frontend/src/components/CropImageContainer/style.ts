"use client"

import vars from "@/styles/vars";
import styled from "styled-components";
import { motion } from "framer-motion"


export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BlackCoisa = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0008;
`

export const BlackCoisaCard = styled(BlackCoisa)`
  z-index: 2;
`

export const Card = styled(motion.div)`
  width: 60%;
  height: 80%;
  background-color: ${vars.containers.secundaryColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  padding: 10px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 764px) {
    width: 100%;
    height: 100%;
  }
`

export const CardHeader = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }

  span {
    font-size: 1.2rem;
  }
`

export const CroppedImageContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  div div img {
    
    max-height: 400px;
  }
/* 
  & > div, & > div > div, & > div > div > img {
    max-height: 60%;
    max-height: 60%;
  } */
`

type ViewCroppedImageProps = {
  isAdvanced: boolean
}

export const ViewCroppedImage = styled.div<ViewCroppedImageProps>`
  width: 100%;
  height: 60%;
  position: absolute;
  flex-direction: column;
  bottom: 0;
  left: 0;
  background-color: ${vars.containers.primaryColor};
  transform: translateY(${props => props.isAdvanced ? "0" : "100%"});
  transition: transform .3s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 3;

  span {
    font-size: 1.5rem;
  }
`

type CroppedImageResultprops = {
  circular: boolean
}

export const CroppedImageResult = styled.img<CroppedImageResultprops>`
  width: 180px;
  height: 180px;
  border: 2px solid ${vars.secundaryColor};
  border-radius: ${props => props.circular ? "100%" : 0};
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  width: 150px;
  padding: 5px 0;
  border-radius: 5px;
  outline: 0;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const SaveButton = styled(Button)`
  color: ${vars.color};
  background: ${vars.secundaryColor};
`

export const CancelButton = styled(Button)`
  color: ${vars.colorAlpha};
  background: ${vars.containers.secundaryColor};
  margin-right: 20px;
`

export const AdvancedButton = styled(SaveButton)`
  padding: 10px;
`

"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  isActived: boolean
}

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
`

export const CardContainers = styled.div`
  &:nth-child(2) {
    margin-top: 80px;
  }
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

export const CardLeftImage = styled.div<StyledProps>`
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
    background-color: ${props => props.isActived ? "transparent" : "#000a"} ;
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

export const CardRightTime = styled.span`
  font-size: .9rem;
  color: ${vars.colorAlpha};
`
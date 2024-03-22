"use client"

import vars from "@/styles/vars"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import styled from "styled-components"

interface StyleProps {
  isSelected?: boolean
  progressWidth?: number
}

export const Container = styled.div`
  width: 100%;
  max-height: 490px;
  aspect-ratio: 16/9;
  display: flex;

  @media screen and (max-width: 764px) {
    flex-direction: column;
    max-height: none;
  }
`
type ImageItemProps = { isSelected: boolean }

export const ImageItem = styled.div<ImageItemProps>`  
  position: relative;
  width: 75%;
  transition: all 2s linear;
  transition: width 0s;
  display: ${props => props.isSelected ? "block" : "none"};

  img {
    border-radius: 12px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const SkeletonImage = styled(Skeleton)`
  width: 75%;
  height: 100%;


  @media screen and (max-width: 764px) {
    width: 100%;
  }

`

export const ImageTextContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 3%;
  transform: translateY(-80%);
  max-width: 60%;
  color: ${vars.color};
  text-shadow: 2px 2px black;

  h1 {
    font-weight: bold;
    margin: 0 0 1rem;
  }

  p {
  font-weight: normal;
  font-size: 1rem;
  margin: 0 0 1rem;
  text-overflow: ellipsis;
 }

 span {
  font-size: 1.1rem;
 }

 @media screen and (max-width: 800px) {
    p {
      font-size: .9rem;
      margin-bottom: 5px;
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 5px;
    }
 }

 @media screen and (max-width: 650px) {
    max-width: 90%;
    P {
      font-size: .75rem;
    }

    span {
      font-size: .8rem;
      margin: 5px 0;
    }

      h1 {
        font-size: 1rem;
      }
 }

`

export const Price = styled.span`
  font-style: italic;
  font-weight: bold;
`

export const ListItems = styled.div`
  width: calc(25% - 20px);
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 764px) {
    display: none;
    width: 100%;
    margin: 0;
    flex-direction: row;
  }
`

interface ButtonProps {
  isSelected: boolean
}

export const ListButtonsContainer = styled.div`
  width: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 30px;
    cursor: pointer;
  }

  @media screen and (max-width: 764px) {
    display: flex;
  }
`

export const ListButtons = styled.div`
  width: 150px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`

export const ListButton = styled.div<ButtonProps>`
  background-color: ${props => props.isSelected ? vars.color : vars.colorAlpha};
  width: 5px;
  height: 5px;
  border-radius: 100%;
  cursor: pointer;
`

export const Item = styled.div<StyleProps>`
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  width: 100%;
  height: calc(20% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: .15s linear; 
  
  span {
    width: 75%;
    font-size: 1rem;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;

    @media screen and (max-width: 764px) {
      font-size: .8rem;
    }
  }

  &:hover {
    background-color: #1115;
  }

  img {
    border-radius: 5px;
    margin-right: 10px;
    height: 80%;
    width: 25%;
    object-fit: cover;
    z-index: 0;
  }
`

export const ItemSkeleton = styled(Skeleton)`
  width: 100%;
  height: calc(20% - 10px);
  border-radius: 5px;
`

export const ProgressBar = styled.div<StyleProps> `
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  height: 100%;
  width: ${props => `${props.progressWidth}%`};
  background: #000;
  z-index: -1;
  transition:  2.5s linear;
`

export const Button = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  width: 200px;
  margin-top: 20px;
  padding: 10px 5px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  border: 2px solid ${vars.secundaryColor};
  outline: 0;
  color: #fff;
  background-color: transparent;
  border-radius: 10px;
  transition: .3s;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
  
  &:hover {
    background-color: ${vars.secundaryColor};
    border: 2px solid ${vars.secundaryColor};
  }

  @media screen and (max-width: 650px) {
    margin-top: 5px;
    width: 120px;
    padding: 6px 4px;
    font-size: .9rem;
    background-color: ${vars.secundaryColor};
    border: 2px solid ${vars.secundaryColor};
  }
`

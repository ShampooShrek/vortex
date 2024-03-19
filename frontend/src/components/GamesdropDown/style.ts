"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  isHover?: boolean
  imagesLength?: number
  firstImage?: boolean
  rotation?: boolean
  index?: number | null
  isShow?: boolean
}

export const DropCardContainer = styled.div<StyledProps>`

  pointer-events: none;
  padding: 10px;
  width: 300px;
  position: absolute;
  top: 0%;
  transform: translateY(0%);
  ${props => {
    if (props.index === null) {
      return `
        left: calc(100% + 10px);
      `
    } else {
      if (props.index! % 3 !== 0) {
        return `
          left: calc(100% + 10px);
        `
      } else {
        return "right: calc(100% + 10px);"
      }
    }
  }};
  display: flex;
  flex-direction: column;
  z-index: 5;
  opacity: ${props => props.isHover ? 100 : 0};
  border-radius: 5px;
  background-color: ${vars.dropDown.background};
  transition: opacity .3s ease-in-out;

  &::before {
   content: "";
   position: absolute;
   top: 30px;
   ${props => {
    if (props.index === null) {
      return `
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-style: solid;
      border-color: transparent ${vars.dropDown.borderColor} transparent transparent;
    `
    } else {
      if (props.index! % 3 !== 0) {
        return `
          left: -10px;
          border-width: 10px 10px 10px 0;
          border-style: solid;
          border-color: transparent ${vars.dropDown.borderColor} transparent transparent;
        `
      } else {
        return `
        right: -10px;
        border-width: 10px 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent transparent ${vars.dropDown.borderColor};
      `
      }
    }
  }};
   z-index: 2;
  } 

  & > * {
    margin-bottom: 10px;
  }

  h4 {
    font-weight: normal;
  }

  @media screen and (max-width: 960px) {
    display: none;
  }

`

export const Title = styled.h3`
  font-weight: normal;
`

export const Description = styled.div`
  font-size: .8rem;
  color: #ddd;
  text-align: left;
`

export const CarouselContainer = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
`

export const ImagesCarousel = styled.div<StyledProps>`
  width: calc(100% * ${props => props.imagesLength});
  display: flex;
  justify-content: start;
  height: 100%;
`

export const ImageCarousel = styled.img<StyledProps>`
  position: relative;
  width: calc(100% / ${props => props.imagesLength});
  height: 100%;
  object-fit: cover;
  margin-left: calc(-${props => props.firstImage && props.rotation ? "100% / " + props.imagesLength : `0`});
  transition: margin .5s;
`

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;  
`

export const Category = styled.span`
  font-size: .8rem;
  padding: 5px;
  margin-right: 2px;
  color: ${vars.color};
  background-color: ${vars.secundaryColor};
  border-radius: 5px;

  &:last-child {
    margin-right: 0;
  }
`

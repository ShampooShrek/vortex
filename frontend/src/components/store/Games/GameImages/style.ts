"use client"

import vars from '@/styles/vars';

//@ts-ignore
import VideoTumbnail from "react-video-thumbnail"

import styled from "styled-components";

interface StyledProps {
  background?: boolean
  fontSize?: number
  menosMargin?: number
  width: number
}

export const GameImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`

export const SelectedImage = styled.img`
  width: 100%;
  object-fit: cover;
`

export const SelectedVideo = styled.video`
  width: 100%;

  sorce {
    width: 100%;
  }
`

export const ListImagesContainer = styled.div`
  /* background-color: #333; */
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

export const CarouselImagesContainer = styled.div`
  width: 80%;
`

export const Images = styled.div`
  background-color: #333;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
`

export const Image = styled.img<StyledProps>`
  cursor: pointer;
  width: calc((${props => props.width}px / 5) - 5px);
  height: calc((${props => props.width}px / 5) * 0.6 - 5px);

  &:not(:last-child) {
    margin-right: 5px;
  }

  @media screen and (max-width: 1600px) {
    width: calc((${props => props.width}px / 4) - 5px);
    height: calc((${props => props.width}px / 4)* 0.6 - 5px);
  }
`

export const VideoTumbnailRender = styled.div<StyledProps>`
  cursor: pointer;
  position: relative;
  width: calc((${props => props.width}px / 5) - 5px);
  height: calc((${props => props.width}px / 5) * 0.6 - 5px);

  &:not(:last-child) {
    margin-right: 5px;
  }

  @media screen and (max-width: 1600px) {
    width: calc((${props => props.width}px / 4) - 5px);
    height: calc((${props => props.width}px / 4)* 0.6 - 5px);
  }

  div img {
    width: 100%;
    height: 100%;
  }

  svg {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    opacity: .4;
  }

  canvas {
    max-width: 125px;
  }

`

export const Title = styled.h3`
  font-size: 1.5rem;

  @media screen and (max-width: 1600px) {
    font-size: 1.2rem
  }
`
export const Bar = styled.div`
  width: 80%;
  height: 2px;
  background-color: #555;
  border-radius: 50%;
  margin: 5px 0;
`


"use client"

import styled from "styled-components"

interface StyledProps {
  gameIndex: number
  itemsLenght:number
  isAnim: boolean
  width: number
  cardMargin: number
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

export const CarouselItems = styled.div<StyledProps>`
  display: flex;
  transform: translateX(calc(-${({ cardMargin, gameIndex, itemsLenght, width }) => 
    (width + cardMargin) * (gameIndex / itemsLenght)}px));
`

"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import * as C from "./style"

interface CarouselProps {
  itemIndex: number
  isAnim: boolean
  setIsAnim(): void
  children: ReactNode
  cardMargin: number
  itemsLength: number
}

export function Carousel({ children, itemIndex, isAnim, cardMargin, itemsLength, setIsAnim}: CarouselProps ) {

  const carouselItemsRef = useRef<HTMLDivElement>(null) 
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    setWidth(carouselItemsRef?.current?.offsetWidth ?? 0)
  }, [carouselItemsRef?.current?.offsetWidth])

  return (
    <C.Container>
    <C.CarouselContainer>
      <C.CarouselItems cardMargin={cardMargin} itemsLenght={itemsLength} width={width} 
      ref={carouselItemsRef} style={{ transition: isAnim  ? "transform .5s ease" : "0s" }} 
      isAnim gameIndex={itemIndex} onTransitionEnd={setIsAnim}>
        {children}
      </C.CarouselItems>
    </C.CarouselContainer>

    </C.Container>
  
  )
}


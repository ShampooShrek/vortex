"use client"

import { useState, useEffect } from "react"
import * as S from "./style"
import { GameCategories, GameImages } from "@/models/dbModels"

interface GameCardDropDownProps {
  synopsi: string
  name: string
  isHover: boolean
  images: GameImages[]
  categories: GameCategories[]
  index: number | null
}

const GameCardDropDown = ({ images: propImages, name, synopsi, categories, isHover, index }: GameCardDropDownProps) => {
  const [images, setImages] = useState<GameImages[]>(propImages)
  const [rotation, setRotation] = useState(false)

  useEffect(() => {
    const intervalfoda = setInterval(() => {
      if (isHover) carouselImages()
    }, 1000)

    return () => {
      clearInterval(intervalfoda)
    }
  }, [images, isHover])

  const carouselImages = () => {
    setRotation(true)
    setTimeout(() => {
      let newImages = [...images]
      const firstImage = images.slice(0, 1)
      newImages.shift()
      newImages.push(...firstImage)
      setImages(newImages)
      setRotation(false)
    }, 500)
  }

  return (
    <S.DropCardContainer index={index} isHover={isHover}>
      <S.Title>{name}</S.Title>
      <S.Description>{synopsi}</S.Description>
      <S.CarouselContainer>
        <S.ImagesCarousel imagesLength={images.length}>
          {images.map((img, i) => (
            <S.ImageCarousel imagesLength={images.length} rotation={rotation} firstImage={i === 0} key={`${name}--${i}--${img.name}`} src={img.url} alt={img.name} />
          ))}
        </S.ImagesCarousel>
      </S.CarouselContainer>
      <h4>Categorias: </h4>
      <S.CategoriesContainer>
        {categories.map((cat, i) => (
          <S.Category key={`dropDown-cat-${cat.id}-${cat.category}-${name}-${i}`}>
            {cat.category}
          </S.Category>
        ))}
      </S.CategoriesContainer>

    </S.DropCardContainer>
  )
}

export default GameCardDropDown

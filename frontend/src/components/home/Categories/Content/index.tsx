"use client"

import { Carousel } from "@/components/Carousel"
import * as S from "./style"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "@/components/Icons"
import slugfyString from "@/utils/urlSlug"
import { GameCategories } from "@/models/dbModels"


interface CategoriesProps {
  section: string
  categories: GameCategories[]
}

export default function Content({ section, categories }: CategoriesProps) {
  const [itemIndex, setItemIndex] = useState<number>(0)
  const [carouselItemsQtde, setCarouselItemsQtde] = useState(5)
  const [isAnim, setIsAnim] = useState<boolean>(false)
  const [marginCard, setImageWidth] = useState(10 - (10 / Math.ceil(categories.length / carouselItemsQtde)))

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("DOMContentLoaded", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    const clientWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth

    if (clientWidth > 960) {
      setCarouselItemsQtde(5)
    } else if (clientWidth < 960 && clientWidth > 764) {
      setCarouselItemsQtde(4)
    } else if (clientWidth < 764 && clientWidth > 600) {
      setCarouselItemsQtde(3)
    } else if (clientWidth < 600 && clientWidth > 510) {
      setCarouselItemsQtde(1)
    } else {
      setCarouselItemsQtde(1)
    }

    setIsAnim(true);
  };

  useEffect(() => {
    setImageWidth(10 - (10 / Math.ceil(categories.length / carouselItemsQtde)))
  }, [carouselItemsQtde])


  const handleLeftButton = () => {
    if (itemIndex > 0) {
      setIsAnim(true)
      setItemIndex((index) => Math.max(0, index - carouselItemsQtde))
    }
  }

  const handleRightButton = () => {
    if (itemIndex < categories.length - carouselItemsQtde) {
      setIsAnim(true)
      setItemIndex((index) => Math.min(index + carouselItemsQtde, categories.length - carouselItemsQtde))
    }
  }


  return (
    <S.Container>
      <S.SectionAndButtons>
        {section && <h2>{section}</h2>}
        <S.Buttons>
          <ArrowLeft onClick={handleLeftButton} />
          <ArrowRight onClick={handleRightButton} />
        </S.Buttons>
      </S.SectionAndButtons>
      <Carousel cardMargin={10} itemsLength={categories.length} setIsAnim={() => setIsAnim(false)} isAnim itemIndex={itemIndex} >
        {categories.map((cat) => {
          const slugCat = slugfyString(cat.category)
          return (
            <S.CategoryCard href={`/store/category/${slugCat}`} replace marginRight={marginCard < 5 ? 5 : marginCard} key={cat.category}>
              <img src={cat.imgUrl} />
              <S.CategoryName>
                <p>{cat.portugueseName}</p>
              </S.CategoryName>
            </S.CategoryCard>
          )
        })}
      </Carousel>
    </S.Container>

  )
}

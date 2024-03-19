"use client"

import { Carousel } from "@/components/Carousel"
import * as S from "./style"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, PlayIcon } from "@/components/Icons"
import { GamesStore } from "@/models/frontModels"

//@ts-ignore
import VideoTumbnail from "react-video-thumbnail"

interface GameContainerProps {
  game: GamesStore
  selectedItem: number
  selectItem(index: number, type: "video" | "image"): void
  type: "video" | "image"
}

const StoreGameImages = ({ game, selectedItem, selectItem, type }: GameContainerProps) => {
  const images = game.images
  const videos = game.videos
  const min = 5 - (5 / Math.ceil((images.length + videos.length) / 4))

  const [itemIndex, setItemIndex] = useState<number>(0)
  const [isAnim, setIsAnim] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)

  const ListWidth = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (ListWidth.current) {
        setWidth(ListWidth.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    setIsAnim(true)
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [game, selectItem]);

  useEffect(() => {
    if (type === "video" && videoRef && videoRef.current !== null) {
      const getUrl = async () => {
        const resp = await blobUrl(videos[selectedItem].url)
        videoRef.current!.src = resp
      }
      getUrl()
    }
  }, [selectedItem, type])

  const blobUrl = async (url: string) => {
    const resp = await fetch(url)
    const blob = await resp.blob()
    const blobUrl = URL.createObjectURL(blob)
    return blobUrl
  }


  const handleLeftButton = () => {
    if (itemIndex > 0) {
      setIsAnim(true)
      setItemIndex((index) => Math.max(0, index - 4))
    }
  }

  const handleRightButton = () => {
    if (itemIndex < (images.length + videos.length) - 4) {
      setIsAnim(true)
      setItemIndex((index) => Math.min(index + 4, (images.length + videos.length) - 4))
    }
  }

  return (
    <S.GameImages>
      {type === "image" ? (
        <S.SelectedImage src={images[selectedItem].url} />
      ) : (
        <S.SelectedVideo ref={videoRef} controls />
      )}
      <S.ListImagesContainer  >
        <ArrowLeft onClick={handleLeftButton} />
        <S.CarouselImagesContainer ref={ListWidth}>
          <Carousel cardMargin={5} itemsLength={(images.length + videos.length)} itemIndex={itemIndex} setIsAnim={() => setIsAnim(false)} isAnim>
            {width > 0 && (
              <>
                {videos.map((video, i) => (
                  <S.VideoTumbnailRender key={`${i}--video--${video.name}`} onClick={() => selectItem(i, "video")} width={width}>
                    <PlayIcon />
                    <VideoTumbnail
                      videoUrl={video.url} />
                  </S.VideoTumbnailRender>
                ))}
                {images.map((img, i) => (
                  <S.Image width={width} menosMargin={min} onClick={() => selectItem(i, "image")}
                    src={img.url} key={`${i}--imgs--${img.name}`} />
                ))}
              </>
            )}
          </Carousel>
        </S.CarouselImagesContainer>
        <ArrowRight onClick={handleRightButton} />
      </S.ListImagesContainer>
    </S.GameImages>
  )
}

export default StoreGameImages

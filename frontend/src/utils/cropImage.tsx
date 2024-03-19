"use client"

import { ChangeEvent, ChangeEventHandler, Ref, RefObject, useEffect, useRef, useState } from "react"
import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop"

interface CropImageProps {
  cropWidth: number
  cropHeight: number
  minWidth: number
  minHeight: number
  maxWidth: number
  maxHeight: number
  imageName: string
  imageSearch: string
  cropedImageUrl: string
  circular?: boolean
  cropedImageBlob: Blob | null
  // onChange(ev: ChangeEvent<HTMLInputElement>): ChangeEventHandler<HTMLInputElement>
  handleCropedImageBlob(blob: Blob): void
  handleCropedImageUrl(src: string): void
}

const CropImage = ({
  cropHeight,
  cropWidth,
  handleCropedImageBlob,
  handleCropedImageUrl,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  imageSearch,
  circular = false
}: CropImageProps) => {

  const imageRef = useRef<HTMLImageElement>(null)

  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: cropWidth,
    height: cropHeight
  })

  const cropImage = async (crop: Crop,) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImage: croppedResponse = await getCroppedImage(crop)
      if ("url" in croppedImage) {
        handleCropedImageUrl(croppedImage.url)
        handleCropedImageBlob(croppedImage.blob)
      }
    }
  }

  type croppedResponse = {
    url: string
    blob: Blob
  } | Error


  const getCroppedImage = (cropConfig: Crop): Promise<croppedResponse> => {
    const image = imageRef.current as HTMLImageElement

    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = cropConfig.width
    canvas.height = cropConfig.height

    const ctx = canvas.getContext("2d")
    ctx?.drawImage(
      image, //Imagem a ser desenhada
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    )

    return new Promise((res, rej) => {
      canvas.toBlob(blob => {
        if (!blob) {
          rej(new Error("canvas empty"))
          return
        }

        const croppedImageUrl = URL.createObjectURL(blob)
        res({ url: croppedImageUrl, blob })
      }, "image/jpeg")
    })
  }

  const onCropChange = (crop: PixelCrop, percentCrop: PercentCrop) => setCrop(crop)

  return (
    <>
      <ReactCrop
        ruleOfThirds={true}
        crop={crop}
        aspect={150 / 150}
        circularCrop={circular}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
        // circularCrop={true}
        onComplete={cropImage}
        keepSelection={true}
        onChange={onCropChange} >
        <img ref={imageRef} src={imageSearch} />
      </ReactCrop>

    </>

  )
}


export default CropImage

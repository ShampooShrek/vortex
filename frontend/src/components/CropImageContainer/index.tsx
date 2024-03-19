"use client"

import CropImage from "@/utils/cropImage"
import * as S from "./style"
import { XIcon } from "@/components/Icons"

import { ChangeEvent, useState } from "react"


interface CropImageContainerProps {
  cancelCrop(): void
  saveCrop(blob: Blob): void
  imageName: string
  imageSearch: string
  circular?: boolean
}

const CropImageContainer = ({
  cancelCrop,
  imageName,
  imageSearch,
  saveCrop,
  circular = true
}: CropImageContainerProps) => {

  const [isAdvanced, setIsAdvanced] = useState(false)
  const [croppedImageUrl, setCroppedImageUrl] = useState("")
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null)

  const handleCroppedImageUrl = (src: string) => {
    setCroppedImageUrl(src)
  }

  const handleCroppedImageBlob = (blob: Blob) => {
    setCroppedBlob(blob)
  }

  return (
    <S.Container>
      <S.BlackCoisa />
      <S.Card >
        {isAdvanced && <S.BlackCoisaCard />}
        <S.CardHeader>
          <XIcon onClick={cancelCrop} />
          <span>Cortar Imagem</span>
          <span></span>
        </S.CardHeader>
        <S.CroppedImageContainer>
          <CropImage
            circular={circular}
            cropHeight={50}
            cropWidth={50}
            maxHeight={400}
            maxWidth={400}
            minHeight={20}
            minWidth={20}
            imageName={imageName}
            imageSearch={imageSearch}
            cropedImageUrl={croppedImageUrl}
            cropedImageBlob={croppedBlob}
            handleCropedImageBlob={handleCroppedImageBlob}
            handleCropedImageUrl={handleCroppedImageUrl}
          />
        </S.CroppedImageContainer>
        <S.AdvancedButton onClick={() => setIsAdvanced(true)} >Avançar</S.AdvancedButton>
        <S.ViewCroppedImage isAdvanced={isAdvanced}>
          <span>Resultado:</span>
          <S.CroppedImageResult circular={circular} src={croppedImageUrl} />
          <S.ButtonsContainer>
            <S.CancelButton onClick={() => setIsAdvanced(false)}>Cancelar</S.CancelButton>
            <S.SaveButton onClick={() => saveCrop(croppedBlob!)}>Salvar</S.SaveButton>
          </S.ButtonsContainer>
        </S.ViewCroppedImage>
      </S.Card>
    </S.Container>
  )
}

export default CropImageContainer

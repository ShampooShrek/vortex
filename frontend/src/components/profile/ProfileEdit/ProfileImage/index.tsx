"use client"

import { UserImage } from "@/models/dbModels"
import SectionTemplate from "../../ProfileDetailsSocialsLayout/SectionTemplate"
import * as S from "./style"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import api from "@/services/api"
import authHook from "@/data/hooks/authHook"
import { Response } from "@/models/frontModels"
import CropImageContainer from "@/components/CropImageContainer"


interface ProfileImageProps {
  image: UserImage | null
}

const ProfileImage: React.FC<ProfileImageProps> = ({ image }) => {

  const { setUser, user } = authHook()

  const inputRef = useRef<HTMLInputElement>(null)
  const [imageName, setImageName] = useState("")
  const [imageSearch, setImageSearch] = useState("")
  const [croppedImage, setCroppedImage] = useState<string>("")

  const cancelEvent = () => {
    setImageName("")
    setImageSearch("")
    setCroppedImage("")
  }

  const saveEvent = async (croppedBlobImage: Blob) => {
    if (croppedBlobImage) {
      const form = new FormData()
      const imageFile = new File([croppedBlobImage], imageName, {
        type: "image/jpg"
      })
      form.append("file", imageFile)
      const response = await api.post(`/api/users/${user?.id}/image`, form)
      const data: Response<UserImage | string> = response.data
      if (typeof data.response !== "string") {
        setUser(u => ({ ...u!, image: data.response as UserImage }))
        cancelEvent()
      }
    }
  }

  const createImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const image = new Image()
      image.src = URL.createObjectURL(file)

      image.onload = () => {
        const minWidth = 200
        const minHeight = 200

        if (image.width < minWidth || image.height < minHeight) {
          alert("Imagem deve ter tamanho minimo de 200x200")
        } else {
          const url = URL.createObjectURL(file)
          setImageSearch(url)
          setImageName(file.name)
        }
      }
    }
  }

  const handleInputRef = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <SectionTemplate section="Foto de Perfil">
      <S.Container>
        <S.UserImageContaienr>
          {croppedImage ? (
            <S.UserImage src={croppedImage} alt="" />
          ) : <S.UserImage src={user!.image ? user!.image.url : "/player.jpg"} />}

          <S.InputFile onClick={handleInputRef}>Selecione uma imagem</S.InputFile>
          <input
            onChange={createImage}
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
          />
        </S.UserImageContaienr>
        {imageSearch && (
          <CropImageContainer
            saveCrop={saveEvent}
            cancelCrop={() => setImageSearch("")}
            imageName={imageName}
            imageSearch={imageSearch}
          />
        )}
      </S.Container>
    </SectionTemplate>
  )
}


export default ProfileImage

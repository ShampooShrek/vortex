"use client"

import { GroupBanner, GroupImage } from "@/models/dbModels"
import * as S from "./style"
import { EditIcon, FilterIcon } from "@/components/Icons"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import CropImageContainer from "@/components/CropImageContainer"
import api from "@/services/api"
import authHook from "@/data/hooks/authHook"
import { Groups, Response } from "@/models/frontModels"
import messageAuth from "@/data/hooks/messageHook"

interface GroupHeaderProps {
  image: GroupImage | null
  banner: GroupBanner | null
  name: string
  section?: string
  type: "PUBLIC" | "PRIVATE" | "RESTRICT"
  userInGroup: boolean
  groupId: number
}

const GroupHeader = ({ name, banner, image, section, type, userInGroup, groupId }: GroupHeaderProps) => {
  let buttonText = ""
  const { showMessageBox } = messageAuth()

  if (type === "PRIVATE") buttonText = "Enviar Pedido"
  else if (type === "PUBLIC") buttonText = "Entrar"

  const handleButtonClick = async () => {
    if (type === "PRIVATE") {
      const response = await api.post(`/api/groups/user/request/${groupId}`)
      const data: Response<string> = response.data
      if (data.type === "success") {
        alert("Pedido enviado com sucesso")
      } else {
        showMessageBox(data.response, "error")
      }
    } else {
      const response = await api.post(`/api/groups/user/request/${groupId}`)
      const data: Response<string> = response.data
      if (data.type === "success") {
        alert("Pedido enviado com sucesso")
      } else {
        showMessageBox(data.response, "error")
      }
    }
  }

  return (
    <S.Container imageUrl={banner ? banner.url : "/group_banner.jpg"}>
      <S.Content>
        <img src={image ? image.url : "/group_image.jpg"} alt="" />
        <span>{name} {section && ` - ${section}`} </span>
        {!userInGroup && <S.GroupHeaderButton onClick={handleButtonClick}>{buttonText}</S.GroupHeaderButton>}
      </S.Content>
    </S.Container>
  )
}

export default GroupHeader

interface GroupHeaderEditProps {
  section: string
  group: Groups
}

export const GroupHeaderEdit = ({ section, group: PropGroups }: GroupHeaderEditProps) => {

  const { setUser, user, loading } = authHook()
  const { showMessageBox } = messageAuth()


  const [group, setGroup] = useState(PropGroups)
  const [imageGroup, setImageGroup] = useState<string>(group.image ? group.image.url : "/group_image.jpg")
  const [bannerGroup, setBannerGroup] = useState<string>(group.banner ? group.banner.url : "/group_banner.jpg")
  const [imageSearch, setImageSearch] = useState("")
  const [imageName, setImageName] = useState("")
  const refInputImage = useRef<HTMLInputElement>(null)
  const refInputBanner = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const findGroup = user!.adminGroups?.find(g => g.id === PropGroups.id)
    if (findGroup) {
      setGroup(findGroup)
    }
  }, [user])


  const handleImageInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      const image = new Image()
      image.src = fileUrl

      image.onload = () => {
        const minWidth = 200
        const minHeight = 200

        if (image.width < minWidth || image.height < minHeight) {
          alert("A imagem deve ser de no minimo 200x200")
        } else {
          setImageName(file.name)
          setImageSearch(fileUrl)
        }
      }
    }
  }

  const handleBannerInput = async (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      const imageResponse = await api.put(`/api/groups/update/${group.id}/images/banner`, formData)
      const data = imageResponse.data
      if (data.type === "success") {
        const imageData: Groups = data.response
        setUser(prevUser => {
          const { adminGroups } = prevUser!
          const groupAdminIndex = adminGroups!.findIndex(g => g.id === group.id)
          if (groupAdminIndex !== -1) {
            const prevAdminGroups = [...adminGroups!]
            prevAdminGroups[groupAdminIndex] = { ...prevAdminGroups[groupAdminIndex], ...imageData }
            return { ...prevUser!, adminGroups: prevAdminGroups }
          } else {
            return prevUser!
          }
        })
        const bannerUrl = URL.createObjectURL(file)
        setBannerGroup(bannerUrl)
      } else {
        showMessageBox(data.response as string, "error")
      }
    }
  }

  const handleInputImageClick = () => {
    if (refInputImage.current) {
      refInputImage.current.click()
    }
  }

  const handleInputBannerClick = () => {
    if (refInputBanner.current) {
      refInputBanner.current.click()
    }
  }

  const saveImage = async (blob: Blob) => {
    if (blob) {
      const file = new File([blob], imageName, {
        type: blob.type
      })
      const formData = new FormData()
      formData.append("file", file)
      const imageResponse = await api.put(`/api/groups/update/${group.id}/images/image`, formData)

      const data = imageResponse.data
      if (data.type === "success") {
        const imageData: Groups = data.response
        setUser(prevUser => {
          const { adminGroups } = prevUser!
          const groupAdminIndex = adminGroups!.findIndex(g => g.id === group.id)

          if (groupAdminIndex !== -1) {
            const prevAdminGroups = [...adminGroups!]
            prevAdminGroups[groupAdminIndex] = { ...prevAdminGroups[groupAdminIndex], ...imageData }
            setImageGroup(imageData.image.url)
            return { ...prevUser!, adminGroups: prevAdminGroups }
          } else {
            return prevUser!
          }
        })
      } else {
        showMessageBox(data.response as string, "error")
      }
      setImageSearch("")
    }
  }

  if (loading) return <></>

  return (
    <S.Container imageUrl={bannerGroup}>
      <S.EditButton>
        <EditIcon onClick={handleInputBannerClick} />
      </S.EditButton>
      <input
        onChange={handleImageInput}
        type="file"
        accept="image/*"
        ref={refInputImage}
        style={{ display: "none" }} />
      <input
        onChange={handleBannerInput}
        type="file"
        accept="image/*"
        ref={refInputBanner}
        style={{ display: "none" }} />
      <S.Content>
        <S.ImageEdit>
          <img src={imageGroup} />
          <S.EditButton>
            <EditIcon onClick={handleInputImageClick} />
          </S.EditButton>
        </S.ImageEdit>
        <span>{group.name} {section && ` - ${section}`} </span>
      </S.Content>
      {imageSearch && (
        <CropImageContainer
          circular={false}
          cancelCrop={() => setImageSearch("")}
          imageName={imageName}
          imageSearch={imageSearch}
          saveCrop={saveImage}
        />
      )}
    </S.Container>
  )
}

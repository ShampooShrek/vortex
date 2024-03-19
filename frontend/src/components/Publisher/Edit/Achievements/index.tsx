"use client"

import { useState, useRef, useEffect } from "react"
import { AchievementImage, GameAchievements } from "@/models/dbModels"
import * as S from "./style"
import ButtonsContainer from "@/components/ButtonsContainer"
import FormInput from "@/components/Inputs/FormInput"
import Select from "@/components/Select"
import { EditIcon, PlusIcon, Trash } from "@/components/Icons"
import PublisherEditTextBox from "../TextBox"
import ApiRequest from "@/utils/ApiRequests"
import { useParams } from "next/navigation"
import messageAuth from "@/data/hooks/messageHook"

interface PublisherEditAchievemnetsProps {
  achievements: GameAchievements[] | null
  handleUpdateGame(data: any): void
}

interface FormCreate {
  title: string
  description: string
  level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM"
  file: File | null
  type: "DEFAULT" | "SECRET"
  imgUrl: string | null

}

const PublisherEditAchievemnets = ({ achievements: propAchievements, handleUpdateGame }: PublisherEditAchievemnetsProps) => {

  const { gameId } = useParams()
  const { showMessageBox } = messageAuth()

  const [achievements, setAchivements] = useState<GameAchievements[]>(propAchievements ?? [])

  const [inResponse, setInResponse] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [typeForm, setTypeForm] = useState<"create" | "update">("create")
  const [achievementId, setAchievementId] = useState(0)
  const [formCardCreate, setFormCardCreate] = useState<FormCreate>({
    description: "", file: null, level: "BRONZE", title: "", type: "DEFAULT", imgUrl: null
  })
  const inputFormCardCreateRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    handleUpdateGame({ achievements })
  }, [achievements])

  const handleInputfileCLick = () => {
    if (inputFormCardCreateRef.current) {
      inputFormCardCreateRef.current.click()
    }
  }

  const handleAlterImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      const newImg = new Image()
      newImg.src = fileUrl

      newImg.onload = () => {
        if (newImg.width >= 60) {
          if (newImg.width !== newImg.height) {
            alert("tamanho n confere")
          } else {
            setFormCardCreate(prevForm => ({ ...prevForm, file, imgUrl: fileUrl }))
          }
        } else {
          alert("Tamanho n confere")
        }
      }
    }
  }

  const saveForm = async () => {
    setInResponse(true)
    const url = typeForm === "update" ? `/api/games/${gameId}/achievements/${achievementId}`
      : `/api/games/${gameId}/achievements`
    const method = typeForm === "create" ? "post" : "put"

    const respAchievement = await ApiRequest<GameAchievements>(url, method, formCardCreate)
    if (respAchievement) {
      if (respAchievement.type === "success") {
        const dataAchievement = respAchievement.response as GameAchievements
        if (dataAchievement) {
          let achievement = dataAchievement
          const index = achievements.findIndex(ac => ac.id === dataAchievement.id)
          if (formCardCreate.file) {
            const form = new FormData()
            form.append("file", formCardCreate.file)
            const dataImage = await ApiRequest<AchievementImage>(`/api/games/achievements/${dataAchievement.id}/image`, "post", form)
            if (dataImage) {
              if (dataImage.type === "success") {
                achievement = { ...achievement, image: dataImage.response as AchievementImage }
              } else {
                showMessageBox(dataImage.response as string, "error")
              }
            }
          }
          if (index >= 0) {
            const updatedAchievements = [...achievements]
            updatedAchievements[index] = { ...updatedAchievements[index], ...achievement }
            setAchivements(updatedAchievements)
          } else {
            setAchivements(prevAchivements => [achievement, ...prevAchivements])
          } 2
        }
        setIsOpen(false)
        setFormCardCreate({
          description: "", file: null, level: "BRONZE", title: "", type: "DEFAULT", imgUrl: null
        })
      } else {
        showMessageBox(respAchievement.response as string, "error")
      }
    }
  }

  const deleteAchievement = async ({ id }: GameAchievements) => {
    const data = await ApiRequest(`/api/games/${gameId}/achievements/${id}`, "delete")
    if (data && data.type === "success") {
      setAchivements(prevAchievements => prevAchievements.filter(ac => ac.id !== id))
    } else if (data && data.type === "error") {
      showMessageBox(data?.response as string, "error")
    }
  }

  const handleFormOnChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = ev.target
    setFormCardCreate(prevForm => ({ ...prevForm, [name]: value }))
  }

  const handleCancelForm = () => {
    setFormCardCreate({
      description: "", file: null, level: "BRONZE", title: "", type: "DEFAULT", imgUrl: null
    })
    setIsOpen(false)
    setTypeForm("create")
  }

  const handleEditForm = (achievement: GameAchievements) => {
    setFormCardCreate({ ...achievement, file: null, imgUrl: achievement.image ? achievement.image.url : null })
    setIsOpen(true)
    setAchievementId(achievement.id)
    setTypeForm("update")
  }

  const handleCreateForn = () => {
    setIsOpen(true)
    setTypeForm("create")
  }

  return (
    <S.Container>
      <PublisherEditTextBox
        sections={[
          {
            title: "Visão Geral", content: `Aqui você pode administrar os achievements do seu jogo, 
            você tem que adicionar uma imagem de tamanhos iguais com tamanhos maiores ou iguais a 60(por exemplo 64x64, 128x128, etc...), um titulo e uma descrição...`},
          {
            title: "Design", content: `Você pode classificar suas categorias por dificuldade, indo de bronze(mais fácil) até platina(mais dificil).
            Você pode também dizer se o tipo da conquista é padrão ou secreta, a categoria secreta não podera ser vista nem a descrição, nem o titulo
          ` }
        ]}
      />
      {isOpen && (
        <>
          <S.Black />
          <S.FormCardAchievements>
            <S.FormCardImage>
              <label htmlFor="">imagem:</label>
              <img onClick={handleInputfileCLick} src={formCardCreate.imgUrl ? formCardCreate.imgUrl : "/player.jpg"} />
              <input onChange={handleAlterImage} accept="image/*" ref={inputFormCardCreateRef} type="file" style={{ display: "none" }} />
            </S.FormCardImage>
            <FormInput
              onChange={handleFormOnChange}
              type="text"
              value={formCardCreate.title}
              label="Titulo:"
              name="title"
            />
            <FormInput
              onChange={handleFormOnChange}
              type="text"
              value={formCardCreate.description}
              label="Descrição:"
              name="description"
              marginBottom={false}
            />
            <S.SelectContainer>
              <Select
                name="level"
                options={[
                  { value: "BRONZE", text: "BRONZE" },
                  { value: "SILVER", text: "PRATA" },
                  { value: "GOLD", text: "OURO" },
                  { value: "PLATINUM", text: "PLATINA" }
                ]}
                onChange={handleFormOnChange}
                value={formCardCreate.level}
              />
              <Select
                name="type"
                options={[
                  { value: "DEFAULT", text: "PADRÂO" },
                  { value: "SECRET", text: "SECRETO" },
                ]}
                onChange={handleFormOnChange}
                value={formCardCreate.type}
              />
            </S.SelectContainer>
            <ButtonsContainer cancelClick={handleCancelForm} saveClick={saveForm} />
          </S.FormCardAchievements>
        </>
      )}
      <S.CardContainers>
        <S.AddAchievementButton onClick={handleCreateForn}>
          <PlusIcon />
        </S.AddAchievementButton>
        {achievements.map(ac => (
          <S.Card key={ac.id}>
            <S.CardLeft>
              <S.CardLeftImage>
                <img src={ac.image?.url} alt="" />
              </S.CardLeftImage>
              <S.CardLeftContent>
                <S.CardLeftTitle>{ac.title}</S.CardLeftTitle>
                <S.CardLeftDescription>{ac.description}</S.CardLeftDescription>
              </S.CardLeftContent>
            </S.CardLeft>
            <S.CardRight firstIconColor="green" secondIconColor="red" >
              <EditIcon onClick={() => handleEditForm(ac)} />
              <Trash onClick={() => deleteAchievement(ac)} />
            </S.CardRight>
          </S.Card>
        ))}
      </S.CardContainers>
    </S.Container>
  )
}

export default PublisherEditAchievemnets

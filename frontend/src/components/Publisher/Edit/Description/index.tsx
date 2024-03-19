"use client"

import { GameImages } from "@/models/dbModels";
import * as S from "./style"
import PublisherEditTextBox from "../TextBox";
import TextArea from "@/components/TextArea";
import { PublisherEditSectionTemplate } from "../PublisherEditTemplate";
import { ChangeEvent, useRef, useState } from "react";
import api from "@/services/api";
import { useParams } from "next/navigation";
import { GamesStoreEdit, Response } from "@/models/frontModels";
import ButtonsContainer from "@/components/ButtonsContainer";
import authHook from "@/data/hooks/authHook";
import messageAuth from "@/data/hooks/messageHook";

interface PublisherEditDescriptionProps {
  description: string
  gameDescriptionImages: GameImages[]
  handleUpdateGame(data: any): void
}

const PublisherEditDescription = ({ description: descriptionProps, gameDescriptionImages, handleUpdateGame }: PublisherEditDescriptionProps) => {
  const { gameId } = useParams()
  const { setUser } = authHook()
  const { showMessageBox } = messageAuth()
  const fileRef = useRef<HTMLInputElement>(null)

  const [gameImages, setGameImages] = useState<GameImages[]>(gameDescriptionImages)
  const [description, setDescription] = useState(descriptionProps)
  const [inRequest, setInRequest] = useState(false)

  const addDescriptionImage = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  const handleInputFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const form = new FormData()
      form.append("file", file)
      const response = await api.post(`/api/games/${gameId}/description_images`, form)
      const data: Response<GameImages> = response.data
      if (data.type === "success") {
        setGameImages(prevImages => [...prevImages, data.response as GameImages])
      }
    }
  }

  const CopyClick = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const handleSaveDesc = async () => {
    setInRequest(true)
    const response = await api.put(`/api/games/description/${gameId}`, { description })
    const data: Response<string> = response.data

    if (data.type === "success") {
      handleUpdateGame({ description })
      setUser(prevUser => {
        const userGamesDevs = [...prevUser!.gameDevelopers]
        const gameDevIndex = userGamesDevs.findIndex(g => g.id === Number(gameId))
        if (gameDevIndex >= 0) {
          userGamesDevs[gameDevIndex] = { ...userGamesDevs[gameDevIndex] }
          return { ...prevUser!, gameDevelopers: userGamesDevs }

        } else {
          return prevUser
        }
      })
      showMessageBox("Descrição atualizada com sucesso!", "success")
    } else {
      showMessageBox(data.response as string, "error")
    }
    setInRequest(false)
  }

  return (
    <S.Container>
      <PublisherEditTextBox
        sections={[{
          title: "Visão Geral:",
          content: `Use este espaço para descrever o seu jogo. você pode adicionar uma lista de características...
            dizer com detalhes sobre o seu jogo... etc
          `
        }, {
          title: "Design:",
          content: `Você pode adicionar imagens e gifs neste espaço por meio da seção "Enviar Imagens Personalizadas" abaixo.
          `
        }]}
      />
      <PublisherEditSectionTemplate title="Descrição:">
        <S.DescriptionContainer>
          <TextArea
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            textAreaStyle={{ width: "100%", marginTop: "10px", height: "400px" }}
          />
          <ButtonsContainer saveClick={inRequest ? () => { } : handleSaveDesc} isLoading={inRequest} cancelClick={() => setDescription(descriptionProps)} />
        </S.DescriptionContainer>
      </PublisherEditSectionTemplate>
      <PublisherEditSectionTemplate title="Enviar Imagens Personalizadas:" >
        <S.ButtonImagesContainer>
          <S.TextContainer>
            <span>Use esse espaço para enviar e genrenciar imagens personalizadas para uso nas seções de descrição.</span>
            <span>Copie a URL criada e use  a tag de imagem do BBCode para incorpora-la. Por exemplo [img]{"VORTEX_APP_IMAGE/exemplo.jpg"}[/img]</span>
          </S.TextContainer>
          <S.ButtonContainer>
            <input
              onChange={handleInputFileChange}
              accept="image/jpg, image/jpeg, image/png, image/gif"
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
            />
            <button onClick={addDescriptionImage}>Escolher Uma Imagem</button>
          </S.ButtonContainer>
        </S.ButtonImagesContainer>
      </PublisherEditSectionTemplate>
      <PublisherEditSectionTemplate title="Suas Imagens:">
        {gameImages && gameImages.length > 0 ? (
          <>
            <span>Clique para copiar a URL</span>
            <S.ImagesContainer>
              {gameImages.map(img => (
                <S.Image key={img.name} src={img.url} onClick={() => CopyClick(img.url)} />
              ))}
            </S.ImagesContainer>
          </>
        ) : (<span>Parece que você não tem nenhuma imagem... :D</span>)}
      </PublisherEditSectionTemplate>
    </S.Container>
  )
}

export default PublisherEditDescription

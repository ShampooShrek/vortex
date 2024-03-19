"use client"

import { useState } from "react"
import { GamesStore, UserAuth } from "@/models/frontModels"
import * as S from "./style"
import TextArea from "@/components/TextArea"
import { DeslikeIcon, LikeIcon } from "@/components/Icons"
import FormInput from "@/components/Inputs/FormInput"
import ApiRequest from "@/utils/ApiRequests"
import { Avaliations } from "@/models/dbModels"
import DateFormater from "@/utils/dateFormater"
import Link from "next/link"

interface PostAvaliationProps {
  game: GamesStore
  user: UserAuth
  avaliations: Avaliations[]
}

export default function PostAvaliation({ game, user, avaliations }: PostAvaliationProps) {

  const [userHaveAvaliation, setUserHaveAvaliation] = useState(avaliations.find(av => av.gameId === game.id))
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [avaliation, setAvaliation] = useState<null | "LIKE" | "DISLIKE">(null)

  const postAvaliation = async () => {
    if (!userHaveAvaliation) {
      const resp = await ApiRequest<Avaliations>(`/api/users/avaliations/${game.id}`, "post", { title, comment, avaliation })
      if (resp && resp.type === "success") {
        setUserHaveAvaliation(resp.response as Avaliations)
      }
    }
  }

  return (
    <S.Container>
      <S.Header>
        <h3>Você ja possui {game.name}!!</h3>
      </S.Header>
      <S.Content>
        {userHaveAvaliation ? (
          <>
            <S.ContentTileDescription>
              <h4>Você analisou este jogo {DateFormater(userHaveAvaliation.createdAt)}</h4>
            </S.ContentTileDescription>
            <S.DescriptionContainer>
              <Link style={{ textDecoration: "none" }} replace href={`/profile/${user!.id}/details/avaliations/${userHaveAvaliation.id}`}>
                <S.SendButton>
                  Ver a sua análise
                </S.SendButton>
              </Link>
            </S.DescriptionContainer>

          </>
        ) : (
          <>
            <S.ContentTileDescription>
              <h4>Escreva uma análise de {game.name}</h4>
              <span>Descreva o que gostou e o que não gostou neste jogo e se você o recomenda a outros.</span>
            </S.ContentTileDescription>
            <S.DescriptionContainer>
              <S.DescriptionImage src={user.image ? user.image.url : "/player.jpg"} />
              <S.DescriptionTextAside>
                <FormInput
                  type="text"
                  value={title}
                  onChange={ev => setTitle(ev.target.value)}

                  label="Titulo:"
                />
                <TextArea
                  label="Análise:"
                  value={comment}
                  onChange={ev => setComment(ev.target.value)}
                />
                <S.ButtonsContainer>
                  <S.LikeDeslikeButtonsContainer>
                    <span>Você recomenda este jogo?</span>
                    <S.LikeDeslikeButtons>
                      <S.LikeDeslikeButton
                        onClick={() => setAvaliation("LIKE")}
                        isSelected={avaliation === "LIKE"}>
                        <LikeIcon /> SIM
                      </S.LikeDeslikeButton>
                      <S.LikeDeslikeButton
                        onClick={() => setAvaliation("DISLIKE")}
                        isSelected={avaliation === "DISLIKE"}>
                        <DeslikeIcon /> NÃO
                      </S.LikeDeslikeButton>
                    </S.LikeDeslikeButtons>
                  </S.LikeDeslikeButtonsContainer>
                  <S.SendButton onClick={postAvaliation}>Publicar Análise</S.SendButton>
                </S.ButtonsContainer>
              </S.DescriptionTextAside>
            </S.DescriptionContainer>
          </>
        )}
      </S.Content>
    </S.Container>
  )
}

"use client"

import { Avaliations } from "@/models/dbModels"
import * as S from "./style"
import Link from "next/link"
import DateFormater from "@/utils/dateFormater"
import bbcode from "@/utils/bbcode"
import { DeslikeIcon, DeslikeIconSolid, LikeIcon, LikeIconSolid } from "@/components/Icons"
import { useState } from "react"
import TextArea from "@/components/TextArea"
import authHook from "@/data/hooks/authHook"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"
import FormInput from "@/components/Inputs/FormInput"
import { useRouter } from "next/navigation"

interface UserDetailsAvaliationsProps {
  avaliation: Avaliations
}

const UserDetailsAvaliations = ({ avaliation: PropAvaliation }: UserDetailsAvaliationsProps) => {
  const { user } = authHook()
  const { showMessageBox } = messageAuth()

  const router = useRouter()

  const { createdAt, game, userDateGameTime, userId, id } = PropAvaliation
  const [editMode, setEditMode] = useState<boolean>(false)
  const [comment, setComment] = useState(PropAvaliation.comment!)
  const [title, setTitle] = useState(PropAvaliation.title)
  const [avaliation, setAvaliation] = useState(PropAvaliation.avaliation)


  const [editForm, setEditForm] = useState({
    comment, title, avaliation
  })

  const handleUpdateComment = async () => {
    const resp = await ApiRequest(`/api/users/avaliations/${id}`, "put", editForm)
    if (resp) {
      if (resp.type === "success") {
        showMessageBox("Avaliação atualizada com sucesso!", "success")
        setComment(editForm.comment)
        setAvaliation(editForm.avaliation)
        setTitle(editForm.title)
        setEditMode(false)
      } else {
        showMessageBox(resp.response as string, "error")
      }
    } else {
      showMessageBox("Ops, algo deu errado, tente novamente mais tarde!", "error")
    }
  }

  const handleCancelComment = () => {
    setEditForm({ comment, avaliation, title })
    setEditMode(false)
  }

  const handleDeleteAvaliation = async () => {
    if (confirm("Deseja deletar permanentemente essa avaliação? Você poderá criar outra depois")) {
      const resp = await ApiRequest(`/api/users/avaliations/${id}`, "delete")
      if (resp) {
        if (resp.type === "success") {
          showMessageBox("Avaliação deletada com sucesso!", "success", () => router.push("/home"))
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.Avaliation avaliation={avaliation === "LIKE" ? "LIKE" : "DISLIKE"}>
          <S.AvaliationHeader inEditMode={editMode}>
            {editMode ? (
              <S.HeaderForm>
                <FormInput marginBottom={false} type="text" label={"Titulo:"} value={editForm.title!} onChange={ev => setEditForm(prev => ({ ...prev, title: ev.target.value }))} />
                <S.AvaliationButtons>
                  <S.LikeDeslikeButtons>
                    <S.LikeDeslikeButton
                      onClick={() => setEditForm(prev => ({ ...prev, avaliation: "LIKE" }))}
                      isSelected={editForm.avaliation === "LIKE"}>
                      <LikeIcon /> LIKE
                    </S.LikeDeslikeButton>
                    <S.LikeDeslikeButton
                      onClick={() => setEditForm(prev => ({ ...prev, avaliation: "DISLIKE" }))}
                      isSelected={editForm.avaliation === "DISLIKE"}>
                      <DeslikeIcon /> DISLIKE
                    </S.LikeDeslikeButton>
                  </S.LikeDeslikeButtons>
                </S.AvaliationButtons>
              </S.HeaderForm>
            ) : (
              <>
                {avaliation === "LIKE" ? <LikeIconSolid /> : <DeslikeIconSolid />}
                <S.AvaliationTitle>
                  <h3>{title}</h3>
                  <span>Jogou por {userDateGameTime.toString()}</span>
                </S.AvaliationTitle>

              </>
            )}
          </S.AvaliationHeader>
          <S.AvaliationContentContainer>
            <S.AvaliationDate>PUBLICADO EM {DateFormater(createdAt).toUpperCase()}</S.AvaliationDate>
            {user && user.id === userId && editMode ? (
              <TextArea value={editForm.comment ?? ""} onChange={ev => setEditForm(prev => ({ ...prev, comment: ev.target.value }))} />
            ) : (
              <S.AvaliationContent>
                {bbcode.toReact(comment!)}
              </S.AvaliationContent>
            )}
          </S.AvaliationContentContainer>
        </S.Avaliation>
        <S.Game>
          <Link replace href={`/store/games/${game.id}`}>
            <img src={game.verticalCap ? game.verticalCap.url : "/player.jpg"} />
          </Link>
        </S.Game>
      </S.Content>
      {user && user.id === userId && (
        <S.ButtonsContainer>
          {editMode ? (
            <>
              <button onClick={handleUpdateComment}>Salvar</button>
              <button onClick={handleCancelComment}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditMode(true)}>Editar</button>
              <button onClick={handleDeleteAvaliation}>Apagar</button>
            </>
          )}
        </S.ButtonsContainer>
      )}
    </S.Container>
  )
}

export default UserDetailsAvaliations

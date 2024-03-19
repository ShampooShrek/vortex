"use client"

import { GamesStoreEdit } from "@/models/frontModels"
import * as S from "./style"
import ApiRequest from "@/utils/ApiRequests"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import messageAuth from "@/data/hooks/messageHook"

interface PublisherEditPublishProps {
  game: GamesStoreEdit
  handleUpdateGame(data: any): void
}

const PublisherEditPublish = ({ game, handleUpdateGame }: PublisherEditPublishProps) => {

  const { gameId } = useParams()
  const { showMessageBox } = messageAuth()

  const [showMessage, setShowMessage] = useState(false)
  const [isButtonEnable, setIsButtonEnable] = useState(false)

  const publisherClick = async () => {
    if(game.status === "ACCEPTED" || game.status === "PENDING") {
      const resp = await ApiRequest<string>(`/api/games/${gameId}/publish/set_developing`, "post")
      if(resp) {
        if(resp.type === "success") {
          showMessageBox("Seu Jogo foi atualizado para o modo de desenvolvimento!!", "success")
          handleUpdateGame({ status: "DEVELOPING" }) 
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    } else {
      const resp = await ApiRequest<string>(`/api/games/${gameId}/publish/set_pending`, "post")
      if(resp) {
        if(resp.type === "success") {
          showMessageBox("Seu Jogo foi enviado!! agora um administrador vai analisar o seu conteúdo", "success")
          setShowMessage(true)
          handleUpdateGame({ status: "PENDING" }) 
        } else {
          showMessageBox(resp.response as string, "error")
        }
      }
    }
  }

  useEffect(() => {
      const allConditionsAreMet =
      (game.name && game.name.trim()) &&
      (game.synopsi && game.synopsi.trim()) &&
      (game.description && game.description.trim()) &&
      game.requesites &&
      game.categories.length > 0 &&
      game.genres.length > 0 &&
      game.subgenres.length > 0 &&
      game.horizontalCap &&
      game.verticalCap &&
      game.gamePopularImage &&
      game.gameBackgroundImage &&
      game.gameIconImage &&
      game.images.length >= 4 &&
      game.achievements.length >= 4 &&
      game.arquive;
    
    // Atualiza o estado para refletir se o botão deve ser habilitado ou não
    setIsButtonEnable(allConditionsAreMet !== false ? true : false);

  }, [])

  return (
    <S.Container>
      { !game.name || !game.name.trim() && <S.Message><span>Você não preencheu o nome do produto!</span></S.Message> }
      { !game.synopsi || !game.synopsi.trim() && <S.Message><span>Você não preencheu a sinopse do produto!</span></S.Message> }
      { !game.description || !game.description.trim() && <S.Message><span>Descrição não preenchida!</span></S.Message> }

      { !game.requesites && <S.Message><span>Requesitos mínimos não preenchidos!</span></S.Message> }
      
      { game.categories.length <= 0 && <S.Message><span>Nenhuma categoria informada!</span></S.Message> }
      { game.genres.length <= 0 && <S.Message><span>Nenhum gênero informado!</span></S.Message> }
      { game.subgenres.length <= 0 && <S.Message><span>Nenhum subgênero informado!</span></S.Message> }

      { !game.horizontalCap && <S.Message><span>Imagem horizontal não enviada!</span></S.Message> }
      { !game.verticalCap && <S.Message><span>Imagem vertical não enviada!</span></S.Message> }
      { !game.gamePopularImage && <S.Message><span>Imagem de jogo popular não enviada!</span></S.Message> }
      { !game.gameBackgroundImage && <S.Message><span>Imagem de fundo não enviada!</span></S.Message> }
      { !game.gameIconImage && <S.Message><span>Ícone do produto não enviado!</span></S.Message> }
      { game.images.length < 4 && <S.Message><span>Envie no mínimo 4 capturas de tela!</span></S.Message> }
      { game.achievements.length < 4 && <S.Message><span>Ensira pelo menos 4 conquistas!</span></S.Message> }
      { !game.arquive && <S.Message><span>Arquivo não enviado!</span></S.Message> }
      <S.ButtonDiv>
        {isButtonEnable && (
        <S.Button onClick={publisherClick}>
          {game.status === "ACCEPTED" || game.status === "PENDING" 
            ? "Entrar em Modo de Desenvolvimento" 
            : "Enviar pedido para análise"}
          </S.Button>
        )}
      </S.ButtonDiv>
    </S.Container>
  )
}

export default PublisherEditPublish
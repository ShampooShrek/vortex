"use client"

import { GameFile, GameImageCap } from "@/models/dbModels"
import { useState } from "react"
import * as S from "./style"
import DateFormater from "@/utils/dateFormater"
import ButtonsContainer from "@/components/ButtonsContainer"
import Link from "next/link"
import { XIcon, AcceptIcon } from "@/components/Icons"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"
import { GamesStoreEdit } from "@/models/frontModels"

interface AdminPendingGamesProps {
  games: GamesStoreEdit[]
}

const AdminPendingGames = ({ games: propGames }: AdminPendingGamesProps) => {

  const { showMessageBox } = messageAuth()

  const [games, setGames] = useState(propGames)
  const [gamesLenght, setGamesLenght] = useState(propGames.length)

  const handleDownload = async (fileName: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

    try {
      const response = await fetch(`${apiUrl}/api/uploads/files/${fileName}`);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${fileName}`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);

    } catch (error) {
      showMessageBox("Ocorreu um erro durante o download do arquivo, tente novamente mais tarde!", "error")
    }
  };

  const changeGameStatus = async (gameId: number, type: "ACEPTED" | "DECLINED") => {

    const response = await ApiRequest(`/api/games/${gameId}/change_status`, "post", { status: type })
    if (response) {
      if (response.type === "success") {
        setGames(prevGames => prevGames.filter(g => g.id !== gameId))
        setGamesLenght(prev => prev - 1)
      } else {
        showMessageBox(response.response as string, "error")
      }
    }
  }

  return (
    <S.Container>
      <S.CardsContainer>
        {games.map(g => (
          <S.Card key={g.id} >
            <S.CardImage>
              <img src={g.horizontalCap ? g.horizontalCap.url : "/player.jpg"} alt={g.horizontalCap ? g.horizontalCap.originalName : "/player.jpg"} />
            </S.CardImage>
            <S.CardContent>
              <S.Header>
                <S.Title>{g.name}</S.Title>
                <S.Date>{DateFormater(g.createdAt)}</S.Date>
              </S.Header>
              <S.Actions >
                <S.Svg typeButton="decline">
                  <XIcon onClick={() => changeGameStatus(g.id, "DECLINED")} />
                </S.Svg>
                <S.Svg typeButton="accept">
                  <AcceptIcon onClick={() => changeGameStatus(g.id, "ACEPTED")} />
                </S.Svg>
              </S.Actions>
              <S.Links>
                <Link replace href={`/beta/images/${g.id}`}>Imagens</Link>
                <Link replace href={`/beta/game/${g.id}`}>Loja</Link>
                <a download={g.name} onClick={() => handleDownload(g.arquive.name)}>Arquivo</a>
              </S.Links>
            </S.CardContent>
          </S.Card>
        ))}
      </S.CardsContainer>
      <S.AsideGames>
        <S.AsideGamesContent>
          <h1>{gamesLenght}</h1>
          <span>Jogos Pendentes</span>
        </S.AsideGamesContent>
      </S.AsideGames>
    </S.Container>
  )
}

export default AdminPendingGames

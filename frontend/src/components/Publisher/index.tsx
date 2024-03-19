"use client"

import * as S from "./style"
import { PublisherSection } from "./PublisherSection"
import FormInput from "../Inputs/FormInput"
import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"
import Link from "next/link"
import ButtonsContainer from "../ButtonsContainer"
import { useState, useEffect } from "react"
import { XIcon } from "../Icons"
import api from "@/services/api"
import { GamesStore, GamesStoreEdit, Response } from "@/models/frontModels"
import { Games } from "@/models/dbModels"
import messageAuth from "@/data/hooks/messageHook"


interface PublisherProps {
  games: GamesStoreEdit[]
}

const Publisher = ({ games: gamesProps }: PublisherProps) => {

  const { setUser } = authHook()
  const { showMessageBox } = messageAuth()

  const [openCard, setOpenCard] = useState(false)
  const [productName, setProductName] = useState("")
  const [search, setSearch] = useState("")
  const [games, setGames] = useState(gamesProps.sort((a, b) => a.id - b.id).reverse())

  useEffect(() => {
    setGames(() =>
      gamesProps.filter(g => g.name.toLowerCase().replace(" ", "").includes(search.toLowerCase().replace(" ", "")))
        .sort((a, b) => a.id - b.id).reverse()
    )
  }, [search])

  const tradutionStatus = (status: string): string => {
    if (status === "PENDING") return "Em Analise"
    else if (status === "DEVELOPING") return "Em Desenvolvimento"
    else if (status === "ACEPTED") return "Lançado"
    else return "Rejeitado"
  }

  const publisheGame = async () => {
    const response = await api.post("/api/games", { name: productName })
    const data: Response<GamesStoreEdit> = response.data

    if (data.type === "success") {
      const game = data.response as GamesStoreEdit
      setUser(prev => ({
        ...prev!,
        gameDevelopers: [game, ...prev!.gameDevelopers],
        games: [{ id: game.id }, ...prev!.games]
      }))
      setGames([game, ...games])
      setOpenCard(false)
      setProductName("")
    } else {
      showMessageBox(data.response as string, "error")
    }
  }

  return (
    <>
      {openCard && (
        <>
          <S.Black />
          <S.CreateCard>
            <XIcon onClick={() => { setOpenCard(false); setProductName("") }} />
            <S.CardHeader>
              <h1>CRIAR NOVO PRODUTO</h1>
            </S.CardHeader>
            <S.CardContent>
              <S.CardText>
                <span>Você está prestes a criar um novo produto...</span>
                <br />
                <span>Para continuar, ensira o nome do produto no campo abaixo.</span>
              </S.CardText>
              <FormInput
                type="text"
                label="Nome do Produto:"
                value={productName}
                onChange={ev => setProductName(ev.target.value)}
              />
            </S.CardContent>
            <ButtonsContainer cancelButton={false} cancelClick={() => { }} saveClick={publisheGame} />
          </S.CreateCard>
        </>
      )}
      <S.Container>
        <PublisherSection title="Publicar Novo Jogo">
          <S.Text>Publique seus jogos para que outros usuários possam jogar e avaliar.</S.Text>
          <S.CreateButton onClick={() => setOpenCard(true)}>Publicar</S.CreateButton>
        </PublisherSection>
        <PublisherSection title="Seus Jogos">
          <S.Text>Pesquise pelo nome do jogo</S.Text>
          <FormInput onChange={e => setSearch(e.target.value)} inputStyle={{ width: "100%" }} value={search} type="text" />
          <S.Table>
            <thead>
              <tr>
                <S.Th>ID</S.Th>
                <S.Th>Jogo</S.Th>
                <S.Th>Estado</S.Th>
                <S.Th>Ação</S.Th>
              </tr>
            </thead>
            <tbody>
              {games.map(g => (
                <S.Tr key={g.id}>
                  <S.Td>{g.id}</S.Td>
                  <S.Td>
                    <S.SpanName><img src={g.gameIconImage ? g.gameIconImage.url : "/group_banner.jpg"} alt="" /><span>{g.name}</span></S.SpanName>
                  </S.Td>
                  <S.Td>{tradutionStatus(g.status.toString())}</S.Td>
                  <S.Td><Link href={`/publisher/edit/${g.id}`} >Administrar o Aplicativo</Link></S.Td>
                </S.Tr>
              ))}
            </tbody>
          </S.Table>
        </PublisherSection>
      </S.Container>
    </>
  )
}

export default Publisher

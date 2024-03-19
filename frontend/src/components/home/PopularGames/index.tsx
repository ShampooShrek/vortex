"use client"

import Content from "./Content";
import { GamesStore } from "@/models/frontModels";

import styled from "styled-components";

const ErrorDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface PopularGamesProps {
  popularGames: GamesStore[] | string
}

export default async function PopularGames({ popularGames }: PopularGamesProps) {

  if (typeof popularGames === "string") {
    return (
      <ErrorDiv>
        <h3>Ops, algo deu errado na requesição!</h3>
      </ErrorDiv>
    )
  }

  return (
    <Content games={popularGames} />
  )
}

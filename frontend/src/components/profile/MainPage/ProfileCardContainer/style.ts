"use client"

import vars from "@/styles/vars"
import Link from "next/link"
import styled from "styled-components"

interface StyledProps {
  progress: number
}

export const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color:  ${vars.containers.secundaryColor};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const CardGameHeader = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const CardGameStatus = styled.div`
  display: flex;
  justify-content: end;
  text-align: center;
`

export const CardGameHeaderFavorite = styled(CardGameHeader)`
  justify-content: center;
`

export const CardGameImage = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.2rem;
    font-weight: normal;
  }

  img {
    width: 200px;
    border-radius: 5px;
    margin-right: 10px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }
`

export const CardFavoriteImage = styled(CardGameImage)`
  flex-direction: column;

  img {
    width: 300px;
    margin: 0%;
  }

  h3 {
    margin-top: 5px;
    font-size: 1.8rem;
  }

  @media screen and (max-width: 400px) {
    img {
      width: 250px;
    }
  }
`

export const CardGameAchievements = styled(Link)`
  text-decoration: none;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AchievementsProgress = styled.div`
  margin-right: 20px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  h5 {
    font-size: 1rem;
    font-weight: normal;
    color: ${vars.color};
  }

  span {
    font-size: 1rem;
    color: ${vars.color + "a"}
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  
`

export const AchievementsProgressBar = styled.div<StyledProps>`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  background-color: #000;
  border-radius: 10px;

  div {
    width: ${props => props.progress + '%'};
    height: 100%;
    background-color: ${vars.secundaryColor};
    border-radius: 10px;
  }
`

export const AchievementsImages = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
`

export const AchievementImage = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid ${vars.secundaryColor};
  
  &:not(:last-child) {
    margin-right: 5px;
  }
`

export const CardFavoriteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  div {
    text-align: center;
    display: flex;
    flex-direction: column;

    &:first-child {
      margin-right: 80px;
    }

    h3 {
      font-size: 2rem;
      font-weight: lighter;
    }

    span {
      color: ${vars.color + "5"};
    }
  }
`

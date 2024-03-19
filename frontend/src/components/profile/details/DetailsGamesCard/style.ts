"use client"

import vars from "@/styles/vars"
import Link from "next/link"
import styled from "styled-components"

interface StyledProps {
  progress: number
  withAchievements: boolean
}

export const Card = styled.div`
  padding: 10px;
  display: flex;
  border-radius: 5px;
  background-color:  ${vars.containers.secundaryColor};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

// export const CardGameHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `

// export const CardGameHeaderFavorite = styled(CardGameHeader)`
//   justify-content: center;
// `



// export const CardGameImage = styled.div`
//   display: flex;
//   align-items: center;

//   h3 {
//     font-size: 1.2rem;
//     font-weight: normal;
//   }

//   img {
//     width: 200px;
//     height: 110px;
//     border-radius: 5px;
//     margin-right: 10px;
//   }
// `

export const CardGameImage = styled.img`
  width: 220px;
  height: 110px;
  margin-right: 10px;

  @media screen and (max-width: 550px) {
    display: none;
  }
  `

export const CardGameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 100%; 

  @media screen and (max-width: 550px) {
    display: none;
  }
`

export const CardGameContentMobile = styled(CardGameContent)`
  display: none;
  flex-direction: column;

  @media screen and (max-width: 550px) {
    display: block;
  }

`

export const CardGameName = styled.h3`
  font-size: 1.2rem;

  @media screen and (max-width: 430px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 400px) {
    font-size: .8rem;
  }
`

export const GameTime = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h5 {
    color: ${vars.colorAlpha};
    font-size: .8rem;
    font-weight: normal;
  }

  span {
    color: ${vars.colorAlpha};
    font-size: .7rem;
    font-weight: normal;
  }

    @media screen and (max-width: 430px) {
      h5 {
        font-size: .7rem;
      }

      span {
        font-size: .6rem;
      }
  }

  @media screen and (max-width: 400px) {
    display: none;
  }
`

export const CardGameAchievements = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
`

export const AchievementsProgress = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;

  h5 {
    font-size: 1rem;
    font-weight: normal;
    color: ${vars.color};
    margin-right: 10px;
  }

  span {
    font-size: .8rem;
    color: ${vars.color + "a"}
  } 
`

export const AchievementsProgressBar = styled.div<StyledProps>`
  width: 50%;
  height: 10px;
  background-color: #000;
  border-radius: 10px;

  
  div {
    width: ${props => props.progress + '%'};
    height: 100%;
    background-color: ${vars.secundaryColor};
    border-radius: 10px;
  }

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const AchievementsImages = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
`

export const AchievementImage = styled.img`
  width: 30px;
  height: 30px;
  border: 2px solid ${vars.secundaryColor};
  
  &:not(:last-child) {
    margin-right: 5px;
  }
`

export const GameHeaderMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export const CardGameHeaderMobileContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

    
  @media screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: space-around;
    text-align: start;
  }
`

export const CardGameImageMobile = styled.img`
  width: 150px;
  margin-right: 10px;

  @media screen and (max-width: 400px) {
    width: 120px;
  }
`

export const GameTimeImageContainer = styled(GameTime)`
  display: none;
  
  @media screen and (max-width: 400px) {
    display: block;
    align-items: start;
  }
`
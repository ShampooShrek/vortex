"use client"

import vars from "@/styles/vars"
import styled from "styled-components"


export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const GameContainer = styled.div`
  display: flex;

  @media screen and (max-width: 764px) {
    flex-direction: column;
  }
`

export const Main = styled.div`
  width: calc(100% - 450px);
  margin-right: 100px;
  
  @media screen and (max-width: 1600px) {
    width: calc(100% - 350px);
    margin-right: 50px;
  }

  @media screen and (max-width: 1600px) {
    width: calc(100% - 300px);
    margin-right: 30px;
  }

  @media screen and (max-width: 764px) {
    width: 100%;
    margin: 0%;
  }
`

export const AsideContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  font-size: .8rem;
  position: relative;

  @media screen and (max-width: 1600px) {
    width: 300px;
  }

  @media screen and (max-width: 960px) {
    width: 250px;
  }

  @media screen and (max-width: 764px) {
    display: none;
  }
`

export const AsideContainerContainer = styled.div`
  display: block;

  @media screen and (max-width: 764px) {
    display: none;
  }
`

export const AsdieContainerCoisaContent = styled.div`
  display: none;

  @media screen and (max-width: 764px) {
    display: block;
  }
`

export const Title = styled.h4`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 500;
`

export const GameTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 10px;
`

export const Bar = styled.div`
  width: 80%;
  height: 2px;
  background-color: ${vars.secundaryColor};
  border-radius: 5px;
  margin: 5px 0;
`

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    width: 30px;
  }
`

export const AvaliationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Avaliations = styled.div`
  display: flex;
`

export const BetterAvaliations = styled(Main) `
`

export const LastAvaliations = styled(AsideContainer)`
  font-size: 1rem;
`

export const AvaliationTitle = styled(GameTitle)`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 5px !important;
`

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${vars.topBar.background};
`

export const NoAvaliationsContainer = styled.div`
  padding: 30px;
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
  background-color: ${vars.containers.secundaryColor};
  border: 1px solid ${vars.containers.primaryColor};
  text-align: center;
`

export const NoAvaliationsSpan = styled.span`
  color: ${vars.colorAlpha};
  font-size: 1.2rem;
`
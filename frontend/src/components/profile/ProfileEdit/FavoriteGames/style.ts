import vars from "@/styles/vars";
import styled from "styled-components";

interface StyledProps {
  background: boolean
}

export const Container = styled.div`
  display: block;
`

export const GamesContainer = styled.div<StyledProps>`
  padding: 20px;
  width: 100%;
  display: block;
  background-color: ${prosp => prosp.background ? vars.containers.primaryColor : vars.containers.primaryColor + "77"};
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
  
  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  }

  &::-webkit-scrollbar-track {
    background: #000;
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #AB1A1A;
    height: 3rem;
    border-radius: 50px;
  }
`

export const GamesSection = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: normal;
`

export const GamesLine = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(calc(33.33% - 20px), 1fr));
  height: 110px;
  gap: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const GamesCard = styled.div<StyledProps>`
  cursor: pointer;
  width: 100%;
  height: 100px;

  display: flex;
  flex-direction: column;
  background-color: ${prosp => prosp.background ? vars.containers.secundaryColor : "transparent"};

  img {
    width: 100%;
    height: 100%;
  }

  span {
    margin: 5px 0;
    font-size: 1rem;
    color: ${vars.colorAlpha};
    text-align: center;
  }
`


export const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    font-size: .9rem;
    color: ${vars.colorAlpha};
    margin-bottom: 5px;
  }

  input {
    outline: 0;
    border: 1px solid ${vars.containers.primaryColor};
    padding: 10px;
    font-size: 1rem;
    color: ${vars.colorAlpha};
    border-radius: 3px;
    background-color: ${vars.containers.secundaryColor};
  }
`
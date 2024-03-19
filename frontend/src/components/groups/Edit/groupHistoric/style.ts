"use client"

import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const HistoricCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor}; 
`

export const HistoricCardHeader = styled.div`

  padding: 10px;
  display: flex;
  align-items: center;
  background-color: ${vars.containers.secundaryColor};

  span {
    font-size: .9rem;
    color: ${vars.colorAlpha};
  }
`

export const HistoricCardContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 420px;
  overflow-y: auto;

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
interface HistoricLineProps {
  index: number
}

export const HistoricCardLine = styled.div<HistoricLineProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${props => props.index % 2 === 0 ? "" : vars.containers.secundaryColor};

  h3 {
    font-size: .8rem;
    color: ${vars.color};
    font-weight: normal;
    margin-right: 5px;
  }

  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
    margin-left: 5px ;
  }
`


export const HistoricCardLineContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${vars.containers.secundaryColor};
`
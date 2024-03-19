"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const Input = styled.input`
  width: 100%;
  outline: 0;
  border: 1px solid ${vars.containers.primaryColor};
  padding: 10px;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  border-radius: 3px;
  background-color: ${vars.containers.secundaryColor};
`

export const SearchButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  color: ${vars.color};
  font-size: 1.1rem;
  background-color: ${vars.secundaryColor};
`

export const UsersCard = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor}; 

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
export const UsersCardHeader = styled.div`
  padding: 10px;
  
  display: flex;
  align-items: center;
  background-color: ${vars.containers.secundaryColor};

  span {
    font-size: .9rem;
    color: ${vars.colorAlpha};
  }
`

export const UsersCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const UsersCardLine = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(calc(33.33% - 20px), 33.33%));
  gap: 10px;
  width: 100%;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(calc(50% - 20px), 1fr));
  }
  @media screen and (max-width: 600px) {
    display: flex;
    width: 100%;
  }
`

export const UsersCardLineContent = styled.div`
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: ${vars.containers.secundaryColor};
  width: 100%;
`

export const LeftCardContent = styled.div`
  display: flex;
  align-items: center;
`

export const RightCardContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 50%;
    background-color: ${vars.secundaryColor};
  }
` 

export const UsersImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    font-size: .9rem;
    color: ${vars.color};
    font-weight: normal;
  }

  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }
`

export const NoItemWarning = styled.h1`
  font-size: 1.5rem;
  color: ${vars.colorAlpha};
  padding: 10px;
`
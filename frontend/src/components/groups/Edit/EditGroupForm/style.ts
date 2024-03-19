"use client"

import vars from "@/styles/vars";
import styled, { keyframes } from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const Label = styled.label`
  font-size: .9rem;
  color: ${vars.colorAlpha};
  margin-bottom: 5px;
`

export const Input = styled.input`
  outline: 0;
  border: 1px solid ${vars.containers.primaryColor};
  padding: 10px;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  border-radius: 3px;
  background-color: ${vars.containers.secundaryColor};
`

export const Options = styled.select`
  width: 150px;
  outline: 0;
  padding: 0;
  border: 0;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};
  border-radius: 5px;

  option {
    text-align: center;
    background-color: #000;
    width: 100px;
    color: ${vars.colorAlpha};
    background-color: ${vars.containers.secundaryColor};
    border: 0;
    outline: 0;
  }
`

const DropDownAnim =  keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`

export const GamesDropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${vars.containers.primaryColor};
  animation: ${DropDownAnim} .3s ease-in-out;

  div {
    cursor: pointer;
    background-color: ${vars.containers.primaryColor};
    padding: 10px;
    display: flex;
    align-items: center;
    transition: .2s ease-in-out;
  
    img {
      width: 25px;
      height: 25px;
      object-fit: cover;
      margin-right: 10px;
    }

    span {
      font-size: .8rem;
      color: ${vars.colorAlpha};
    }

    &:hover {
      background-color: ${vars.containers.secundaryColor};
    }
  }
`

export const SelectedGamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${vars.containers.primaryColor};
  margin-bottom: 20px;
  padding: 10px 0 0 10px;
`

export const SelectedGamesCard = styled.div`
  background-color: ${vars.containers.secundaryColor};
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: .2s ease-in-out;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-right: 10px;
  }

  span {
    font-size: 1rem;
    color: ${vars.colorAlpha};
  }

  svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: ${vars.secundaryColor};
    border-radius: 100%;
    padding: 2px;
    margin-left: 20px;
  }

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`

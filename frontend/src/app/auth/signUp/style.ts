"use client"

import styled from "styled-components";

interface StyledProps {
  isActived?: boolean
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-top: 15vh;
    margin-bottom: 20px;
  }
`

export const ContainerCard = styled.div`
  width: 450px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 5px 5px 4px #0006;
  background-color: #131419;
`

export const ContainerForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h1 {
    text-align: center;
  }
`

export const ContainerFormInputs = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const ContainerFormInput = styled.div<StyledProps>`
  display: ${props => props.isActived ? "flex" : "none"};
  flex-direction: column;
  position: relative;
  margin: 7.5px 0;
/* 
  &:first-child {
    margin-bottom: 0;
  } */

  label {
    font-size: .8rem;
  }

  input {
    background-color: /* #31333B */ transparent;
    font-size: 1rem;
    outline: 1px solid black;
    border: 0;
    width: 70%;
    padding: 5px 0 5px 5px;
    margin-top: 5px;
    border-radius: 5px;
  }


  input:focus {
    outline: 1px solid #aaa;
  }

  svg {
    top: 50%;
    right: 30%;
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: 2;
    cursor: pointer;
  }

  a {
    cursor: pointer;
    text-decoration: underline;
    margin-top: 15px;
    font-size: .8rem;
  }

    button {
    position: absolute;
    top: calc(50% - .25rem);
    right: 0;
    padding: 5px 15px;
    outline: 0;
    border: 1px solid white;
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
  }
`

export const ContainerFormButton = styled.button<StyledProps>`
  display: ${props => props.isActived ? "block" : "none"};
  cursor: pointer;
  background-color: #31333B;
  width: 100%;
  height: 30px;
  font-size: 1.1rem;
  outline: 0;
  border: 0;
  border-radius: 5px;
`
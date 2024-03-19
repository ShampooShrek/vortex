"use client"

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

`

export const ContainerCard = styled.div`
  margin-top: 15vh;
  width: 700px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 5px 5px 4px #0006;
  background-color: #131419;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-top: 50px;
  }
`

export const ContainerLogo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
  }


  @media screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 20px;
  }

`

export const ContainerForm = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  
  @media screen and (max-width: 600px) {
    width: 100%;

    h1 {
      text-align: center
    }
  }
`

export const ContainerFormInputs = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const ContainerFormInput = styled.div`
  display: block;

  label {
    font-size: .8rem;
  }

  input {
    background-color: #31333B;
    font-size: 1.1rem;
    outline: 0;
    border: 0;
    width: 100%;
    padding: 5px 0 5px 5px;
    margin-top: 2px;
    border-radius: 5px;
  }

  a {
    cursor: pointer;
    text-decoration: underline;
    margin-top: 15px;
    font-size: .8rem;
  }

  &:first-child {
    margin-bottom: 15px;
  }

`

export const ContainerFormButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #31333B;
  width: 100%;
  height: 30px;
  font-size: 1.1rem;
  outline: 0;
  border: 0;
  img {
    width: 25px;
    height: 25px;
  }
`

export const ContainerFormLinkSignUp = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: center;

  p {
    font-size: .8rem;
  }
`

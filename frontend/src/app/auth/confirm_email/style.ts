import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardContainer = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
`

export const Card = styled.div`
  margin-top: 15vh;
  width: 100%;
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

export const ContainerFormButton = styled.button`
  display: block;
  cursor: pointer;
  background-color: #31333B;
  width: 100%;
  height: 30px;
  font-size: 1.1rem;
  outline: 0;
  border: 0;
  border-radius: 5px;
`

export const SendNewEmailContent = styled.div`
  margin-top: 20px;
  text-align: center;
  width: 100%;
  font-size: .9rem;

  span {
    color: ${vars.colorAlpha};
  }

  a {
    color: ${vars.color};
    cursor: pointer;
    text-decoration: underline;
  }
`
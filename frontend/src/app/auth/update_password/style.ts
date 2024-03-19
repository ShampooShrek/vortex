import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Card = styled.div`
  margin-top: 10vh;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
`

export const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 1.5rem;
    font-weight: normal;
    color: ${vars.color};
  }
`

export const Description = styled.span`
  text-align: center;
  font-size: 1.2rem;
  color: ${vars.colorAlpha};
  margin-bottom: 30px;
`

export const Button = styled.button`
  cursor: pointer;
  padding: 5px 0;
  color: ${vars.color};
  background-color: ${vars.secundaryColor};
  transition: .2s ease-in-out;
  outline: 0;
  border: 0;

  &:hover {
    filter: brightness(1.4);
  }

`
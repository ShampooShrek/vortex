import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  border: 2px solid ${vars.secundaryColor};
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: ${vars.containers.primaryColor};
  padding: 20px;
`

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* min-height: 35vw; */
  margin-bottom: 50px;
`

export const CardContainerDiv = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`

export const Button = styled.button`
  width: 250px;
  padding: 5px 0;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.secundaryColor};
  cursor: pointer;
  outline: 0;
  border: 0;
  margin: 0 auto;

`

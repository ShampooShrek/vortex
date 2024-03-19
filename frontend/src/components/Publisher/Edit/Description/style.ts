import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  display: block;
`

export const ButtonImagesContainer = styled.div`
  display: flex;
  flex-direction: column;  
`

export const DescriptionContainer = styled.div`
  width: 80%;

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-bottom: 10px;

  span {
    font-size: .9rem;
    color: ${vars.colorAlpha};
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`

export const ButtonContainer = styled.div`
  button {
    padding: 7px 20px;
    background-color: ${vars.secundaryColor};
    border: 0;
    outline: 0;
    cursor: pointer;
    color: ${vars.color};
    transition: .2s ease-in-out;

    &:hover {
      filter: brightness(1.5);
    }
  }
`

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100px;
  margin-bottom: 20px;
  object-fit: cover;
  cursor: pointer;
`
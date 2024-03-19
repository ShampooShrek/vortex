import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const Header = styled.div`
  padding: 5px;
  width: 100%;
  background-color: ${vars.lineColor};
  border-bottom: 1px solid black;
  
  h3 {
    color: ${vars.color};
    font-weight: normal;
    font-size: 1.3rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${vars.containers.secundaryColor};
`

export const ContentTileDescription = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  h4 {
    font-weight: normal;
    font-size: 1.2rem;
  }

  span {
    margin-top: 5px;
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }
`

export const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`


export const DescriptionImage = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid ${vars.secundaryColor};
  border-radius: 100%;
  margin-right: 20px;
`

export const DescriptionTextAside = styled.div`
  width: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  textarea {
    background-color: ${vars.containers.secundaryColor};
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export const LikeDeslikeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: ${vars.colorAlpha};
    font-size: .8rem;
  }
`

export const LikeDeslikeButtons = styled.div`
  display: flex;
  margin-top: 5px;
`

interface LikeDeslikeButtonProps {
  isSelected: boolean
}

export const LikeDeslikeButton = styled.button<LikeDeslikeButtonProps>`
  cursor: pointer;
  background-color: ${vars.secundaryColor};
  width: 100px;
  padding: 4px 0;
  border-radius: 5px;
  outline: 0;
  border: 1px solid black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => props.isSelected ? "brightness(1.6)" : "brightness(1);"};

  &:first-child {
    margin-right: 5px;
  }

  &:hover {
    filter: brightness(1.6);
  }
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
`

export const SendButton = styled.button`
  cursor: pointer;
  background-color: ${vars.lineColor};
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 1px solid black;
  font-size: 1rem;
  max-width: 200px;

  a {
    text-decoration: none;
    width: 100%;
    height: 100%;
  }

  &:hover {
    filter: brightness(1.6);
  }

`
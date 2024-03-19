import styled, { keyframes } from "styled-components";

const AnimNext = keyframes`
  from {
    transform: translateX(60px);
  } to {
    transform: translateX(0);
  }
`
const AnimPreview = keyframes`
  from {
    transform: translateX(-60px);;
  } to {
    transform: translateX(0);
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`

export const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  &.next {
    animation: ${AnimNext} .1s;
  }

  &.preview {
    animation: ${AnimPreview} .1s;
  }
`

export const ContentCardsContaier = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  gap: 20px;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(50px, 1fr));
    gap: 10%;
  }
`


export const ArrowsMobileContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: none;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: flex;
  }
`
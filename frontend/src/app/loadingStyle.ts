import styled from "styled-components";
import { keyframes } from "styled-components";
import Image from "next/image"

const LoadingAnim = keyframes`
  from {
    transform: rotate(0deg);
  } 
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const LoadingImage = styled(Image)`
  animation: ${LoadingAnim} 2s infinite linear;
  margin-bottom: 10px;
`

export const LoadingText = styled.span`
  font-size: 1.2rem;

`

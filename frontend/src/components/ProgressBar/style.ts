"use client"

import styled from "styled-components"

type StyledProps = {
  width: number
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
`

export const LoadingBar = styled.div<StyledProps>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: red;
  transition: width 0.5s ease-in-out;
`


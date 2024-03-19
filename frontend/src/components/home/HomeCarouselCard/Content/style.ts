"use client"

import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: #1115; */
`

export const SectionAndButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  p {
    padding: 0;
    font-size: 1.8rem;
    font-weight: normal;
    text-decoration: underline;
  }
`

export const Buttons = styled.div`
display: flex;
  svg {
    cursor: pointer;
    margin-left: 10px;
  }
`

export const NoTokenContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  h3 {
    font-size: 1.2rem;

  }
`


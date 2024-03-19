"use client"

import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 764px) {
    flex-direction: column-reverse;
  }
`

export const LeftContent = styled.div`
  width: 65%;
  margin-right: 20px;

    @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const RightContent = styled.div`
  width: 35%;

  @media screen and (max-width: 764px) {
    width: 100%;
    margin-bottom: 30px;
  }
`
"use client"

import vars from "@/styles/vars"
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export const CardContainer = styled.div`
  background-color: ${vars.containers.primaryColor};
  width: 100%;

  display: flex;
  flex-direction: column;
`

export const CardLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`


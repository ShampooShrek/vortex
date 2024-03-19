"use client"
import vars from "@/styles/vars"
import styled from "styled-components"

interface MainProps {
  mainMargin: boolean
}

export const Container = styled.main<MainProps>`
  width: ${props => props.mainMargin ? vars.main.width.bigXl : "100vw !important"};
  /* min-height: calc(100vh - ${vars.topBar.height}); */
  /* min-height: ; */
  margin: 0 auto;

  @media screen and (max-width: 1600px) {
    width: ${vars.main.width.xl};
  }

  @media screen and (max-width: 960px) {
    width: ${vars.main.width.lg};
  }

  @media screen and (max-width: 600px) {
    width: ${vars.main.width.xs};
  }
`

export const Content = styled.div`
  width: 100%;
`

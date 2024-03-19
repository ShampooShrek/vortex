"use client"

import vars from "@/styles/vars"
import styled from "styled-components"

export const HeaderComponent = styled.header`  
  width: ${vars.main.width.bigXl};
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1600px) {
    width: ${vars.main.width.xl};
  }

  @media screen and (max-width: 960px) {
    width: ${vars.main.width.lg}
  }
`

export const Logo = styled.div`
  font-size: 2rem;
`

export const Container = styled.div`
  height: ${vars.header.height};
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.header.background};
  z-index: 100;
`

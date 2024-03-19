"use client"

import { Line } from "@/styles/global";
import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SectionTitle = styled.h3`
  color: ${vars.color};
  font-size: 1.5rem;
`

export const SectionLine = styled(Line)`
  margin: 2px 0 10px 0;
  width: 40%;
`

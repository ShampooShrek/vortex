"use client"

import vars from "@/styles/vars"
import styled from "styled-components"

interface ContentProps {
  border: boolean
  padding: boolean
  background: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export const Content = styled.div<ContentProps>`
  padding: ${props => props.padding ? "20px" : 0};
  border: ${props => props.border ? `2px solid ${vars.secundaryColor}` : 0 };
  border-top: 0;
  background-color: ${props => props.background ? vars.containers.primaryColor : "transparent"};
  width: 100%;
`
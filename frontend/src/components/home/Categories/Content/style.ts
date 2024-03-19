"use client"

import vars from "@/styles/vars"
import Link from "next/link"
import styled from "styled-components"

interface StyledProps {
  marginRight: number
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #1115; */
`

export const SectionAndButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

export const CategoryCard = styled(Link)<StyledProps>`
  text-decoration: none;
  cursor: pointer;
  flex: none;
  text-align: center;
  width: calc((${vars.main.width.xl} / 5) - ${props => props.marginRight + "px"} - 1.6px);
  height: calc((${vars.main.width.xl} / 5) - ${props => props.marginRight + "px"});
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #131419;
  border-radius: 10px;
  transition: filter .2s;
  word-break: break-all;
  word-wrap: break-word;

  img {
    width: 40%;
    height: 40%;
    transition: .2s;
  }

  &:hover {
    filter: brightness(1.2);
  }

  &:hover img {
    width: 45%;
    height: 45%;
  }

  &:last-child {
    margin-right: 0;
  }


  @media screen and (max-width: 960px) {
    width: calc((${vars.main.width.lg} / 4) - ${props => props.marginRight + "px"} - 1.6px);
    height: calc((${vars.main.width.lg} / 4) - ${props => props.marginRight + "px"});
    
  }

  @media screen and (max-width: 764px) {
    width: calc((${vars.main.width.lg} / 3) - ${props => props.marginRight + "px"} - 1.6px);
    height: calc((${vars.main.width.lg} / 3) - ${props => props.marginRight + "px"} - 1.6px);
  }

  @media screen and (max-width: 600px) {
    width: calc((${vars.main.width.xs} / 1.5) - ${props => props.marginRight + "px"} - 2.4px);
    height: calc((${vars.main.width.xs} / 1.5) - ${props => props.marginRight + "px"});
  }


`

export const CategoryName = styled.div`
  margin-top: 10px;
  

  p {
    margin: 0 10px;
    font-size: 1.4rem;
  }
`
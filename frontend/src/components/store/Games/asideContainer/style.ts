"use client"

import vars from "@/styles/vars"
import Link from "next/link"
import styled from "styled-components"

interface StyledProps {
  background?: boolean
  fontSize?: number
  menosMargin?: number
}

export const AsideImage = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`

export const AsideText = styled.div`
  margin-top: 10px;
  text-align: left;
  word-wrap: normal;  
  font-weight: lighter;
`

export const AsideInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

export const Info = styled.div`
  font-size: .9rem;
  padding: 15px 0;
  border-bottom: 1px solid ${vars.secundaryColor};
  display: flex;
  justify-content: space-between;

  span {
    &:nth-child(1) {
      color: ${vars.colorAlpha};
    }
  }
`

export const AsideButtons = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

`

export const Price = styled.span`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`

export const OriginalPrice = styled.p`
  text-decoration: line-through;
  font-size: .8rem;
  color: #bbb8;
  margin-right: 10px;
`

export const Button = styled.button<StyledProps>`
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${vars.secundaryColor};
  outline: 0;
  color: #fff;
  background-color: ${props => props.background ? vars.secundaryColor : "transparent"};
  border-radius: 10px;
  transition: .3s;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
  
  &:hover {
    background-color: ${vars.secundaryColor};
    border: 2px solid ${vars.secundaryColor};
  }
`

export const AsideCategories = styled.div`
  margin-top: 20px;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  p {
    margin-bottom: 4px;
  }
`
export const ListCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
`

export const Categorie = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
  text-align: center;
  border-radius: 3px;
  background-color: ${vars.secundaryColor};
  margin-right: 2px;
  margin-top: 2px;
`
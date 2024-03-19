"use client"

import vars from "@/styles/vars";
import styled from "styled-components"

interface StyledProps {
  marginRight: number
}

export const GamesCard = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  word-break: break-all;

  &:last-child {
    margin-right: 0;
  }

  cursor: pointer;
  width: calc((${vars.main.width.bigXl} / 5) - ${props => props.marginRight + "px"} - 2.4px);
  /* min-height: calc((${vars.main.width.bigXl} / 5) * 1.6); */
  margin-right: 10px;


  @media screen and (max-width: 1600px) {
    width: calc((${vars.main.width.xl} / 5) - ${props => props.marginRight + "px"} -  3px);
    /* min-height: calc((${vars.main.width.xl} / 5) * 1.6); */
  }

  @media screen and (max-width: 960px) {
    width: calc((${vars.main.width.lg} / 4) - ${props => props.marginRight + "px"} - 2.4px);
    /* height: calc((${vars.main.width.lg} / 4) * 1.6); */
  }
  @media screen and (max-width: 764px) {
    width: calc((${vars.main.width.lg} / 3) - ${props => props.marginRight + "px"} - 2.4px);
    /* height: calc((${vars.main.width.lg} / 4) * 1.6); */
  }

  @media screen and (max-width: 600px) {
    width: calc((${vars.main.width.xs} / 1.2) - ${props => props.marginRight + "px"} - 2.4px);
  }

  a {
    
    text-decoration: none;

  }

`;

export const ImageContainer = styled.div`
  /* height: 70%; */

  img {
    width: 100%;
    height: 100%;
    transition: filter .2s ease-in-out;
  }
  
  &:hover img {
    filter: brightness(1.15);
  }

  @media screen and (max-width: 600px) {
    img {
      border-radius: 10px;
    }
  }

`

export const GamesContent = styled.div`
  max-height: 60px;
  /* background-color: aqua; */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
`

export const GameTitle = styled.h3`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`

export const GamePrice = styled.div`
  text-align: right;
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-top: 10px;

  span {
    font-size: 1.1rem;
    background-color: ${vars.secundaryColor};
    padding: 2px 5px;
    border-radius: 3px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    font-size: .9rem;
  }
`

export const OriginalPrice = styled.p`
  text-decoration: line-through;
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  display: flex;
`

export const Image = styled.div`
  margin-right: 10px;
  img {
    width: 200px;
    height: 200px;
    border: 2px solid ${vars.secundaryColor};
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`

export const ImageTitle = styled(Image)`
  display: none;
  img{
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const GroupTitle = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  h3 {
    margin-right: 5px;
    font-size: 1.4rem;
    font-weight: normal;
    color: ${vars.color}
  }

  span {
    color: ${vars.color + "5"};
    font-size: 1rem;
  }
`

export const GroupDescription = styled.span`
  max-width: 80%;
  word-wrap: break-word;
  font-size: .9rem;
  color: ${vars.color + "5"};
`

export const GroupContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

type TitleColor = { color: string }

export const GroupContent = styled.div<TitleColor>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.color};
  }

  span {
    font-size: 1.2rem;
    color: ${vars.color + "5"};
  }
`
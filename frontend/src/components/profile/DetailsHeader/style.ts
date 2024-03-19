"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 150px;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`
export const UserContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const UserImage = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 10px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid ${vars.secundaryColor};
  }

`

export const UserNickname = styled.h2`
  font-weight: 500;
  font-size: 1.3rem,;
  margin-right: 10px;

  a {
    text-decoration: none;
  }
`
export const GameName = styled.h3`
  font-weight: 500;
  font-size: 1.3rem,;
  margin-right: 10px;
`

export const Section = styled.span`
  font-size: .8rem;
`

export const GameImage = styled.img`
  cursor: pointer;
  width: 200px;
  height: 100px;

  @media screen and (max-width: 500px) {
    display: none;
  }

`

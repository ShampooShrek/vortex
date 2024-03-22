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

  @media screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
    }
`
export const UserContainer = styled.div`
  display: flex;
  align-items: center;


  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    margin-bottom: 20px;
  }
`

export const UserImageNickanme = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 5px;
  
  @media screen and (max-width: 768px) {
    margin: 0;
    align-items: center;
    justify-content: center;
  }
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
  
  @media screen and (max-width: 500px) {
      width: 60px;
      height: 60px;
      img { width: 60px; height: 60px; }
    }
`

export const UserNickname = styled.h2`
  font-weight: 500;
  font-size: 1.3rem,;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`
export const GameName = styled.h3`
  font-weight: 500;
  display: flex;
  font-size: 1.3rem;
  margin-right: 10px;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: .9rem;
  } 
`

export const Section = styled.span`
  font-size: .8rem;
`

export const GameImage = styled.img`
  cursor: pointer;
  width: 200px;
  height: 100px;

  @media screen and (max-width: 768px) {
    display: none;
  }

`

export const DesktopSections = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const MobileSections = styled.div`
  width: 100%;
  display: none;
  justify-content: center;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`

"use client"

import Link from "next/link";
import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    margin-bottom: 10px;
    padding: 10px;
    background-color: ${vars.containers.secundaryColor};

    .bar {
      display: none;
    }
 }
`

export const ContentContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    margin: 0;
    margin-right: 10px;
    
 }
`

export const ContentName = styled(Link)`
  font-size: 1.2rem;
  text-align: start;
  color: ${vars.colorAlpha};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${vars.color};
  }
`

export const ContentNumber = styled.span`
  font-size: 1.4rem;
  color: ${vars.color};
  text-align: end;
`

export const ContentList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

export const List = styled.div`
  cursor: pointer;
  transition: .2s ease-in-out;
  outline-color: transparent;

  
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  
  a {
    text-decoration: none;
    padding: 5px;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
    }

    h4 {
      font-size: 1rem;
      font-weight: normal;
    }

    span {
      color: ${vars.color + "5"};
      font-size: .8rem;
    }

  }
  &:hover {
    outline-style: solid;
    outline-color: ${vars.secundaryColor};
    outline-width: 2px;
  }
`

// export const List = styled.a`
//   cursor: pointer;
//   padding: 5px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   transition: .1s ease-in-out;
//   outline-color: transparent;

//   &:not(:last-child) {
//     margin-bottom: 10px;
//   }

//   img {
//     width: 40px;
//     height: 40px;
//     margin-right: 10px;
//     border-radius: 50%;
//   }

//   h4 {
//     font-size: 1rem;
//     font-weight: normal;
//   }

//   span {
//     color: ${vars.color + "5"};
//     font-size: .8rem;
//   }

//   &:hover {
//     outline-style: solid;
//     outline-color: ${vars.secundaryColor};
//     outline-width: 2px;
//   }
// `

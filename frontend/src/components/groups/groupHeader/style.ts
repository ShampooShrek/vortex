"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

type StyledProps = {
  imageUrl?: string
}

export const Container = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: 250px;
  background-image: url(${props => props.imageUrl});
  background-position: center;

  background-repeat: no-repeat;
  background-size: 100%;
  object-fit: cover;

  @media screen and (max-width: 764px) {
    height: 225px;
  }

  @media screen and (max-width: 600px) {
    height: 200px;
  }

  @media screen and (max-width: 500px) {
    height: 175px;
  }

  @media screen and (max-width: 400px) {
    height: 150px;
  }
`

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  justify-content: start;
  height: 100%;
  width: 100%;

  img {
    width: 175px;
    object-fit: cover;
    height: 175px;
  }

  span {
    padding: 10px 30px;
    background-color: #000A;
    font-size: 1.4rem;
    color: ${vars.color}
  }

  @media screen and (max-width: 764px) {
    img {
      width: 150px;
      height: 150px;
    }
  }

  @media screen and (max-width: 600px) {
    img {
      width: 125px;
      height: 125px;
    }
  }

  @media screen and (max-width: 500px) {
    img {
      width: 100px;
      height: 100px;
    }
  }

  @media screen and (max-width: 400px) {
    img {
      width: 75px;
      height: 75px;
    }
    span {
      padding: 4px 15px;
      font-size: 1rem;
    }
  }
`

export const GroupHeaderButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: 0;
  outline: 0;
  color: #fff;
  background-color: ${vars.secundaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
`

export const ImageEdit = styled.div`
  width: 175px;
  height: 175px; 
  position: relative;
`

export const EditButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  outline: 0;
  border: 0;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  background-color: #0005;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  svg {
    width: 50px;
    height: 50px;
  }
`

export const Button = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`

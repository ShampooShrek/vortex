"use client"

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 20px;
`

type ButtonType = {
  color: string
  background: string
}

export const Button = styled.div<ButtonType>`
  cursor: pointer;
  width: 200px;
  height: 30px;
  color: ${props => props.color};
  background-color: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter .2s ease-in-out;

  &:not(:last-child) {
    margin-right: 10px;
  }

  img {
    width: 15px;
    height: 15px;
  }

  &:hover {
    filter: brightness(2);
  }
`
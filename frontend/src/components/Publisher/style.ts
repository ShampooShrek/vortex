"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Text = styled.span`
  font-size: 1rem;
  color: ${vars.colorAlpha};
  margin-bottom: 10px;
`

export const CreateButton = styled.button`
  cursor: pointer;
  padding: 5px 20px;
  border: 0;
  outline: 0;
  border-radius: 2px;
  color: ${vars.color};
  background-color: ${vars.secundaryColor};
`

export const Table = styled.table`
  width: 800px;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Tr = styled.tr`
  background-color: ${vars.containers.secundaryColor};

  &:hover {
    background-color: ${vars.containers.secundaryColor + "55"};
  }
`

export const Th = styled.th`
  padding: 10px;
  color: #fff;
  text-align: left;
  background-color: ${vars.containers.primaryColor};
`;

export const Td = styled.td`
  padding: 10px;
  color: #fff;
  position: relative;
  font-size: .9rem;
`;

export const SpanName = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    object-fit: fill;
  }
`

export const CreateCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 600px;
  height: 400px;

  background-color: ${vars.containers.primaryColor};
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px;
  border-radius: 10px;
  z-index: 121;

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`

export const CardHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  
  h1 {
    font-size: 2rem;
    font-weight: normal;
    color: ${vars.color};
  }
`

export const CardContent = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  input {
    width: 60%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

export const CardText = styled.div`
  margin-bottom: 20px;

  span {
    font-size: 1rem;
    color: ${vars.colorAlpha};
  }
`

export const Black = styled.div`
  width: 100%;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 120;
  background-color: #0005;
`
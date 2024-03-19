"use client"

import styled from "styled-components";
import vars from "@/styles/vars";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  margin: 20px 0;

  h2 {
    font-size: 2rem;
    font-weight: normal;
    color: ${vars.color};
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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

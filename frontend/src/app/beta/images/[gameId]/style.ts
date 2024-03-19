"use client"

import vars from "@/styles/vars";
import styled from "styled-components";


export const ImageContainer = styled.div`
  width: 60%;
  padding: 20px;
  background-color: ${vars.containers.secundaryColor};
  border-radius: 10px;

  :not(:last-child) {
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    font-size: 0.9rem;
    padding: 5px 20px;
    background-color: ${vars.secundaryColor};
    border-radius: 5px;
  }
`
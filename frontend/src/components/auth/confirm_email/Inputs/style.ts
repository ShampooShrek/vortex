"use client"

import vars from "@/styles/vars";
import styled from "styled-components";

export const Input = styled.input`
  width: 60px;
  height: 60px;
  border: 1px solid ${vars.lineColor};
  text-align: center;
  color: ${vars.color};
  outline: 0;
  font-size: 1.5rem;
  background-color: ${vars.containers.primaryColor};
  text-transform: uppercase;
  border-radius: 5px;
`
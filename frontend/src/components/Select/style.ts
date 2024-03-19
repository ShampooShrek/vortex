import vars from "@/styles/vars";
import styled from "styled-components";

interface OptionsProps {
  marginTop: boolean
}

export const Options = styled.select<OptionsProps>`
  cursor: pointer;
  width: 150px;
  outline: 0;
  padding: 0;
  border: 0;
  padding: 10px;
  margin-top: ${props => props.marginTop ? "20px" : "0"};
  text-align: center;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};
  border-radius: 5px;

  option {
    cursor: pointer;
    text-align: center;
    background-color: #000;
    width: 100px;
    color: ${vars.colorAlpha};
    background-color: ${vars.containers.secundaryColor};
    border: 0;
    outline: 0;
  }
`
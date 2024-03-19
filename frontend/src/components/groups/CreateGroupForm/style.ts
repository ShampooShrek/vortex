import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  label {
    font-size: .9rem;
    color: ${vars.colorAlpha};
    margin-bottom: 5px;
  }

  input {
    outline: 0;
    border: 1px solid ${vars.containers.primaryColor};
    padding: 10px;
    font-size: 1rem;
    color: ${vars.colorAlpha};
    border-radius: 3px;
    background-color: ${vars.containers.secundaryColor};
  }
`

export const Options = styled.select`
  width: 150px;
  outline: 0;
  padding: 0;
  border: 0;
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};
  border-radius: 5px;

  option {
    text-align: center;
    background-color: #000;
    width: 100px;
    color: ${vars.colorAlpha};
    background-color: ${vars.containers.secundaryColor};
    border: 0;
    outline: 0;
  }
`
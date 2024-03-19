import vars from "@/styles/vars";
import styled from "styled-components";


export const TextAreaSection = styled.div`
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const Label = styled.label`
  font-size: .9rem;
  color: ${vars.colorAlpha};
  margin-bottom: 5px;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  resize: none;
  padding: 10px;
  overflow-x: auto;
  color: ${vars.colorAlpha};
  outline: 0;
  border: 1px solid ${vars.containers.primaryColor};
  background-color: ${vars.containers.secundaryColor};
  font-size: 1rem;

  /* border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px; */

  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  
  }

  &::-webkit-scrollbar-track {
    background: ${vars.topBar.background};
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${vars.secundaryColor};
    height: 3rem;
    border-radius: 50px;
  }
`
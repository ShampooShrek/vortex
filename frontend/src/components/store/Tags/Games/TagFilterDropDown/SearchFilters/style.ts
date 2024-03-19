import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`

export const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: normal;
`

export const Input = styled.input`
  width: 80%;
  margin-top: 10px;
  color: ${vars.color};
  outline: 0;
  border: 0;
  background-color: #444;
  border-radius: 5px;
  padding: 5px;
  font-size: .8rem;
`
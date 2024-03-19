import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputContainers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: start;
  margin-bottom: 20px;
`
export const Text = styled.span`
  color: ${vars.colorAlpha};
  font-size: .9rem;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const EmailText = styled.span`
  color: ${vars.color};
`
import vars from "@/styles/vars";
import styled from "styled-components";


export const PrivacityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`

export const PrivacityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  select {
    margin-left: 20px;
  }
`

export const PrivacityContent = styled.div`
  margin-top: 10px;

  span {
    font-size: 1.1rem;
    color: ${vars.colorAlpha};
  }
`
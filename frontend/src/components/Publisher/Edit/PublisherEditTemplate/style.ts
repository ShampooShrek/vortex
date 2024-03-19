import { Line } from "@/styles/global";
import vars from "@/styles/vars";
import styled from "styled-components";


interface ContainerProps {
  isRendering: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: ${props => props.isRendering ? "block" : "none"};
`

export const HeaderEdit = styled.div`
  
  margin-bottom: 20px;

  span {
    font-size: 1.1rem;
    color: ${vars.colorAlpha};
  }
`

export const Sections = styled.div`
  width: 100%;
  display: block;
  margin: 20px 0 60px 0;
`

export const SectionTitle = styled.h3`
  font-weight: normal;
`

export const SectionLine = styled(Line)`
  width: 100%;
  margin: 2px 0 10px 0;
`

export const SectionContent = styled.div`
  width: 100%;
`
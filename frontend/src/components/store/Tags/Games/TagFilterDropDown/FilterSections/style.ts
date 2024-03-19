import vars from "@/styles/vars"
import styled from "styled-components"

export const Section = styled.div`
  width: 100%;
  margin: 15px 0;

  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: normal;
  cursor: pointer;

  svg {
    width: 25px;
  }
`

type SectionContentProps = {
  isOpen: boolean
}

export const SectionContent = styled.div<SectionContentProps>` 
  margin-right: auto;
  width: 100%;
  display: ${props => props.isOpen ? "flex" : "none"};
  flex-direction: column;
  align-items: start;
  overflow: hidden;
`

type ContentProps = {
  isSelected: boolean
}

export const Content = styled.span<ContentProps>`
  width: 100%;
  cursor: pointer;
  font-size: .75rem;
  padding: 5px 0;
  border-left: 6px solid ${props => props.isSelected ? vars.secundaryColor : "transparent"};
  padding-left: 10px;
  transition: background-color .1s ease-in-out;

  &:hover {
    background-color: ${vars.color + "1"};
  }
`

export const ShowMoreButton = styled<any>(Content)`
  color: ${vars.color + "7"};
  margin: 0;
  border-color: transparent;

  &:hover {
    background-color: transparent;
    color: ${vars.color};
  }

`
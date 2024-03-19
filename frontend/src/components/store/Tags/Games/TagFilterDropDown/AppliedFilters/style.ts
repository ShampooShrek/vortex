import vars from "@/styles/vars";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`

export const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: normal;
`

export const FiltersContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
`

export const Filter = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
  background-color: ${vars.color + "1"};
  color: ${vars.color};
  font-size: .8rem;

  svg {
    width: 15px;
    margin-right: 1px;
  }
`
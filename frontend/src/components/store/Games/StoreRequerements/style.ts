import styled from "styled-components"

export const RequerementsContainer = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`

export const Requerements = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 15px;
  }

  @media screen and (max-width: 500px) {
    margin: 0;
    &:last-child {
      margin-top: 10px;
    }
  }
`

export const RequerementsContent = styled.span`
  line-height: 20px;
  font-size: .8rem;
  margin-bottom: 5px;
`
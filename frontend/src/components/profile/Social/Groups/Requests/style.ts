import vars from "@/styles/vars";
import styled from "styled-components";



export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
`
export const GroupCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const GroupImageStatus = styled.div`
  display: flex;
`

export const GroupButtonsActions = styled.div`
  display: flex;
  flex-direction: column;
`

export const GroupImg = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 5px;
`

export const UserContent = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;

  a {
    text-decoration: none;
    font-size: 1.2rem;
    color: ${vars.color};
    font-weight: normal;

    &:hover { color: ${vars.secundaryColor} }
  }

  span {
    font-size: 1rem;
    color: ${vars.colorAlpha};
  }
`

export const ButtonAction = styled.button`
  padding: 10px 5px;
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};

  &:nth-child(2) {
    margin-top: 5px;
  }
`

export const ButtonLink = styled.a(ButtonAction)
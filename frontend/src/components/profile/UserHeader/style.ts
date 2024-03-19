import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";

export const UserHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  @media screen and (max-width: 764px) {
    flex-direction: column;
    align-items: start;
  }

`

export const UserHeaderImageAside = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 764px) {
    margin-bottom: 10px;
  }

`

export const UserImageHeader = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid ${vars.secundaryColor};
  margin-right: 10px;
`

export const UserHeaderContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: start;
`

export const UserNickname = styled.h3`
  font-weight: 500;
  font-size: 1.8rem;
  color: ${vars.color};
  margin-bottom: 5px;
`

export const UserRealName = styled.span`
  font-size:1rem;
  color: ${vars.color};
`

export const UserHeaderActions = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 764px) {
    margin-bottom: 5px;
    width: 100%;
    justify-content: end;
  }


`

export const ActionButton = styled.button`
  cursor: pointer;
  margin-left: 5px;
  border: 2px solid black;
  padding: 5px 10px;
  outline: 0;
  color: ${vars.color};
  background-color: ${vars.lineColor};
  border-radius: 5px;
  transition: filter .2s ease-in-out;

  
  &:hover {
    filter: brightness(1.4);
  }

`

export const ActionButtonLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
  border: 2px solid black;
  font-size: .8rem;
  padding: 5px 10px;
  outline: 0;
  color: ${vars.color};
  background-color: ${vars.lineColor};
  border-radius: 5px;
  transition: filter .2s ease-in-out;

  &:hover {
    filter: brightness(1.4);
  }




`
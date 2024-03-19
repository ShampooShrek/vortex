import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";



export const SearchUsersCard = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${vars.containers.primaryColor};
  transition: .2s ease-in-out;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`

export const SearchUsersImageNickname = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  text-decoration: none;
` 

export const SearchUsersImage = styled(Link)`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  
  img {
    width: 100%;
    height: 100%;
    border: 1px solid ${vars.secundaryColor};
    border-radius: 100%;
  }
`

export const SearchusersNickname = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  color: ${vars.color};
`

export const Button = styled.button`
  cursor: pointer;
  width: 200px;
  padding: 5px 0;
  text-align: center;
  background-color: ${vars.secundaryColor};
  color: ${vars.color};
  border: 0;
  outline: 0;
  transition: .3s ease-in-out;

  &:hover {
    filter: brightness(1.4);
  }
`

export const NotFoundMessageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotFoundMessage = styled.div`
  padding: 10px 40px;
  background-color: ${vars.containers.secundaryColor};
  border: 1px solid ${vars.containers.primaryColor};

  span {
    font-size: 1.1rem;
    color: ${vars.color};
  }
`
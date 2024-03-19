import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const UsersLine = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  margin-bottom: 10px;
  gap: 15px;

  &:last-child {
    margin: 0;
  }

  @media screen and (max-width: 764px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`

export const UsersCard = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  background-color: ${vars.containers.secundaryColor};
`

export const UsersImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    font-size: .9rem;
    color: ${vars.color};
    font-weight: normal;
  }

  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }
`
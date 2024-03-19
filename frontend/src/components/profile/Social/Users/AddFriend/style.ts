import vars from "@/styles/vars";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const EnvitesHeader = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 50%;
    outline: 0;
    border: 1px solid ${vars.containers.primaryColor};
    padding: 5px;
    font-size: 1rem;
    color: ${vars.colorAlpha};
    border-radius: 3px;
    background-color: ${vars.containers.secundaryColor};
  }

  label {
    margin-bottom: 5px;
    text-align: center;
  }
`

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${vars.containers.primaryColor};
`
export const UsersCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const UsersImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
`

export const UserContent = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;

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

export const ButtonAction = styled.button`
  padding: 10px 5px;
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};
`
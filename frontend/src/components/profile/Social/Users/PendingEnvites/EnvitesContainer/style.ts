import vars from "@/styles/vars";
import exp from "constants";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Cards = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin: 0;
  }
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
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  }

  &::-webkit-scrollbar-track {
    background: #000;
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #AB1A1A;
    height: 3rem;
    border-radius: 50px;
  }
`
export const UsersCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${vars.containers.primaryColor};
`

export const UsersImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
`

export const UserContent = styled.div`
  margin-left: 10px;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`

export const ButtonAction = styled.button`
  padding: 5px 0;
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: ${vars.colorAlpha};
  background-color: ${vars.containers.secundaryColor};

  &:nth-child(2) {
    background-color: ${vars.secundaryColor};
    color: ${vars.color};
    margin-left: 10px;
  }

  @media screen and (max-width: 500px) {
    width: 100px;
  }
`
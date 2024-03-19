import vars from "@/styles/vars"
import styled from "styled-components"

export const DevelopersInputContainer = styled.div`
  display: block;
  position: relative;

  input {
    width: 60%;
  }

  @media screen and (max-width: 764px) {
    input {
      width: 100%;
    }
  } 
`

export const DevelopersContainer = styled.div`
  width: 60%;
  background-color: ${vars.containers.primaryColor};
  padding: 5px;

  @media screen and (max-width: 764px) {
    width: 100%;
  } 
`

export const DevelopersLine = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(50px, 100px));
  margin-bottom: 15px;
  gap: 10px;

  &:last-child {
    margin: 0;
  }
`

export const DevelopersCard = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    top: 2px;
    right: 20px;
    position: absolute;
    width: 25px;
    height: 25px;
    z-index: 1;

    transition: transform .1s ease-in-out;

    &:hover {
      transform: scale(1.4, 1.4);
    }

    path {
      color: ${vars.secundaryColor};
    }
  }
`

export const DevelopersImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const UserContent = styled.div`
text-align: center;
  h3 {
    font-size: .8rem;
    color: ${vars.color};
    font-weight: normal;
  }

  span {
    font-size: .8rem;
    color: ${vars.colorAlpha};
  }
`

// -- Developers DropDown --
export const DevelopersContainerDropDown = styled.div`
  width: 60%;
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;

  background-color: ${vars.containers.primaryColor};
  z-index: 2;
`
export const DevelopersCardDropDown = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }

  svg {

  }
`

export const DevelopersImgDropDown = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
`

export const DeveloperContentDropDown = styled.div`
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
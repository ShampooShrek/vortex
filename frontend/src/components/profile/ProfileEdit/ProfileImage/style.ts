import vars from "@/styles/vars";
import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserImageContaienr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: unsafe;
    align-items: center;
  }
`

export const UserImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${vars.secundaryColor};
  
  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`

export const InputFile = styled.button`
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: ${vars.secundaryColor};
  color: ${vars.color};
  padding: 10px 25px;
  text-align: center;
  font-size: 1rem;

  &:hover {
    background-color: aqua;
  }
`

export const CropContaienr = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.containers.primaryColor};

  & > div, & > div > div, & > div > div > img {
    max-height: 600px;
  }
`
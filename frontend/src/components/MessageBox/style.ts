import vars from "@/styles/vars";
import styled from "styled-components";

export const Black = styled.div`
  cursor: pointer;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: #0004;
`

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  padding: 40px;
  width: 30%;
  height: 300px;
  border-radius: 10px;
  background-color: ${vars.containers.secundaryColor};
  z-index: 10000;
`

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }
`

interface TypeIconProps {
  typeResponse: "error" | "success"
}

export const TypeIcon = styled.div<TypeIconProps>`
  margin-bottom: 20px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;


  svg {
    width: 100px;
    height: 100px;

    path {
      color: ${props => props.typeResponse === "error" ? "red" : "green"}; 
    }
  }
`

export const Message = styled.div`
  width: 100%;
  text-align: center;

  span {
    font-size: 1.2rem;
    color: ${vars.color};
  }
`
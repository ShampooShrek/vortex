import vars from "@/styles/vars";
import styled from "styled-components";

type ActionButton = {
  type: "next" | "preview"
}

export const ActionButton = styled.div<ActionButton>`
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 150px;
  width: 50px;
  background-color: #0007;

  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.type === "preview" ? `left: -60px` : `right: -60px`};
  transition: .2s ease-in-out;

  svg {
    path {
      color: #fff;
      font-size: 2rem;
      font-weight: bold; 
    }
  }

  &:hover {
    background-color: ${vars.secundaryColor};
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`
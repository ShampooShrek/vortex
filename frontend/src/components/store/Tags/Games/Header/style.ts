import vars from "@/styles/vars";
import styled from "styled-components";


export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  overflow-x: visible;
  overflow-y: visible;

  &::-webkit-scrollbar {
  height: 3px;
}


&::-webkit-scrollbar-thumb {
  background-color: #AB1A1A;
  height: 1px;
  width: 1px;
  border-radius: 50px;
}

@media screen and (max-width: 500px) {
    display: none;
  }
`

type ContentProps = {
  selected: boolean
}

export const Content = styled.span<ContentProps>`
  cursor: pointer;
  margin-right: 30px;
  font-size: 1rem;
  font-weight: normal;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: ${props => props.selected ? "1px" : "0"};
    background-color: ${vars.secundaryColor};
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const MobileHeader = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 500px) {
    display: flex;
  }
`

export const MobileHeaderSelected = styled.div`
  padding: 5px;
  background-color: ${vars.containers.secundaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  span {
    font-size: 1rem;
    color: ${vars.color};
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

interface MobileHeaderSelectedDropDownProps {
  isOpen: boolean
}

export const MobileHeaderDropDown = styled.div<MobileHeaderSelectedDropDownProps>`
  width: 100%;
  padding: 5px; 
  display: ${props => props.isOpen ? "flex" : "none"};
  flex-direction: column;
`

export const MobileHeaderDropDownContent = styled.span`
  color: ${vars.colorAlpha};
  width: 100%;
  cursor: pointer;
  padding: 10px;

`
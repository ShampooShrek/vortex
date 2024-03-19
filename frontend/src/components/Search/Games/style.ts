import vars from "@/styles/vars";
import styled from "styled-components";


interface FiltersContainerProps {
  isOpen: boolean
}

interface NoteIcon {
  note: "like" | "deslike"
}


export const Black = styled.div<FiltersContainerProps>`
  width: 100%;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 120;
  background-color: #0004;
  display: none;

  @media screen and (max-width: 764px) {
    display: ${props => props.isOpen ? "block" : "none"};
  }
`

export const AsideButton = styled.div<FiltersContainerProps>`
  position: fixed;
  top: 30%;
  right: 0; 
  display: none;
  z-index: 100;
  cursor: pointer;

  svg {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 100%;
    background-color: ${vars.containers.primaryColor};
    opacity: .8;
  }

  @media screen and (max-width: 764px) {
    display: ${props => !props.isOpen ? "block" : "none"};
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: 764px) {
    display: block;
  }
`

export const GamesContainer = styled.div`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }
    @media screen and (max-width: 764px) {
    width: 100%;
  }
`

export const GamesHeader = styled.div`
  width: 100%;
  padding: 5px;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  @media screen and (max-width: 764px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
`

export const GamesHeaderInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  input {
    width: 100%;
  }

  button {
    cursor: pointer;
    height: 100%;
    margin-left: 10px;
    padding: 5px 20px;
    border-radius: 5px; 
    border: 0;
    outline: 0;
    background-color: ${vars.secundaryColor};
    color: ${vars.color};
    &:hover {
      filter: brightness(1.4)
    }
  }

  @media screen and (max-width: 764px) {
    margin-bottom: 15px;
  }
`

export const GamesCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

interface GamesCardProps {
  isSearching: boolean
}

export const GamesCard = styled.div<GamesCardProps>`
  opacity: ${props => props.isSearching ? "0.6" : "1"};
  cursor: pointer;
  width: 100%;
  padding: 5px 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background-color: ${vars.containers.secundaryColor};
  transition: filter .2s ease-in-out;

  &:hover {
    filter: brightness(1.2);
  }
`

export const CardLeftSide = styled.div`
  overflow: hidden;
  width: 70%;
  height: 100%;
  display: flex;

  @media screen and (max-width: 550px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`

export const CardLeftSideMobile = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: start;
  }
`


export const GamesCardImageMobile = styled.div`
  display: flex;
  flex-direction: column;
`

export const GamesCardImage = styled.img`
  width: 125px;
  margin-right: 10px;

  @media screen and (max-width: 500px) {
    width: 100px;
  }
`

export const GameNameDate = styled.div<NoteIcon>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  svg {
    padding: 3px;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-color: ${props => props.note === "deslike" ? vars.secundaryColor : vars.lineColor};

    path {
      color: ${vars.color};
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
  }
`

export const GameName = styled.span`
  font-size: 1rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${vars.color};
`

export const GameDate = styled.span`
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

export const CardRightContent = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    display: none;
  }
  `

export const CardRightContentMobile = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 500px) {
    display: flex;
  }
`


export const NoteAndDiscount = styled.div<NoteIcon>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  height: 25px;
  padding: 2px;
 

  svg {
    padding: 3px;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-color: ${props => props.note === "deslike" ? vars.secundaryColor : vars.lineColor};

    path {
      color: ${vars.color};
    }
  }

  @media screen and (max-width: 500px) {
    svg {
      width:20px;
      height: 20px;
    }
  }
`

export const Discount = styled.span`
  padding: 5px 15px;
  font-size: .9rem;
  background-color: ${vars.lineColor};

  @media screen and (max-width: 500px) {
    padding: 3px 8px;
    font-size: .7rem;
    margin-right: 10px;
  }
  
`

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
`

export const Price = styled.span`
  font-size: .9rem;
`

export const OriginalPrice = styled.span`
  font-size: .7rem;
  text-decoration: line-through;
`

export const FiltersContainer = styled.div<FiltersContainerProps>`
  width: 250px;
  /* background-color: ${vars.containers.primaryColor}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  
  @media screen and (max-width: 764px) {
    display: block;
    margin: 0;
    max-height: 100vh;
    max-width: 75vw;
    position: fixed;
    right: 0;
    bottom: 0;
    transform: translateX(${props => props.isOpen ? "0" : "100%"});
    background-color: ${vars.containers.primaryColor};
    padding: 10px;
    z-index: 1000;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: transform .3s ease-in-out;
  }
`

export const FilterCard = styled.div`
  width: 100%;
  margin-bottom: 40px;
  border: 1px solid ${vars.lineColor};
  border-radius: 2px;
`

export const FIlterCardHeader = styled.div`
  width: 100%;
  padding: 5px 5px;
  background-color: ${vars.lineColor};

  span {
    font-size: 1rem;
    color: ${vars.color};
  }
`

export const FilterCardContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;

`

interface CheckContainerProps {
  selected: boolean
}

export const CheckContainer = styled.div<CheckContainerProps>`
  cursor: pointer;
  user-select: none;
  width: 100%;
  padding: 7px;
  display: flex;
  align-items: center;
  background-color: ${props => props.selected ? vars.containers.primaryColor : "transparent"};

  div {
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid ${vars.lineColor};
    background-color: ${props => props.selected ? vars.color : ""};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
  }

  span {
    font-size: .9rem;
    color: ${props => props.selected ? vars.color : vars.colorAlpha};
  }

  &:hover {
    background: ${props => !props.selected && vars.containers.secundaryColor};
  }
`

export const MaxPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MaxPriceInput = styled.input`
  margin-top: 5px;
  width: 100%;
  appearance: none;
  height: 4px;
  border-radius: 30%;
  background-color: ${vars.secundaryColor};

  &::-webkit-slider-thumb {
    appearance: none;
    background: ${vars.color};
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    z-index: 1;
  }
`

export const MaxPricePrice = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  
  span {
    font-size: .8rem;
    color: ${vars.color};
  }
`

export const Button = styled.div`
  width: 200px;
  border-radius: 5px;
  padding: 5px 0;
  display: flex;
  aligin-items: center;
  justify-content: center;
  font-size: .9rem;
  background-color: ${vars.secundaryColor};
  cursor: pointer;
  margin: 0 auto;

`


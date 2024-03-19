import vars from "@/styles/vars"
import styled from "styled-components"

interface StyledProps {
  gameIndex: number
  gameLength: number
}

export const CardGame = styled.div<StyledProps>`
cursor: pointer;
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  /* margin-bottom: ${({ gameIndex, gameLength }) => (gameLength - gameIndex) > 3 ? "50px" : "0"}; */


  a {
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const ImageDiv = styled.div`
  width: 100%;
  position: relative;

  & > img {
    border-radius: 5px;
    /* object-fit: cover; */
    width: 100%;
  }
`

export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const GameTitle = styled.p`
  padding-right: 10px;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 70%;
`

export const GamePriceContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: end;
  align-items: center;
`
export const GamePriceContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
`

export const GamePriceDiscountPercent = styled.span`
  padding: 5px 7px;
  font-size: .9rem;
  border-radius: 3px;
  background-color: ${vars.secundaryColor};
  margin-right: 20px;
`

export const GamePrice = styled.p`
  font-weight: normal;
  font-size: .9rem;
  border-radius: 5px;
`

export const OriginalGamePrice = styled.span`
  font-size: .8rem;
  color: ${vars.colorAlpha};
  text-decoration: line-through;
`

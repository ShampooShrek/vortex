import vars from "@/styles/vars"
import styled from "styled-components"

export const GameWithDiscount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const OriginalPrice = styled.p`
  text-decoration: line-through;
  font-size: .8rem;
  color: ${vars.color + "7"};
`

export const Price = styled.p`
  font-size: .9rem;
  color: ${vars.color};
`

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
`

export const Discount = styled.span`
  font-size: 1.1rem;
  background-color: ${vars.secundaryColor};
  padding: 2px 5px;
  border-radius: 3px;
  text-align: center;
`

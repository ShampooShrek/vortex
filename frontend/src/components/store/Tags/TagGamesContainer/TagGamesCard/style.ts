import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";

type StyledProps = {
  index: number
}

export const Card = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;

`

export const ImageContainer = styled.div`
  width: 100%;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const DiscountContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  align-items: center;
`
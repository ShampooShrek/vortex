import vars from "@/styles/vars";
import Link from "next/link";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const TitleContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  text-align: center;
`

export const Title = styled.h3`
  margin-bottom: 5px;
  font-size: 2rem;
  font-weight: normal;
  color: ${vars.color};
`

export const Subtitle = styled.h5`
  font-weight: normal;
  color: ${vars.colorAlpha};
  font-size: 1.2rem;
`

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const SearchResponseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

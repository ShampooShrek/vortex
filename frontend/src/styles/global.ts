"use client"

import styled from 'styled-components';
import vars from './vars';

interface BarProps {
  width: string
  height: string
  margin: string
}

export const Bar = styled.div<BarProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({margin}) => margin};
  border-radius: 5px;
  background-color: ${vars.secundaryColor};
`

interface LineProps {
  width?: string
  margin?: string
}

export const Line = styled.div<LineProps>`
  margin: ${props => props.margin ? props.margin : "40px"} auto;
  width: ${props => props.width ? props.width : "90%"};
  height: 1px;
  border-radius: 50%;
  background-color: #404857;
`

export const Category = styled.div`

`
export const DiscountContainer = styled.div`
  display: flex;
`
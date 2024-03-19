"use client"

import { useState, useEffect } from "react"
import * as S from "./style"

type FilterOptions = {
  onClick: (text: string, type: string) => void
  text: string
}

interface FilterAvaliationsProps {
  filterName: string,
  selectedFilter: string,
  typeFilter: string
  filters: FilterOptions[]
}

const FilterAvaliations = ({ filterName, filters, selectedFilter, typeFilter }: FilterAvaliationsProps) => {
  const [isActived, setIsActived] = useState(false)

  const handleClick = (ev: React.MouseEvent, callback: (text: string, type: string) => void, type: string, text: string) => {
    ev.stopPropagation()
    setIsActived(false)
    callback(text, type)
  }

  return (
    <S.FilterContainer>
      <S.FilterName>{filterName}:</S.FilterName>
      <S.FilterButton onClick={() => setIsActived(actived => actived ? false : true)}>
        <span>{selectedFilter}</span>
        <S.DropDownContainer isActived={isActived}>
          <S.DropDownList>
            {filters.map(filter => (
              <span key={filter.text}
                onClick={e => handleClick(e, filter.onClick, typeFilter, filter.text)}>{
                  filter.text}
              </span>
            ))}
          </S.DropDownList>
        </S.DropDownContainer>
      </S.FilterButton>
    </S.FilterContainer>
  )
}

export default FilterAvaliations

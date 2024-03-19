"use client"

import * as S from "./style"
import Filter from "./filterContainer"
import { MouseEventHandler, useState } from "react"
import FilterOptions from "./filterContainer/FilterOptions"
import { FiltersOptions, UserDetails } from "@/models/frontModels"

interface ContainerGameJoltProps {
  filters: FiltersOptions[]
  children: React.ReactNode
  selectedFilter: string
  border?: boolean
  padding?: boolean
  background?: boolean
}


function ContainerGameJolt({ children, filters, selectedFilter, background = true, border = true, padding = true }: ContainerGameJoltProps) {
  const [selectedOption, setSelectedOption] = useState<number>(1)

  return (
    <S.Container>
      <Filter>
        {filters.map((filter, i) => (
          <FilterOptions
            key={`${i}-${filter.key}`}
            isSelected={selectedFilter === filter.key}
            onClick={filter.onClick}
            option={filter.option} />
        ))}
      </Filter>
      <S.Content background={background} border={border} padding={padding}>
        {children}
      </S.Content>
    </S.Container>
  )
}

export default ContainerGameJolt

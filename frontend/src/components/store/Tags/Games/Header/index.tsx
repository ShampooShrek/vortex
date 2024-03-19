"use client"

import { useState } from "react"
import { ArrowDownIcon } from "@/components/Icons"
import * as S from "./style"

interface CategoryGamesHeaderProps {
  sortingFilterSelected: "mostsallers" | "promotions" | "betteravaliations" | null
  handleSelectSortingFilter(filter:  "mostsallers" | "promotions" | "betteravaliations" | null): void
}

const CategoryGamesHeader = ({ handleSelectSortingFilter, sortingFilterSelected }: CategoryGamesHeaderProps) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <S.Header>
        <S.Content onClick={() => handleSelectSortingFilter(null)} selected={!sortingFilterSelected}>
          Todos os Items
        </S.Content>
        <S.Content onClick={() => handleSelectSortingFilter("mostsallers")} selected={sortingFilterSelected === "mostsallers"}>
          Mais Vendidos
        </S.Content>
        <S.Content onClick={() => handleSelectSortingFilter("betteravaliations")} selected={sortingFilterSelected === "betteravaliations"}>
          Mais Bem Avaliados
        </S.Content>
        <S.Content onClick={() => handleSelectSortingFilter("promotions")} selected={sortingFilterSelected === "promotions"}>
          Em Promoção
        </S.Content>
      </S.Header>
      <S.MobileHeader>
        <S.MobileHeaderSelected onClick={() => setIsOpen(prev => !prev)}>
          <span>
            {sortingFilterSelected === null && "Todos os Items"}
            {sortingFilterSelected === "mostsallers" && "Mais Vendidos"}
            {sortingFilterSelected === "betteravaliations" && "Mais Bem Avaliados"}
            {sortingFilterSelected === "promotions" && "Em Promoção"}
          </span>
          <ArrowDownIcon />
        </S.MobileHeaderSelected>
        <S.MobileHeaderDropDown  isOpen={isOpen}>
          <S.MobileHeaderDropDownContent onClick={() => {handleSelectSortingFilter(null); setIsOpen(false)}}>
            Todos os Items
          </S.MobileHeaderDropDownContent>
          <S.MobileHeaderDropDownContent onClick={() => {handleSelectSortingFilter("mostsallers"); setIsOpen(false)}}>
            Mais Vendidos
          </S.MobileHeaderDropDownContent>
          <S.MobileHeaderDropDownContent onClick={() => {handleSelectSortingFilter("betteravaliations"); setIsOpen(false)}}>
            Mais Bem Avaliados
          </S.MobileHeaderDropDownContent>
          <S.MobileHeaderDropDownContent onClick={() => {handleSelectSortingFilter("promotions"); setIsOpen(false)}}>
            Em Promoção
          </S.MobileHeaderDropDownContent>
        </S.MobileHeaderDropDown>
      </S.MobileHeader>
    </>
  )
}

export default CategoryGamesHeader
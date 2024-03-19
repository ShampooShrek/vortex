"use client"

import { useEffect, useState } from "react"
import * as S from "./style"
import { GameCategories, Genres, Subgenres } from "@/models/dbModels"

interface Filters {
  categories: GameCategories[]
  genres: Genres[]
  subgenres: Subgenres[]
}

interface SearchProps {
  setFilters(filters: Filters): void
  filters: Filters
}

const SearchFilters = ({ filters: { categories, genres, subgenres }, setFilters }: SearchProps) => {

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    filterFilters(searchValue)
  }, [searchValue])

  // const filterFilters = (str: string) => {
  //   const newFilters: Filters = {
  //     categories: [],
  //     genres: [],
  //     subgenres: []
  //   }
  //   const filtersArr = [categories, genres, subgenres]
  //   filtersArr.map((filter, i) => {
  //     const filterIndex: keyof Filters = Object.keys(newFilters)[i] as keyof Filters
  //     newFilters[filterIndex] = filter.filter(e => 
  //       e.portugueseName.replaceAll(" ", "").toLowerCase().includes(str.replaceAll(" ", "").toLowerCase()))
  //   })
  //   setFilters(newFilters)
  // }

  const filterFilters = (str: string) => {
    let newFilters: Filters = {
      categories,
      genres,
      subgenres
    }

    newFilters.categories = newFilters.categories.filter(cat => 
      cat.portugueseName.replaceAll(" ", "").toLowerCase().includes(str.replaceAll(" ", "").toLowerCase())
    )

    newFilters.genres = newFilters.genres.filter(genre => 
      genre.portugueseName.replaceAll(" ", "").toLowerCase().includes(str.replaceAll(" ", "").toLowerCase())
    )

    newFilters.subgenres = newFilters.subgenres.filter(subgenre => 
      subgenre.portugueseName.replaceAll(" ", "").toLowerCase().includes(str.replaceAll(" ", "").toLowerCase())
    )

    setFilters(newFilters)

  }

  return (
    <S.Container>
      <S.SectionTitle>Pesquisar:</S.SectionTitle>
      <S.Input type="text" value={searchValue} onChange={ev => setSearchValue(ev.target.value)} />
    </S.Container>
  )
}

export default SearchFilters
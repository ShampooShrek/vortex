"use client"

import * as S from "./style"
import { useState, useEffect } from "react"
import FilterSections from "./FilterSections"
import AppliedFilters from "./AppliedFilters"
import { FilterIcon, XIcon } from "@/components/Icons"
import SearchFilters from "./SearchFilters"
import { GameCategories, Genres, Subgenres } from "@/models/dbModels"
import { GamesStore } from "@/models/frontModels"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"

interface Filters {
  categories: GameCategories[]
  genres: Genres[]
  subgenres: Subgenres[]
}

interface CategoryFilterDropDownProps {
  filters: Filters
  sortingFilter: "mostsallers" | "promotions" | "betteravaliations" | null
  handleFilterGames(newGames: GamesStore[]): void
  handleGamesPagination(newGames: GamesStore[]): void
  tag: string
  page: number
}

interface FilterGamesResponseType {
  games: GamesStore[]
  limit: number
}

type request = { categories: string[], genres: string[], subgenres: string[], filter: string | null }

const CategoryFilterDropDown = ({ handleFilterGames, filters: startFilters, tag, sortingFilter, page, handleGamesPagination }: CategoryFilterDropDownProps) => {

  const { showMessageBox } = messageAuth()

  const [filters, setFilters] = useState<Filters>(startFilters)
  const [openDropDown, setOpenDropDown] = useState<boolean>(false)
  const [appliedFilters, setAppliedFilters] = useState<string[]>([])

  useEffect(() => {
    filterGames()
  }, [appliedFilters, sortingFilter])

  useEffect(() => {
    if (page > 1) {
      paginationGames()
    }
  }, [page])

  const filtersToObject = (): request => {
    const obj: request = {
      categories: [],
      genres: [],
      subgenres: [],
      filter: sortingFilter
    }

    startFilters.categories.map(cat => {
      appliedFilters.includes(cat.portugueseName) && obj.categories.push(cat.category)
    })

    startFilters.genres.map(genre => {
      appliedFilters.includes(genre.portugueseName) && obj.genres.push(genre.genre)
    })

    startFilters.subgenres.map(subgenre => {
      appliedFilters.includes(subgenre.portugueseName) && obj.subgenres.push(subgenre.subgenre)
    })
    return obj
  }

  const handleAppliedFilters = (filter: string) => {
    if (appliedFilters.includes(filter)) {
      setAppliedFilters(filters => filters.filter(f => f !== filter))
    } else {
      setAppliedFilters([...appliedFilters, filter])
    }
  }
  const handleFilterFilters = (filters: Filters) => {
    setFilters(filters)

  }
  const filterGames = async () => {
    handleFilterGames([])

    const resp = await ApiRequest<FilterGamesResponseType>(`/api/games/filters/filter_games/${tag}`, "post", filtersToObject())
    if (resp) {
      if (resp.type === "success") {
        const data = resp.response as FilterGamesResponseType
        handleFilterGames(data.games as GamesStore[])
      } else {
        showMessageBox(resp.response as string, "error")
        handleFilterGames([])
      }
    }
  }

  const paginationGames = async () => {
    const resp = await ApiRequest<FilterGamesResponseType>(`/api/games/filters/filter_games/${tag}?page=${page}`, "post", filtersToObject())
    if (resp) {
      const data = resp.response as FilterGamesResponseType
      if (resp.type === "success") handleGamesPagination(data.games as GamesStore[])
      else {
        showMessageBox(resp.response as string, "error")
      }
    }
  }

  return (
    <S.Container>
      <S.DropDownButton onClick={() => setOpenDropDown(open => open ? false : true)}>
        {openDropDown ? (
          <><XIcon /> Fechar</>
        ) : (
          <><FilterIcon /> Filtrar Por</>
        )}
      </S.DropDownButton>
      <S.DropDownContainer isOpen={openDropDown}>
        <AppliedFilters setAppliedSlice={handleAppliedFilters} filters={appliedFilters} />
        <SearchFilters filters={startFilters} setFilters={handleFilterFilters} />
        <FilterSections
          setAppliedFilters={handleAppliedFilters}
          appliedFilters={appliedFilters}
          sectionName="Categorias"
          contents={filters.categories} />
        <FilterSections
          setAppliedFilters={handleAppliedFilters}
          appliedFilters={appliedFilters}
          sectionName="Generos"
          contents={filters.genres} />

        <FilterSections
          setAppliedFilters={handleAppliedFilters}
          appliedFilters={appliedFilters}
          sectionName="Sub Generos"
          contents={filters.subgenres} />
      </S.DropDownContainer>

    </S.Container>
  )
}

export default CategoryFilterDropDown

"use client"

import authHook from "@/data/hooks/authHook"
import { Filters, GamesStore } from "@/models/frontModels"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import * as S from "./style"
import FormInput from "@/components/Inputs/FormInput"
import Select from "@/components/Select"
import ApiRequest from "@/utils/ApiRequests"
import { DateFormaterBar } from "@/utils/dateFormater"
import Link from "next/link"
import { BarRightSideIcon, DeslikeIcon, LikeIcon } from "@/components/Icons"
import { Line } from "@/styles/global"
import { Black } from "@/components/Publisher/style"
import messageAuth from "@/data/hooks/messageHook"

interface SearchGamesProps {
  tags: Filters
}

interface GamesRequest {
  games: GamesStore[]
  limit: number
}

const stringArrToNumber = (arr: string[]): number[] => {
  const numberArr = arr.map(e => Number(e))
  return numberArr
}


export default function SearchGames({ tags }: SearchGamesProps) {
  const { showMessageBox } = messageAuth()
  const searchParams = useSearchParams()

  const paramSortingBy = searchParams.get("sortingby") ?? ""
  const paramCategories = searchParams.get("cat")
  const paramGenres = searchParams.get("gen")
  const paramSubgenres = searchParams.get("subgen")
  const searchParam = searchParams.get("term") ?? ""
  const maxPriceParam = searchParams.get("maxprice") ?? null
  const ocultUserPurshadGamesParam = searchParams.get("hiddengames") ?? false
  const especialOffersParams = searchParams.get("especials") ?? false

  const [categories, setCategories] = useState(tags.categories)
  const [categoriesSearch, setCategoriesSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<number[]>
    (paramCategories ? stringArrToNumber(paramCategories.split(",")) : [])

  const [genres, setGenres] = useState(tags.genres)
  const [genresSearch, setGenresSearch] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<number[]>
    (paramGenres ? stringArrToNumber(paramGenres.split(",")) : [])

  const [subgenres, setSubgenres] = useState(tags.subgenres)
  const [subgenresSearch, setSubgenresSearch] = useState("")
  const [selectedSubgenres, setSelectedSubgenres] = useState<number[]>
    (paramSubgenres ? stringArrToNumber(paramSubgenres.split(",")) : [])

  const [maxPrice, setMaxPrice] = useState<number | null>(maxPriceParam ? Number(maxPriceParam) : null)
  const [search, setSearch] = useState(searchParam)
  const [ocultUserPurshadGames, setOcultUserPurshadGames] = useState(ocultUserPurshadGamesParam)
  const [especialOffers, setEspecialOffers] = useState(especialOffersParams)
  const [sortingBy, setSortingBy] = useState(paramSortingBy)

  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice ? maxPrice / 10 : 16)
  const [prevMaxPrice, setPrevMaxPrice] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [games, setGames] = useState<GamesStore[]>([])

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)
  const [limit, setLimit] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    setButtonVisible(true)
    updateUrl()
    getGames()
  }, [
    selectedCategories, selectedGenres,
    selectedSubgenres, ocultUserPurshadGames,
    especialOffers, sortingBy
  ])

  useEffect(() => {
    if (page > 1) {
      getPaginationGames()
    }
  }, [page])

  useEffect(() => {
    setCategories(() =>
      tags.categories.filter(cat => cat.portugueseName.replace(" ", "").toLowerCase()
        .includes(categoriesSearch.replace(" ", "").toLowerCase()))
    )
  }, [categoriesSearch])

  useEffect(() => {
    setGenres(() =>
      tags.genres.filter(genre => genre.portugueseName.replace(" ", "").toLowerCase()
        .includes(genresSearch.replace(" ", "").toLowerCase()))
    )
  }, [genresSearch])

  useEffect(() => {
    setSubgenres(() =>
      tags.subgenres.filter(cat => cat.portugueseName.replace(" ", "").toLowerCase()
        .includes(subgenresSearch.replace(" ", "").toLowerCase()))
    )
  }, [subgenresSearch])

  useEffect(() => {
    if (maxPrice !== null) {
      if (maxPrice === 0) {
        setMaxPriceValue(0)
        setMaxPrice(0)
      } else if (maxPrice === 160) {
        setMaxPriceValue(16)
        setMaxPrice(null)
      } else {
        if (maxPrice % 10 === 0) {
          setMaxPriceValue(maxPrice / 10)
        } else {
          setMaxPriceValue(16)
          setMaxPrice(null)
        }
      }
    } else {
      setMaxPriceValue(16)
    }
  }, [maxPrice])

  const getBody = () => {
    return {
      categories: selectedCategories,
      genres: selectedGenres,
      subgenres: selectedSubgenres,
      maxPrice,
      name: search,
      ocultUserPurshadGames,
      especialOffers,
      sorting: sortingBy ?? null
    }
  }

  const getPaginationGames = async () => {
    const body = getBody()
    const resp = await ApiRequest<GamesRequest>(`/api/games/search?page=${page}`, "post", body)
    if (resp) {
      if (resp.type === "success") {
        const data = resp.response as GamesRequest
        setLimit(data.limit)
        setGames(prev => [...prev, ...data.games])
        if (data.games.length < limit) {
          setButtonVisible(false)
        }
      } else {
        showMessageBox(resp.response as string, "error")
      }
    }
  }

  const getGames = async () => {
    setIsSearching(true)
    const body = getBody()
    const resp = await ApiRequest<GamesRequest>(`/api/games/search`, "post", body)
    if (resp) {
      if (resp.type === "success") {
        const data = resp.response as GamesRequest
        setLimit(data.limit)
        setGames(data.games)
        if (data.games.length < limit) {
          setButtonVisible(false)
        }
      } else {
        showMessageBox(resp.response as string, "error")
      }
    }
    setIsSearching(false)
  }

  const updateUrl = () => {
    let url = window.location.href
    url = url.includes("?") ? url.split("?")[0] : url

    let catParams: string = ""
    let genreParams: string = ""
    let subGenParams: string = ""

    let termParams = search ? `term=${search}&` : ""
    let maxPriceParams = maxPrice ? `maxprice=${maxPrice}&` : ""
    let ocultUserPurshadGamesParams = ocultUserPurshadGames ? `hiddengames=1&` : ""
    let especialOffersParams = especialOffers ? `especials=1&` : ""
    let sortingByParam = sortingBy !== "" ? `sortingby=${sortingBy}&` : ""


    if (selectedCategories.length) {
      catParams = "cat="
      selectedCategories.forEach((cat, i) =>
        i <= selectedCategories.length
          ? catParams += `${cat},`
          : catParams += `${cat}&`
      )
    }

    if (selectedGenres.length) {
      genreParams = "gen="
      selectedGenres.forEach((genre, i) => i <= selectedGenres.length - 1
        ? genreParams += `${genre},`
        : genreParams += `${genre}&`
      )
    }

    if (selectedSubgenres.length) {
      subGenParams = "subgen="
      selectedSubgenres.forEach((sub, i) => i <= selectedSubgenres.length
        ? subGenParams += `${sub},`
        : subGenParams += `${sub}&`
      )
    }

    url =
      `${url}?${termParams}${maxPriceParams}${ocultUserPurshadGamesParams}${especialOffersParams}${catParams}${genreParams}${subGenParams}${sortingByParam}`
    window.history.pushState(null, "", url)
  }

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    if (key === "Enter") {
      updateUrl()
      getGames()
    }
  }

  const handleFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    if (name === "categories") {
      setCategoriesSearch(value)
    } else if (name === "genres") {
      setGenresSearch(value)
    } else if (name === "subgenres") {
      setSubgenresSearch(value)
    }
  }

  const categoryAction = (id: number) => {
    const categoryExists = selectedCategories.find(catId => catId === id)
    if (categoryExists) {
      setSelectedCategories(cats => cats.filter(c => c !== id))
    } else {
      const updatedSelectedCategories = [...selectedCategories]
      updatedSelectedCategories.push(id)
      setSelectedCategories(updatedSelectedCategories)
    }
  }

  const genreAction = (id: number) => {
    const genreExists = selectedGenres.find(genreId => genreId === id)
    if (genreExists) {
      setSelectedGenres(genres => genres.filter(c => c !== id))
    } else {
      const updatedSelectedGenres = [...selectedGenres]
      updatedSelectedGenres.push(id)
      setSelectedGenres(updatedSelectedGenres)
    }
  }

  const subgenreAction = (id: number) => {
    const subgenreExists = selectedSubgenres.find(catId => catId === id)
    if (subgenreExists) {
      setSelectedSubgenres(subgenres => subgenres.filter(c => c !== id))
    } else {
      const updatedSelectedSubgenres = [...selectedSubgenres]
      updatedSelectedSubgenres.push(id)
      setSelectedSubgenres(updatedSelectedSubgenres)
    }
  }


  const handleMaxPrice = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.target.value)
    if (value > 0) {
      if (value === 16) {
        setMaxPrice(null)
      } else {
        setMaxPrice(value * 10)
      }
    } else {
      setMaxPrice(0)
    }
  }

  const handleDragEndMaxPrice = async () => {
    if (maxPrice !== prevMaxPrice) {
      updateUrl()
      await getGames()
    }
  }

  const handleOnDragStartMaxPrice = () => {
    setPrevMaxPrice(maxPrice)
  }

  const handleEspecialsClick = () => {
    setEspecialOffers(prev => !prev)
    updateUrl()
  }

  const handleOcultPurshadsClick = () => {
    setOcultUserPurshadGames(prev => !prev)
    updateUrl()
  }

  const handleSelectSorting = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingBy(ev.target.value)
    updateUrl()
  }

  const selectOptions: { text: string, value: string }[] = [
    { text: "Nenhum Selecionado", value: "" },
    { text: "Mais Recentes", value: "mostnew" },
    { text: "Mais Antigos", value: "mostolder" },
    { text: "Nome - descrescente", value: "namedesc" },
    { text: "Nome - crescente", value: "nameasc" },
    { text: "Maior Preço", value: "mostexpensive" },
    { text: "Menor Preço", value: "mostcheaper" },
    { text: "Melhores Avaliados", value: "mostrated" },
    { text: "Piores Avaliados", value: "worstrated" },
  ]

  return (
    <S.Container>
      <S.Black isOpen={isAsideOpen} onClick={() => setIsAsideOpen(false)} />
      <S.AsideButton isOpen={isAsideOpen} onClick={() => setIsAsideOpen(true)}>
        <BarRightSideIcon />
      </S.AsideButton>
      <S.GamesContainer>
        <S.GamesHeader>
          <S.GamesHeaderInputContainer>
            <FormInput
              inputStyle={{ padding: "5px", width: "100%" }}
              type="text"
              value={search}
              onChange={ev => setSearch(ev.target.value)}
              placeholder="Insirá o nome do jogo:"
              marginBottom={false}
              onKeyDown={handleOnKeyDown}
            />
            <button onClick={() => { updateUrl(); getGames() }}>Buscar</button>
          </S.GamesHeaderInputContainer>
          <div>
            <Select
              sectionStyle={{ padding: "5px" }}
              marginTop={false}
              name=""
              onChange={handleSelectSorting}
              value={sortingBy}
              options={selectOptions}
            />
          </div>
        </S.GamesHeader>
        <S.GamesCardContainer>
          {games.map(g => (
            <Link key={g.id} replace href={`/store/games/${g.id}`}>
              <S.GamesCard key={`search-games-${g.id}`} isSearching={isSearching} >
                <S.CardLeftSide>
                  <S.GamesCardImage src={g.horizontalCap.url} />
                  <S.GameNameDate note={g.avaliationsPercent >= 60 ? "like" : "deslike"} >
                    <S.GameName>{g.name}</S.GameName>
                    <S.GameDate>{DateFormaterBar(g.createdAt)}</S.GameDate>
                  </S.GameNameDate>
                </S.CardLeftSide>
                <S.CardLeftSideMobile>
                  <S.GamesCardImageMobile>
                    <S.GamesCardImage src={g.horizontalCap.url} />
                    <S.GameNameDate note={g.avaliationsPercent >= 60 ? "like" : "deslike"} >
                      <S.GameDate>{DateFormaterBar(g.createdAt)}</S.GameDate>
                      {g.avaliationsPercent >= 60 ? <LikeIcon /> : <DeslikeIcon />}
                    </S.GameNameDate>
                  </S.GamesCardImageMobile>
                </S.CardLeftSideMobile>
                <S.CardRightContent>
                  <S.NoteAndDiscount note={g.avaliationsPercent >= 60 ? "like" : "deslike"} >
                    {g.avaliationsPercent >= 60 ? <LikeIcon /> : <DeslikeIcon />}
                    {g.discount > 0 && <S.Discount>{(g.discount * 100).toFixed(0)}%</S.Discount>}
                  </S.NoteAndDiscount>
                  <S.PriceContainer>
                    {g.discount > 0 ? (
                      <>
                        <S.OriginalPrice>R${g.price}</S.OriginalPrice>
                        <S.Price>R${(g.price * (1 - g.discount)).toFixed(2)}</S.Price>
                      </>
                    ) : <S.Price>R${g.price.toFixed(2)}</S.Price>}
                  </S.PriceContainer>
                </S.CardRightContent>
                <S.CardRightContentMobile>
                  <div>
                    <S.GameName>{g.name}</S.GameName>
                  </div>
                  <S.PriceContainer>
                    {g.discount > 0 ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {g.discount > 0 && <S.Discount>{(g.discount * 100).toFixed(0)}%</S.Discount>}
                          <S.PriceContainer>
                            <S.OriginalPrice>R${g.price}</S.OriginalPrice>
                            <S.Price>R${(g.price * (1 - g.discount)).toFixed(2)}</S.Price>
                          </S.PriceContainer>
                        </div>
                      </>
                    ) : <S.Price>R${g.price.toFixed(2)}</S.Price>}
                  </S.PriceContainer>
                </S.CardRightContentMobile>
              </S.GamesCard>
            </Link>
          ))}
          {buttonVisible && (
            <S.Button onClick={() => setPage(prev => prev + 1)}>
              Ver Mais
            </S.Button>
          )}
        </S.GamesCardContainer>
      </S.GamesContainer>
      <S.FiltersContainer isOpen={isAsideOpen}>
        <S.FilterCard>
          <S.FIlterCardHeader>
            <span>Filtrar por preço</span>
          </S.FIlterCardHeader>
          <S.FilterCardContainer>
            <S.MaxPriceContainer>
              <S.MaxPriceInput
                type="range" min={0} max={16}
                value={maxPriceValue}
                onChange={handleMaxPrice}
                onDragStart={handleOnDragStartMaxPrice}
                onDragEnd={handleDragEndMaxPrice}
                onMouseDown={handleOnDragStartMaxPrice}
                onMouseUp={handleDragEndMaxPrice}
              />
              <S.MaxPricePrice>
                {maxPriceValue === 0 && <span>Gratuito</span>}
                {maxPriceValue > 0 && maxPriceValue < 16 && <span>R${maxPrice},00</span>}
                {maxPriceValue === 16 && <span>Qualquer Preço</span>}
              </S.MaxPricePrice>
            </S.MaxPriceContainer>
            <Line width="100%" margin="20px" />
            <S.CheckContainer onClick={handleEspecialsClick} selected={!!especialOffers}>
              <div />
              <span>Ofertas especiais</span>
            </S.CheckContainer>
            <S.CheckContainer onClick={handleOcultPurshadsClick} selected={!!ocultUserPurshadGames}>
              <div />
              <span>Ocultar da biblioteca</span>
            </S.CheckContainer>
          </S.FilterCardContainer>
        </S.FilterCard>

        <S.FilterCard>
          <S.FIlterCardHeader><span>Categorias</span></S.FIlterCardHeader>
          <S.FilterCardContainer>
            {categories.slice(0, 5).map(cat => (
              <S.CheckContainer
                key={cat.category}
                onClick={() => categoryAction(cat.id)}
                selected={!!selectedCategories.find(n => n === cat.id)}>
                <div />
                <span>{cat.portugueseName}</span>
              </S.CheckContainer>
            ))}
            <FormInput
              type="text"
              name="categories"
              value={categoriesSearch}
              onChange={handleFilter}
              placeholder="Pesquisar por categoria"
              inputStyle={{ padding: "5px", fontSize: ".9rem", marginTop: "5px" }}
              marginBottom={false}
            />
          </S.FilterCardContainer>
        </S.FilterCard>

        <S.FilterCard>
          <S.FIlterCardHeader><span>Generos</span></S.FIlterCardHeader>
          <S.FilterCardContainer>
            {genres.slice(0, 5).map(genre => (
              <S.CheckContainer
                key={genre.genre}
                onClick={() => genreAction(genre.id)}
                selected={!!selectedGenres.find(n => n === genre.id)}>
                <div />
                <span>{genre.portugueseName}</span>
              </S.CheckContainer>
            ))}
            <FormInput
              type="text"
              name="genres"
              value={genresSearch}
              onChange={handleFilter}
              placeholder="Pesquisar por genero"
              inputStyle={{ padding: "5px", fontSize: ".9rem", marginTop: "5px" }}
              marginBottom={false}
            />
          </S.FilterCardContainer>
        </S.FilterCard>

        <S.FilterCard>
          <S.FIlterCardHeader><span>Subgeneros</span></S.FIlterCardHeader>
          <S.FilterCardContainer>
            {subgenres.slice(0, 5).map(subgenre => (
              <S.CheckContainer
                key={subgenre.subgenre}
                onClick={() => subgenreAction(subgenre.id)}
                selected={!!selectedSubgenres.find(n => n === subgenre.id)}>
                <div />
                <span>{subgenre.portugueseName}</span>
              </S.CheckContainer>
            ))}
            <FormInput
              type="text"
              name="subgenres"
              value={subgenresSearch}
              onChange={handleFilter}
              placeholder="Pesquisar por subgênero  "
              inputStyle={{ padding: "5px", fontSize: ".9rem", marginTop: "5px" }}
              marginBottom={false}
            />
          </S.FilterCardContainer>
        </S.FilterCard>

      </S.FiltersContainer>
    </S.Container>
  )

}

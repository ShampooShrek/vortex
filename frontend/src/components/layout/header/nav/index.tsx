"use client"

import { useState, FC, useRef, useEffect } from "react"
import * as S from "./style"
import { NavLinks } from "@/components/Link"
import { Bars3Icon, CartIcon, FavoriteIcon, NotificationIcon, SearchIcon, UserIcon } from "../../../Icons"
import { DropDown } from "../dropDown"
import Link from "next/link"
import authHook from "@/data/hooks/authHook"
import ApiRequest from "@/utils/ApiRequests"
import { GamesStore } from "@/models/frontModels"
import { useRouter } from "next/navigation"
import messageAuth from "@/data/hooks/messageHook"

export function Nav() {

  const { user } = authHook()
  const { showMessageBox } = messageAuth()

  const inputRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [cartLenght, setCartLenght] = useState(0)
  const [userDropDown, setUserDropDown] = useState<boolean>(false)
  const [cartDropDown, setCartDropDown] = useState<boolean>(false)
  const [activedSearch, setActivedSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [inputFocus, setInputFocus] = useState(false)
  const [dropDownGames, setDropDownGames] = useState<GamesStore[]>([])
  const [isAsideOpen, setIsAsideOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setCartLenght(user.cart.length)
    }
  }, [user])

  useEffect(() => {
    if (searchValue !== "") {
      const timeout = setTimeout(() => {
        const getGames = async () => {
          const games = await ApiRequest<GamesStore[]>(`/api/games/search/${searchValue}`, "get")
          if(games) {
            if(games.type === "success") {
              setDropDownGames(games.response as GamesStore[])
            } else {
              showMessageBox(games.response as string, "error")
            }
          }
        }
        getGames()
      }, 400);

      return () => {
        clearTimeout(timeout)
      }
    } else {
      setDropDownGames([])
    }
  }, [searchValue])

  const drop = (drop: "user" | "cart") => {
    if (drop === "user") {
      setUserDropDown(!userDropDown)
      setCartDropDown(false)
    } else if (drop === "cart") {
      setCartDropDown(!cartDropDown)
      setUserDropDown(false)
    }
  }

  const activeSearch = () => {
    setActivedSearch((atualValue => {
      const value = !atualValue
      if (value && inputRef.current) {
        inputRef.current.focus()
      }
      if (!value) {
        setSearchValue("")
      }
      return value
    }));
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key

    if (key === "Enter" && linkRef.current) {
      linkRef.current.click()
    }
  }


  return (
    <S.NavComponent>
      <S.NavMobileBlack  isOpen={isAsideOpen}/>
      <S.NavMobileAside isOpen={isAsideOpen}>
        <S.NavMobileAsideIcon>
          <Bars3Icon onClick={() => setIsAsideOpen(p => !p)} />
        </S.NavMobileAsideIcon>
        <S.NavMobileAsideItemsContainer>
          <S.NavMobileAsideItems href={"/home"}>
            Loja
          </S.NavMobileAsideItems>
          <S.NavMobileAsideItems href={"/chat"}>
            Chat
          </S.NavMobileAsideItems>
          {user && (
            <>
              <S.NavMobileAsideItems href={"/cart"}>
                Carrinho({cartLenght})
              </S.NavMobileAsideItems>
            </>
          )}
        </S.NavMobileAsideItemsContainer>
      </S.NavMobileAside>
      <S.Links>
        <NavLinks link="/home" text="Loja" />
        <NavLinks link="/chat" text="Chat" />
      </S.Links>
      <S.Icons>
        <S.SearchSpan>
          <S.InputContainer>
            <S.Input
              isOpen={activedSearch}
              ref={inputRef}
              type="search"
              value={searchValue}
              onChange={ev => setSearchValue(ev.target.value)}
              placeholder="Search..."
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setTimeout(() => setInputFocus(false), 200)}
            />
            {dropDownGames.length > 0 && inputFocus && (
              <S.DropDownSearch>
                {dropDownGames.map(g => (
                  <Link replace href={`/store/games/${g.id}`} key={`dropDown-search-header-${g.id}`}>
                    <S.DropDownCards >
                      <S.DropDownCardImage src={g.horizontalCap.url} />
                      <S.DropDownContent>
                        <S.DropDownContentName>{g.name}</S.DropDownContentName>
                        <S.DropDownContentPrice>R${(g.price * (1 - (g.discount > 0 ? g.discount : 0))).toFixed(2)}</S.DropDownContentPrice>
                      </S.DropDownContent>
                    </S.DropDownCards>
                  </Link>
                ))}
              </S.DropDownSearch>
            )}
          </S.InputContainer>
          <Link ref={linkRef} style={{ display: "none" }} href={`/search/games?term=${searchValue}`} ></Link>
          <SearchIcon onClick={activeSearch} />
        </S.SearchSpan>
        {user && (
          <>
            <Link replace href={'/cart'}>
              <span>{cartLenght}</span>
              <CartIcon onClick={() => drop("cart")} />
            </Link>
          </>
        )}
      </S.Icons>
      <S.MobileIcons>
          <Bars3Icon onClick={() => setIsAsideOpen(p => !p)} />
      <S.SearchSpan>
          <S.InputContainer>
            <S.Input
              isOpen={activedSearch}
              ref={inputRef}
              type="search"
              value={searchValue}
              onChange={ev => setSearchValue(ev.target.value)}
              placeholder="Search..."
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setTimeout(() => setInputFocus(false), 200)}
            />
            {dropDownGames.length > 0 && inputFocus && (
              <S.DropDownSearch>
                {dropDownGames.map(g => (
                  <Link href={`/store/games/${g.id}`} key={`dropDown-search-header-${g.id}`}>
                    <S.DropDownCards >
                      <S.DropDownCardImage src={g.horizontalCap.url} />
                      <S.DropDownContent>
                        <S.DropDownContentName>{g.name}</S.DropDownContentName>
                        <S.DropDownContentPrice>R${(g.price * (1 - (g.discount > 0 ? g.discount : 0))).toFixed(2)}</S.DropDownContentPrice>
                      </S.DropDownContent>
                    </S.DropDownCards>
                  </Link>
                ))}
              </S.DropDownSearch>
            )}
          </S.InputContainer>
          <Link ref={linkRef} style={{ display: "none" }} href={`/search/games?term=${searchValue}`} ></Link>
          <SearchIcon onClick={activeSearch} />
        </S.SearchSpan>
      </S.MobileIcons>
    </S.NavComponent>
  )
}

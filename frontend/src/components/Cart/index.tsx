"use client"

import authHook from "@/data/hooks/authHook";
import { GamesStore } from "@/models/frontModels";
import { useEffect, useState } from "react";
import * as S from "./style"
import { Line } from "@/styles/global";
import ApiRequest from "@/utils/ApiRequests";
import { useRouter } from "next/navigation";
import Link from "next/link";
import messageAuth from "@/data/hooks/messageHook";


interface CartProps {
  cart: GamesStore[]
}

export default function Cart({ cart: cartProps }: CartProps) {
  const router = useRouter()

  const { setUser } = authHook()
  const { showMessageBox } = messageAuth()

  const [cart, setCart] = useState(cartProps)
  const [price, setPrice] = useState(cart.length ? cart.map(g => g.price * (1 - g.discount ?? 0)).reduce((p, c) => p + c) : 0)

  useEffect(() => {
    setPrice(cart.length ? cart.map(g => g.price * (1 - g.discount ?? 0)).reduce((p, c) => p + c) : 0)
  }, [cart])

  const buyCart = async () => {
    const response = await ApiRequest<GamesStore[]>(`/api/users/account/transactions`, "post")
    if (response) {
      if(response.type === "success") {
        setUser(prevUser => ({ ...prevUser!, cart: [], games: response.response as GamesStore[] }))
        router.push("/home")
      } else {  
        showMessageBox(response.response as string, "error")
      }
    }
  }

  const removeItem = async (gameId: number) => {
    const response = await ApiRequest<string>(`/api/users/account/cart/${gameId}`, "delete")
    if (response) {
      if(response.type === "success") {
        setCart(prevCart => prevCart.filter(c => c.id !== gameId))
        setUser(prevUser => ({
          ...prevUser!, cart: cart.filter(c => c.id !== gameId)
            .map(c => ({ id: c.id }))
        }))
      } else {
        showMessageBox(response.response as string, "error")
      }
    }
  }

  return (
    <S.Container>
      <S.Title> <h2>Meu Carrinho</h2> </S.Title>
      <S.ContentContainer>
        {cart.length > 0 ? (
          <>
            <S.CartContainer>
              {cart.map(c => (
                <S.Card key={`${c.name}-${c.id}`} >
                  <S.CardImage>
                    <img src={c.verticalCap ? c.verticalCap.url : "/player.jpg"} alt="" />
                  </S.CardImage>
                  <S.CardContent>
                    <S.CardHeader>
                      <Link replace href={`/store/games/${c.id}`}>{c.name}</Link>
                      <span>R$ {c.price}</span>
                    </S.CardHeader>
                    <S.Actions>
                      <button>Mover Para a Lista de Desejos</button>
                      <button onClick={() => removeItem(c.id)} >Remover do Carrinho</button>
                    </S.Actions>
                  </S.CardContent>
                </S.Card>
              ))}
            </S.CartContainer>
            <S.Aside>
              <S.AsideTitle>
                Resumo Do Carrinho:
              </S.AsideTitle>
              <S.AsideContentContainer>
                <S.AsideContent>
                  <span>Total</span>
                  <span>R$ {price.toFixed(2)}</span>
                </S.AsideContent>
              </S.AsideContentContainer>
              <Line />
              <S.BuyButton onClick={buyCart}>Comprar</S.BuyButton>
            </S.Aside>
          </>
        ) : (
          <S.EmptyCartContainer>
            <S.EmptyCart>
              <h4>Seu carrinho está vazio</h4>
              <Link replace  href={'/home'}>Enchá-o</Link>
            </S.EmptyCart>
          </S.EmptyCartContainer>
        )}
      </S.ContentContainer>
    </S.Container>
  )

}
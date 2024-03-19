import * as S from "./style"

interface ItemDiscount {
  price: number
  discount: number
}

const Discount = ({ price, discount }: ItemDiscount) => {

  return (
    <S.GameWithDiscount>
      {discount > 0 ? <S.Discount>-{(discount * 100).toFixed(0)}%</S.Discount> : <span></span>}
      <S.PriceContainer>
        {discount > 0 ? (
          <>
            <S.OriginalPrice>R${price.toFixed(2)}</S.OriginalPrice>
            <S.Price>R${(price - (price * discount)).toFixed(2)}</S.Price>
          </>
        ) : (
          <S.Price>R${(price - (price * discount)).toFixed(2)}</S.Price>
        )}
      </S.PriceContainer>
    </S.GameWithDiscount>
  )
}

export default Discount

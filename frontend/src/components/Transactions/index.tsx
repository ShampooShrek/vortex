"use client"

import { Transaction } from "@/models/dbModels";

import * as S from "./style"
import DateFormater from "@/utils/dateFormater";

interface TransactionsProps {
  transactions: Transaction[]
}

export default function Transactions({ transactions }: TransactionsProps) {

  return (
    <S.Container>
      <S.Title><h2>TRANSAÇÕES</h2></S.Title>
      <S.Table>
        <thead>
          <tr>
            <S.Th>Data</S.Th>
            <S.Th>Items</S.Th>
            <S.Th>Total</S.Th>
          </tr>
        </thead>
        <tbody>
          {transactions.sort((a, b) => new Date(b.buyDate).getTime() - new Date(a.buyDate).getTime())
            .map(g => (
              <S.Tr key={g.id}>
                <S.Td>{DateFormater(g.buyDate)}</S.Td>
                <S.Td>
                  <S.SpanName><img src={g.gameIconImage ? g.gameIconImage.url : "/group_banner.jpg"} alt="" /><span>{g.name}</span></S.SpanName>
                </S.Td>
                <S.Td>R${g.totalPrice}</S.Td>
              </S.Tr>
            ))}
        </tbody>
      </S.Table>
    </S.Container>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

import * as S from "./style"
import { Avaliations } from "@/models/dbModels"
import DateFormater from "@/utils/dateFormater"
import bbcode from "@/utils/bbcode"
import { DeslikeIconSolid, LikeIcon, LikeIconSolid } from "@/components/Icons"

const BetterAvaliations = ({ avaliation: avaliationProps }: { avaliation: Avaliations }) => {
  const { avaliation, comment, createdAt, title, user, userDateGameTime, id } = avaliationProps

  const [seeMore, setSeeMore] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.offsetHeight < 100 && !seeMore) {
        setSeeMore(true)
      }
    }
  }, [contentRef, contentRef.current?.offsetHeight])

  return (
    <S.Container key={user.id}>
      <S.UserContainer>
        <S.User>
          <S.UserImage src={user.image.url} />
          <S.UserName href={`/profile/${user.id}`} >{user.nickname}</S.UserName>
        </S.User>
      </S.UserContainer>
      <S.AvaliationContainer>
        <S.Avaliation avaliation={avaliation === "LIKE" ? "LIKE" : "DISLIKE"} href={`/profile/${user.id}/details/avaliations/${id}`}>
          {avaliation === "LIKE" ? <LikeIconSolid /> : <DeslikeIconSolid />}
          <S.AvaliationTitle>
            <h3>{title}</h3>
            <span>Jogou por {userDateGameTime.toString()}</span>
          </S.AvaliationTitle>
        </S.Avaliation>
        <S.AvaliationContentContainer>
          <S.AvaliationDate>PUBLICADO EM {DateFormater(createdAt).toUpperCase()}</S.AvaliationDate>
          <S.AvaliationContent ref={contentRef} className="aaaa" seeMore={seeMore}>
            {contentRef.current && bbcode.toReact(comment!)}
            {contentRef.current && !seeMore && <S.AvaliationGradient className="ccc" />}
          </S.AvaliationContent>
          {contentRef.current && !seeMore && <S.SeeMore className="bbb" onClick={() => setSeeMore(true)}><span>Ler Mais</span></S.SeeMore>}
        </S.AvaliationContentContainer>
        {/* <S.Bar />
        <S.ControlContainer>
          <h4>O que você achou da análise?</h4>
          <S.ButtonsContainer>
            <S.Buttons title="uga" >Gostei :D</S.Buttons>
            <S.Buttons title="uga" >Não Gostei :C</S.Buttons>
          </S.ButtonsContainer>
          <S.VoteInfo>
            <span>30 pessoas gostaram desta analise</span>
            <span>15 pessoas não desta analise</span>
          </S.VoteInfo>
        </S.ControlContainer> */}
      </S.AvaliationContainer>
    </S.Container>
  )
}

export default BetterAvaliations

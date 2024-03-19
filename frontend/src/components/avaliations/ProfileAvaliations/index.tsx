"use client"

import { useEffect, useRef, useState } from "react"

import * as S from "./style"
import { Avaliations } from "@/models/dbModels"
import { useRouter } from "next/navigation"
import { DeslikeIconSolid, LikeIconSolid } from "@/components/Icons"
import DateFormater from "@/utils/dateFormater"
import bbcode from "@/utils/bbcode"

const ProfileAvaliations = ({ avaliation: PropsAvaliation }: { avaliation: Avaliations }) => {
  const { avaliation, comment, createdAt, title, userDateGameTime, game, userId, id } = PropsAvaliation
  const [seeMore, setSeeMore] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.offsetHeight < 100 && !seeMore) {
        setSeeMore(true)
      }
    }
  }, [contentRef, contentRef.current?.offsetHeight])

  return (
    <S.Container>
      <S.GameContainer>
        <S.Game>
          <S.GameImage src={game.horizontalCap ? game.horizontalCap.url : "/player.jpg"} />
          <S.GameName>{game.name}</S.GameName>
        </S.Game>
      </S.GameContainer>
      <S.AvaliationContainer>
        <S.Avaliation avaliation={avaliation === "LIKE" ? "LIKE" : "DISLIKE"} href={`/profile/${userId}/details/avaliations/${id}`}>
          {avaliation === "LIKE" ? <LikeIconSolid /> : <DeslikeIconSolid />}
          <S.AvaliationTitle>
            <h3>{title}</h3>
            <span>Jogou por {userDateGameTime.toString()}</span>
          </S.AvaliationTitle>
        </S.Avaliation>
        <S.AvaliationContentContainer>
          <S.AvaliationDate>PUBLICADO EM {DateFormater(createdAt).toUpperCase()}</S.AvaliationDate>
          <S.AvaliationContent ref={contentRef} className="aaaa" seeMore={seeMore}>
            {bbcode.toReact(comment!)}
            {contentRef.current && !seeMore && <S.AvaliationGradient className="ccc" />}
          </S.AvaliationContent>
          {contentRef.current && !seeMore && <S.SeeMore className="bbb" onClick={() => setSeeMore(true)}><span>Ler Mais</span></S.SeeMore>}
        </S.AvaliationContentContainer>
      </S.AvaliationContainer>
    </S.Container>
  )
}

export default ProfileAvaliations

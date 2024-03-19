import { Avaliations } from "@/models/dbModels";
import * as S from "./style"
import ProfileAvaliations from "@/components/avaliations/ProfileAvaliations";

interface DetailsAvaliationsProps {
  avaliations: Avaliations[]
  gamesLength: number
}

const DetailsAvaliations = ({ avaliations, gamesLength }: DetailsAvaliationsProps) => {

  return (
    <S.Container>
      <S.ContentContainer>
        {avaliations.map((av, i) => (
          <ProfileAvaliations avaliation={av} key={`avaliations-${i}`} />
        ))}
      </S.ContentContainer>
      <S.AsideAvaliations>
        <S.AsideAvaliationsContent>
          <h1>{avaliations.length}</h1>
          <span>Produtos analisados</span>
        </S.AsideAvaliationsContent>
        <S.AsideAvaliationsContent>
          <h1>{gamesLength}</h1>
          <span>Produtos na conta</span>
        </S.AsideAvaliationsContent>
      </S.AsideAvaliations>
    </S.Container>
  )
}

export default DetailsAvaliations

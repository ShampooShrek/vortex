import { GameRequesites } from "@/models/dbModels"
import * as S from "./style"

interface RequerementsProps {
  requerements: GameRequesites
}

const StoreRequerements = ({requerements}: RequerementsProps) => {

  const RenderRecomendeds = () => {
    const { recomendedMemory, recomendedProcessador, recomendedSO, recomendedVideo } = requerements
  
    if(recomendedMemory || recomendedProcessador || recomendedSO || recomendedVideo) {
      return (
        <S.Requerements>
          <small>RECOMENDADO:</small>
          {recomendedSO && (
            <S.RequerementsContent>
            SO: {recomendedSO}
            </S.RequerementsContent>
          )}
          {recomendedProcessador && (
            <S.RequerementsContent>
            Processador: {recomendedProcessador}
            </S.RequerementsContent>
          )}
          {recomendedMemory && (
            <S.RequerementsContent>
            Memória: {recomendedMemory} de ram
            </S.RequerementsContent>
          )}
          {recomendedVideo && (
            <S.RequerementsContent>
            Placa de Vídeo: {recomendedVideo}
            </S.RequerementsContent>
          )}
        </S.Requerements>
      )
    }
  }

  return (
    <S.RequerementsContainer>
    <S.Requerements>
      <small>MÍNIMO:</small>
      <S.RequerementsContent>
      SO: {requerements.minSO}
      </S.RequerementsContent>
      <S.RequerementsContent>
      Processador: {requerements.minProcessador}
      </S.RequerementsContent>
      <S.RequerementsContent>
      Memória: {requerements.minMemory} de ram
      </S.RequerementsContent>
      <S.RequerementsContent>
      Placa de Vídeo: {requerements.minVideo}
      </S.RequerementsContent>
      <S.RequerementsContent>
      Armazenamento: {requerements.minArmazenamento} de espaço disponível
      </S.RequerementsContent>
    </S.Requerements>
    <RenderRecomendeds />
  </S.RequerementsContainer>
  )
}

export default StoreRequerements
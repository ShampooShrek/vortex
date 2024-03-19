import { GameRequesites } from "@/models/dbModels"
import * as S from "./style"
import FormInput from "@/components/Inputs/FormInput"
import { ChangeEvent, useEffect, useState } from "react"

interface PublisherEditRequesitesProps {
  requesites: GameRequesites | null
  handleRequesites(requesites: GameRequesites): void
} 

const PublisherEditRequesites = ({ requesites: requesitesProps, handleRequesites }: PublisherEditRequesitesProps) => {

  const [requesites, setRequesites] = useState<GameRequesites>(requesitesProps ?? {} as GameRequesites)

  useEffect(() => {
    handleRequesites(requesites)
  }, [requesites])

  const handleRequesitesInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name
    const value = ev.target.value
    setRequesites(prevRequesites => ({ ...prevRequesites, [name]: value }))
  }

  return (
    <S.Container>

      <S.RequesitesContainer>
        <S.HeaderRequesitesContainer>mínimos:</S.HeaderRequesitesContainer>
        <S.RequesitesContent>
          <FormInput 
            type="text" 
            name="minSO"
            value={requesites?.minSO ?? ""}
            label="Sistema Operacionl:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="minProcessador"
            value={requesites?.minProcessador ?? ""}
            label="Processador:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="minVideo"
            value={requesites?.minVideo ?? ""}
            label="Placa de Vídeo:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="minMemory"
            value={requesites?.minMemory ?? ""}
            label="Memória:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="minArmazenamento"
            value={requesites?.minArmazenamento ?? ""}
            label="Armazenamento:"
            onChange={handleRequesitesInput}
          />
        </S.RequesitesContent>
      </S.RequesitesContainer>

      <S.RequesitesContainer>
        <S.HeaderRequesitesContainer>recomendados:</S.HeaderRequesitesContainer>
        <S.RequesitesContent>
          <FormInput 
            type="text" 
            name="recomendedSO"
            value={requesites?.recomendedSO ?? ""}
            label="Sistema Operacionl:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="recomendedProcessador"
            value={requesites?.recomendedProcessador ?? ""}
            label="Processador:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="recomendedVideo"
            value={requesites?.recomendedVideo ?? ""}
            label="Placa de Vídeo:"
            onChange={handleRequesitesInput}
          />
          <FormInput 
            type="text" 
            name="recomendedMemory"
            value={requesites?.recomendedMemory ?? ""}
            label="Memória:"
            onChange={handleRequesitesInput}
          />
        </S.RequesitesContent>
      </S.RequesitesContainer>
      
    </S.Container>
  )
}

export default PublisherEditRequesites

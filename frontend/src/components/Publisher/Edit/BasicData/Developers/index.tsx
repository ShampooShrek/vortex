"use client"

import { User } from "@/models/dbModels"
import { useState, useEffect } from "react"
import { PublisherEditSectionTemplate } from "../../PublisherEditTemplate"
import FormInput from "@/components/Inputs/FormInput"

import * as S from "./style"
import { MatrizOfArray } from "@/utils/ArrayToMatriz"
import { Response } from "@/models/frontModels"
import api from "@/services/api"
import { Trash, XIcon } from "@/components/Icons"
import authHook from "@/data/hooks/authHook"

interface DevelopersProps {
  developers: User[]
  updateDevelopers(devs: User[]): void
}

const PublisherEditBasicDataDevelopers = ({ developers: propDevelopers, updateDevelopers }: DevelopersProps) => {

  const { user } = authHook()

  const [developers, setDevelopers] = useState<User[]>(propDevelopers)
  const [developersSearch, setDevelopersSearch] = useState("")
  const [developersDropDown, setDevelopersDropDown] = useState<User[]>([])
  const [developersInputFocus, setDevelopersInputFocus] = useState(false)

  let blurTimer: NodeJS.Timeout | null = null

  useEffect(() => {
    if (developersSearch !== "") {
      const timeOut = setTimeout(async () => {
        const response = await api.get(`/api/users/search/${developersSearch}`)
        const data: Response<User[]> = response.data

        if (data.type === "success") {
          setDevelopersDropDown(data.response as User[])
        }
      }, 500)

      return () => clearTimeout(timeOut)
    } else {
      setDevelopersDropDown([])
    }

  }, [developersSearch])

  useEffect(() => {
    updateDevelopers(developers)
  }, [developers])

  const handleInputBlur = () => {
    blurTimer = setTimeout(() => {
      setDevelopersInputFocus(false)
      blurTimer = null
    }, 100)
  }


const addDeveloper = (dev: User) => {
  const haveDev = developers.find(d => d.id === dev.id)
  if (!haveDev) {
    const newDevelopers = [...developers]
    newDevelopers.push(dev)
    setDevelopers(newDevelopers)
  }
}

const removeDeveloper = (id: string) => {
  setDevelopers(devs => devs.filter(dev => dev.id !== id))
}

return (
  <PublisherEditSectionTemplate title="Desenvolvedores:">
    <S.DevelopersInputContainer>
      <FormInput
        inputStyle={{ marginBottom: "5px" }}
        type="text"
        value={developersSearch}
        label="Pesquise por Nickname:"
        onFocus={() => setDevelopersInputFocus(true)}
        onBlur={handleInputBlur}
        marginBottom={false}
        onChange={ev => setDevelopersSearch(ev.target.value)}
      />
      {developersDropDown.length > 0 && developersInputFocus && (
        <S.DevelopersContainerDropDown>
          {developersDropDown.map(u => (
            <S.DevelopersCardDropDown key={`drop-down-${u.id}`} onClick={(e) => {e.stopPropagation(); addDeveloper(u)}} >
              <div style={{ display: "flex" }}>
                <S.DevelopersImg src={u.image ? u.image.url : "/player.jpg"} />
                <S.DeveloperContentDropDown> {u.nickname} </S.DeveloperContentDropDown>
              </div>
            </S.DevelopersCardDropDown>
          ))}
        </S.DevelopersContainerDropDown>
      )}
    </S.DevelopersInputContainer>
    <S.DevelopersContainer>
      {developers.length > 0 && MatrizOfArray(developers, 5).map(matriz => {
        if (matriz.length > 0) {
          return (
            <S.DevelopersLine key={matriz[0].id}>
              {matriz.map(u => {
                const { id, image, nickname } = u
                return (
                  <S.DevelopersCard key={id}>
                    {user!.id !== u.id && <XIcon onClick={() => removeDeveloper(id)} />}
                    <S.DevelopersImg src={image ? image.url : "/player.jpg"} />
                    <S.UserContent>
                      <h3>{nickname}</h3>
                    </S.UserContent>
                  </S.DevelopersCard>
                )
              })}
            </S.DevelopersLine>
          )
        }
      })}
    </S.DevelopersContainer>
  </PublisherEditSectionTemplate>
)
}

export default PublisherEditBasicDataDevelopers
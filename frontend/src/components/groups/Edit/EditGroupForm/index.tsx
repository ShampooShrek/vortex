"use client"

import { GamesStore, GroupCreate, GroupEdit, Groups, Response, UserAuth } from "@/models/frontModels"
import * as S from "./style"
import { ChangeEvent, useEffect, useState } from "react"
import ButtonsContainer from "@/components/ButtonsContainer"
import api from "@/services/api"
import { Games, Group } from "@/models/dbModels"
import { redirect, useRouter } from "next/navigation"
import authHook from "@/data/hooks/authHook"
import { XIcon } from "@/components/Icons"
import FormInput from "@/components/Inputs/FormInput"
import TextArea from "@/components/TextArea"
import Select from "@/components/Select"
import messageAuth from "@/data/hooks/messageHook"


const EditGroupForm = ({ groupLink, group }: { groupLink: string, group: Groups }) => {
  const { user, setUser, loading } = authHook()
  const { showMessageBox } = messageAuth()

  // if (loading) return <h1></h1>
  if (!loading && !user) redirect("/home")

  const [inRequest, setInRequest] = useState(false)
  const [groupSelected, setGroupSelected] = useState<Groups | null>(null)
  const [form, setForm] = useState<GroupEdit>({} as GroupEdit)
  const [bannerImage, setBannerImage] = useState<File | null>(null)
  const [gameSearch, setGameSearch] = useState("")
  const [gamesResponse, setGamesResponse] = useState<GamesStore[]>([])
  const [gamesSelecteds, setGamesSelecteds] = useState<GamesStore[]>([])

  useEffect(() => {
    if (user?.adminGroups) {
      const findGroup = user?.adminGroups?.find(g => g.id === group.id)
      if (findGroup) {
        setGroupSelected(findGroup)
        setForm({ ...findGroup })
        setGamesSelecteds(findGroup.gameRelation)
      }
    }
  }, [user, group.id]);


  useEffect(() => {
    if (gameSearch !== "") {
      const timeOut = setTimeout(async () => {
        const response = await api.get(`/api/games/search/${gameSearch}`)
        const data: Response<GamesStore[]> = response.data

        if (data.type === "success") {
          setGamesResponse(data.response as GamesStore[])
        } else {
          alert("error")
        }
      }, 300)

      return () => clearTimeout(timeOut)
    } else {
      setGamesResponse([])
    }
  }, [gameSearch])

  const handleInput = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = ev.target.name
    const value = ev.target.value;
    setForm((prevForm) => ({ ...prevForm!, [name]: value }));
  }

  const handleGetGame = (g: GamesStore) => {
    setGamesSelecteds(prevGames => {
      return prevGames.find(gs => gs.id === g.id) ? prevGames : [...prevGames, g]
    })
    setGameSearch("")
  }

  const removeAssociatedGame = (id: number) => {
    setGamesSelecteds(prevGames => prevGames.filter(g => g.id !== id))
  }

  const saveChanges = async () => {
    setInRequest(true)
    const formData = {
      ...form,
      gameRelations: gamesSelecteds.map(g => g.id)
    }

    const response = await api.put(`/api/groups/update/${groupSelected?.id}`, formData)
    const data: Response<Groups> = response.data

    if (data.type === "success") {
      setUser(prevUser => {
        if (prevUser) {
          const groupSelectedIndex = prevUser.adminGroups!.findIndex(g => g.id === group.id)
          const updatedGroups = [...prevUser.adminGroups!]
          const aaa: Groups = { ...updatedGroups[groupSelectedIndex], ...data.response as Groups }
          updatedGroups[groupSelectedIndex] = aaa
          const updatedUser: UserAuth = { ...prevUser, adminGroups: updatedGroups }
          return updatedUser
        } else {
          return prevUser
        }
      })

      if (bannerImage) {
        const formData = new FormData()
        formData.append("file", bannerImage)
        const bannerResponse = await api.put(`/api/groups/update/${groupSelected?.id}/images/banner`, formData)
        const bannerData = bannerResponse.data
      }
      showMessageBox("Grupo atualizado com sucesso", "success")
    } else {
      showMessageBox(data.response as string, "error")
    }
    setInRequest(false)
  }

  if (!groupSelected || !groupSelected.name || !form.name) return <></>

  return (
    <S.Container>
      <FormInput label="Nome:" onChange={handleInput} value={form.name ?? ""} name="name" type="text" />
      <FormInput label="Cabeçalho:" onChange={handleInput} value={form.header ?? ""} name="header" type="text" />
      <TextArea label="Descrição" onChange={handleInput} value={form.description ?? ""} name="description" />
      <FormInput label="Link do Grupo:" onChange={handleInput} value={form.groupLink ?? ""} name="groupLink" type="text" />
      <div style={{ position: "relative" }}>
        {gamesSelecteds && gamesSelecteds.length > 0 && (
          <S.SelectedGamesContainer>
            {gamesSelecteds.map(g => (
              <S.SelectedGamesCard key={`selected-cards-${g.id}`}>
                <img src={g.gameIconImage ? g.gameIconImage.url : "/player.jpg"} alt="" />
                <span>{g.name}</span>
                <XIcon onClick={() => removeAssociatedGame(g.id)} />
              </S.SelectedGamesCard>
            ))}
          </S.SelectedGamesContainer>
        )}
        <FormInput marginBottom={false} label="Jogos Associados:" onChange={(ev) => setGameSearch(ev.target.value)} value={gameSearch} type="text" />
        {gamesResponse.length > 0 && (
          <S.GamesDropDown>
            {gamesResponse.map(g => (
              <div onClick={() => handleGetGame(g)} key={`drop-down-${g.id}`}>
                <img src={g.gameIconImage ? g.gameIconImage.url : "/player.jpg"} alt="" />
                <span>{g.name}</span>
              </div>
            ))}
          </S.GamesDropDown>
        )}
      </div>
      <Select
        name="type"
        value={form.type ?? "PUBLIC"}
        onChange={handleInput}
        options={[{ text: "PUBLICO", value: "PUBLIC" }, { text: "PRIVADO", value: "PRIVATE" }]}
      />
      <ButtonsContainer
        cancelClick={() => setForm(groupSelected)}
        saveClick={inRequest ? () => { } : saveChanges}
        isLoading={inRequest}
        cancelButton={true}
        cancelButtonText="Cancelar Alterações"
        saveButtonText="Salvar Alterações"
      />
    </S.Container>
  )
}

export default EditGroupForm

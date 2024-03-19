"use client"

import { GroupCreate, Response } from "@/models/frontModels"
import * as S from "./style"
import { ChangeEvent, useEffect, useState } from "react"
import ButtonsContainer from "@/components/ButtonsContainer"
import api from "@/services/api"
import { Group } from "@/models/dbModels"
import { useRouter } from "next/navigation"
import FormInput from "@/components/Inputs/FormInput"


const CreateGroupForm = () => {
  const [form, setForm] = useState<GroupCreate>({
    groupLink: "", name: "", type: "RESTRICT"
  })

  const router = useRouter()

  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name
    const value = ev.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const createGroup = async () => {
    const response = await api.post("/api/groups/create", form)
    const data: Response<Group> = response.data

    if (data.response) {
      const group = data.response as Group
      router.push(`/groups/${group.groupLink}`)
    } else {
      alert(data.response)
    }
  }
  return (
    <S.Container>
      <FormInput
        label="Nome do grupo:"
        onChange={handleInput}
        value={form.name ?? ""}
        name="name"
        type="text"
      />
      <FormInput
        label="Link do Grupo:"
        onChange={handleInput}
        value={form.groupLink ?? ""}
        name="groupLink"
        type="text"
      />

      <S.Options onChange={handleSelect} name="type" value={form.type} >
        <option value="RESTRICT">RESTRITO</option>
        <option value="PUBLIC">PUBLICO</option>
        <option value="PRIVATE">PRIVADO</option>
      </S.Options>
      <ButtonsContainer
        cancelClick={() => alert("a")}
        saveClick={createGroup}
        cancelButton={false}
        saveButtonText="Criar Grupo"
      />
    </S.Container>
  )
}

export default CreateGroupForm

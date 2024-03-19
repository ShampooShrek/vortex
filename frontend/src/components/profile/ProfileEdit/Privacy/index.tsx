"use client"

import authHook from "@/data/hooks/authHook"
import SectionTemplate from "../../ProfileDetailsSocialsLayout/SectionTemplate"
import { useState, ChangeEvent } from "react"
import { PrivacySetting, User } from "@/models/dbModels"

import * as S from "./style"
import Select from "@/components/Select"
import { Bar } from "@/styles/global"
import ButtonsContainer from "@/components/ButtonsContainer"
import messageAuth from "@/data/hooks/messageHook"
import ApiRequest from "@/utils/ApiRequests"


interface EditPrivacyProps {
  privacity: PrivacySetting
}

const EditPrivacy = ({ privacity }: EditPrivacyProps) => {

  const { user, setUser } = authHook()
  const { showMessageBox } = messageAuth()

  const [privacitySettings, setPrivacitySettings] = useState<PrivacySetting>({
    friendList: privacity.friendList,
    gamesPrivacy: privacity.gamesPrivacy,
    groupList: privacity.groupList
  })
  const [inRequest, setInRequest] = useState(false)

  const cancelClick = () => {
    setPrivacitySettings(privacity)
  }

  const saveClick = async () => {
    setInRequest(true)
    const response = await ApiRequest(`/api/users/${user!.id}/update_privacy`, "put", privacitySettings)
    if(response) {
      if(response.type === "success") {
        setUser(prevUser => ({ ...prevUser!, privacity: privacitySettings }))
        showMessageBox("Usuário atualizado com sucesso!!", "success")
      } else {
        showMessageBox(response.response as string, "error")
      }
    }
    
    setInRequest(false)
  }

  const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    const name = ev.target.name
    const value = ev.target.value;
    setPrivacitySettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  }


  return (
    <SectionTemplate section="Configurações de Privacidade" >
      <S.PrivacityContainer>
        <S.PrivacityHeader>
          <h3>Lista de Amigos: </h3>
          <Select 
            marginTop={false}
            name="friendList"
            onChange={handleSelect}
            value={privacitySettings.friendList}
            options={[
              { text: "Publico", value: "PUBLIC" },
              { text: "Só Amigos", value: "FRIENDS" },
              { text: "Privado", value: "PRIVATE" },
            ]}
          />
        </S.PrivacityHeader>
        <S.PrivacityContent>
          <span>
            Controla quem pode ver a sua lista de amigos no seu perfil.
          </span>
        </S.PrivacityContent>
      </S.PrivacityContainer>
      <Bar height="1px" margin="30px 0" width="100%" />
      <S.PrivacityContainer>
        <S.PrivacityHeader>
          <h3>Grupos: </h3>
          <Select 
            marginTop={false}
            name="groupList"
            onChange={handleSelect}
            value={privacitySettings.groupList}
            options={[
              { text: "Publico", value: "PUBLIC" },
              { text: "Só Amigos", value: "FRIENDS" },
              { text: "Privado", value: "PRIVATE" },
            ]}
          />
        </S.PrivacityHeader>
        <S.PrivacityContent>
          <span>
            Controla quem poderá ver os grupos em que você participa.
          </span>
        </S.PrivacityContent>
      </S.PrivacityContainer>
      <Bar height="1px" margin="30px 0" width="100%" />
      <S.PrivacityContainer>
        <S.PrivacityHeader>
          <h3>Jogos: </h3>
          <Select 
            marginTop={false}
            name="gamesPrivacy"
            onChange={handleSelect}
            value={privacitySettings.gamesPrivacy}
            options={[
              { text: "Publico", value: "PUBLIC" },
              { text: "Só Amigos", value: "FRIENDS" },
              { text: "Privado", value: "PRIVATE" },
            ]}
          />
        </S.PrivacityHeader>
        <S.PrivacityContent>
          <span>
            Controla quem poderá ver os seus jogos, seus favoritos, sua lista de desejo, 
            e suas conquistas.
          </span>
        </S.PrivacityContent>
      </S.PrivacityContainer>
      <ButtonsContainer 
        saveClick={inRequest ? () => {} : saveClick}
        cancelClick={cancelClick}
        isLoading={inRequest}
      />
    </SectionTemplate>
  )
}

export default EditPrivacy
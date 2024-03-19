"use client"

import { GameFile } from "@/models/dbModels"
import { EntriesHierarchy, Hierarchy, Response } from "@/models/frontModels"
import ApiRequest from "@/utils/ApiRequests"
import { useState, useEffect } from "react"
import * as S from "./style"
import { Folder, FolderOpen } from "@/components/Icons"
import ButtonsContainer from "@/components/ButtonsContainer"
import { useParams } from "next/navigation"
import PublisherEditTextBox from "../TextBox"
import messageAuth from "@/data/hooks/messageHook"

interface ResponseHierarchy {
  hierarchy: Hierarchy[]
  paternItems: EntriesHierarchy[]
}

interface PublisherEditFileProps {
  file: GameFile | null
  handleUpdateGame(data: any): void
}

interface ThreeProps {
  hierarchyProps: Hierarchy
  selectFile(file: EntriesHierarchy): void
}

const Three: React.FC<ThreeProps> = ({ hierarchyProps, selectFile }) => {
  const { entry, hierarchy, items } = hierarchyProps;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <S.Span onClick={(e) => { e.stopPropagation(); handleToggleOpen(); }}>
        {isOpen ? <FolderOpen /> : <Folder />} {entry}
      </S.Span>
      {hierarchy.length > 0 && (
        <S.Ul isOpen={isOpen}>
          {hierarchy.map((h, index) => (
            <Three selectFile={selectFile} key={`${h.entry}-${index}`} hierarchyProps={h} />
          ))}
        </S.Ul>
      )}
      {items.length > 0 && (
        <S.Ul isOpen={isOpen}>
          {items.map((i, index) => {
            if (i.name !== "") {
              return <S.Li onClick={() => selectFile(i)} key={`i.name-${index}`}><span>{i.name}</span> <span>{i.size}kb</span></S.Li>
            }
          })}
        </S.Ul>
      )}
    </>
  );
};

const RenderFileName = (name: string) => {
  if (name && name.length > 0) {
    const nameSplit = name.includes("/") ? name.split("/") : name
    return nameSplit[nameSplit.length - 1].length === 1 ? nameSplit as string : nameSplit[nameSplit.length - 1]
  } else return null
}

const PublisherEditFile = ({ file: FileProps, handleUpdateGame }: PublisherEditFileProps) => {

  const { gameId } = useParams()
  const { showMessageBox } = messageAuth()

  const [inRequest, setInRequest] = useState(false)
  const [fileName, setFileName] = useState<string | null>(FileProps ? RenderFileName(FileProps.execFile) : null)
  const [fileEntry, setFileEntry] = useState<string | null>(FileProps ? FileProps.name : null)
  const [file, setFile] = useState<File | null>(null)

  const [fileFiles, setFileFiles] = useState<ResponseHierarchy>({
    hierarchy: [], paternItems: []
  })

  useEffect(() => {
    if (FileProps !== null) {
      const GetFile = async () => {
        const response = await fetch(FileProps.url)
        if (response.status === 200) {
          const data = await response.arrayBuffer()
          const contentType = response.headers.get('content-type');
          const filename = FileProps.url.substring(FileProps.url.lastIndexOf('/') + 1);
          const fileBlob = new Blob([data], { type: contentType! });
          const file = new File([fileBlob], filename, { type: contentType! })
          await GetFileEntries(file)
        }
      }
      GetFile()
    }
  }, [])

  const GetFileEntries = async (file: File) => {
    const form = new FormData()
    form.append("file", file)
    const data = await ApiRequest<ResponseHierarchy>("/api/games/file/get_file_entries", "post", form)
    if (data) {
      if (data.type === "success") {
        setFileFiles(data.response as ResponseHierarchy)
      } else {
        showMessageBox(data.response as string, "error")
      }
    }
  }

  const handleInputChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      await GetFileEntries(file)
      setFile(file)
    }
  }

  const selectFile = (file: EntriesHierarchy) => {
    setFileEntry(file.entry)
    setFileName(RenderFileName(file.entry))
  }
  const saveFile = async () => {
    setInRequest(true)
    if (file && fileEntry) {
      const form = new FormData()
      form.append("file", file)
      form.append("execFile", fileEntry)
      const response = await ApiRequest<GameFile>(`/api/games/${gameId}/game_file`, "post", form)
      if (response) {
        if (response.type === "success") {
          handleUpdateGame({ file })
          showMessageBox("Arquivo atualizado com sucesso!", "success")
        } else {
          showMessageBox(response.response as string, "error")
        }
      }
    }
    setInRequest(false)
  }

  return (
    <S.Container>
      <PublisherEditTextBox
        sections={[
          { title: "Arquivo", content: "Envie um arquivo zip e selecione o arquivo executavel do jogo..." }
        ]}
      />
      <S.InputCard>
        <input type="file" accept="application/x-zip-compressed" onChange={handleInputChange} name="" id="" />
      </S.InputCard>
      {fileName && <h3 style={{ marginBottom: "20px" }}>Arquivo Selecionado: {fileName}</h3>}
      <S.Items>
        <>
          {fileFiles.hierarchy.length > 0 && fileFiles.hierarchy.map(item => (
            <Three selectFile={selectFile} key={item.entry} hierarchyProps={item} />
          ))}
          {fileFiles.paternItems.length > 0 && fileFiles.paternItems.map(item => (
            <S.Span onClick={() => selectFile(item)} key={`${item.entry}-${item.name}`}>{item.name} - ${item.size}</S.Span>
          ))}
        </>
      </S.Items>
      <ButtonsContainer
        cancelClick={() => { }}
        cancelButton={false}
        saveClick={inRequest ? () => { } : saveFile}
        isLoading={inRequest}
      />
    </S.Container>
  )
}

export default PublisherEditFile

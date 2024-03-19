"use client"

import { useEffect, useState } from "react"
import PublisherEditTextBox from "../TextBox"
import * as S from "./style"
import { GameImageCap, GameImages, GameVideos } from "@/models/dbModels"
import { PublisherEditSectionTemplate } from "../PublisherEditTemplate"
import ButtonsContainer from "@/components/ButtonsContainer"
import { useParams } from "next/navigation"
import ApiRequest from "@/utils/ApiRequests"

//@ts-ignore
import VideoTumbnail from "react-video-thumbnail"
import { Trash, XIcon } from "@/components/Icons"
import messageAuth from "@/data/hooks/messageHook"

type Section = {
  title: string
  content: string
}

interface PublisherEditVisualResourcesProps {
  horizontalCap: null | GameImageCap
  verticalCap: null | GameImageCap
  gameBackgroundImage: null | GameImageCap
  gameIconImage: null | GameImageCap
  gamePopularImage: null | GameImageCap
  screenShootImages: null | GameImages[]
  videos: null | GameVideos[]
  handleUpdateGame(data: any): void
}

interface VisualResourcesTemplateProps {
  sections: Section[]
  tag: string
  file: GameImageCap | null
  handleUpdate(file: File, tag: string): void
  resolution: {
    width: number
    height: number
  }
  secondSection?: {
    width: number
    height: number
  }
}

interface GameImagesFile extends GameImages {
  file?: File
}

interface VisualResourcesScreenShootsVideosProps extends VisualResourcesTemplateProps {
  type: "video" | "image"
  files: GameImagesFile[] | null
  removeFile(id: number, type: "video" | "image"): void
  handleUpdateAll(files: GameImagesFile[], type: string): void
}


interface ImagesList {
  file: File
  tag: string
}

const VisualResourcesTemplate = ({ sections, tag, file, resolution, secondSection, handleUpdate }: VisualResourcesTemplateProps) => {

  const { showMessageBox } = messageAuth()

  const inputSelectImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)

      const img = new Image()
      img.src = fileUrl

      img.onload = () => {
        if (img.width === resolution.width && img.height === resolution.height) {
          handleUpdate(file, tag)
        } else if (secondSection) {
          if (img.width !== secondSection.width || img.height !== secondSection.height) {
            showMessageBox("resolução não confere", "error")
          } else {
            handleUpdate(file, tag)
          }
        } else {
          showMessageBox("resolução não confere", "error")
        }
      }
    }
  }

  return (
    <S.VisualResourcesTemplate>
      <PublisherEditTextBox sections={sections} />
      <S.InputButtonContainer>
        <S.VisualResorcesTemplateButtonContainer>
          <input type="file" onChange={inputSelectImage} />
        </S.VisualResorcesTemplateButtonContainer>
        {file && (
          <button onClick={() => window.open(file.url, '_blank')} >Ver Imagem</button>
        )}
      </S.InputButtonContainer>
    </S.VisualResourcesTemplate>
  )
}


const VisualResourcesScreenShootsVideosTemplate = ({ sections, tag, files, resolution, secondSection, handleUpdateAll, type, removeFile }: VisualResourcesScreenShootsVideosProps) => {

  const [arquives, setArquives] = useState<GameImagesFile[]>(files ?? [])
  const { showMessageBox } = messageAuth()


  useEffect(() => {
    const updatedArquives = arquives.map((arq, i) => (
      { ...arq, order: i + 1 }
    ));
    handleUpdateAll(updatedArquives, type);
  }, [arquives])

  const removeArquive = async (id: number) => {
    const url = type === "image" ? `/api/games/screen_shoot_images/${id}`
      : `/api/games/videos/${id}`

    const data = await ApiRequest(url, "delete")

    if (data && data.type === "success") {
      setArquives(prevArquives => prevArquives.filter(a => a.id !== id))
      removeFile(id, type)
    } else {
      showMessageBox(data!.response as string, "error")
    }
  }

  const inputSelectFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      if (type === "image") {
        const img = new Image()
        img.src = fileUrl

        img.onload = () => {
          if (img.width === resolution.width && img.height === resolution.height) {
            // handleUpdate(file, tag)
            setArquives(prevArquives => [...prevArquives, {
              name: file.name,
              originalName: file.name,
              url: fileUrl,
              id: arquives.length + 1,
              size: file.size,
              order: arquives.length + 1,
              file
            }])
          } else if (secondSection) {
            if (img.width !== secondSection.width || img.height !== secondSection.height) {
              showMessageBox("resolução não confere", "error")
            } else {
              // handleUpdate(file, tag)
              setArquives(prevArquives => [...prevArquives, {
                name: file.name,
                originalName: file.name,
                url: fileUrl,
                id: arquives.length + 1,
                size: file.size,
                order: arquives.length + 1,
                file
              }])
            }
          } else {
            showMessageBox("resolução não confere", "error")
          }
        }
      } else {
        setArquives(prevArquives => [...prevArquives, {
          name: file.name,
          originalName: file.name,
          url: fileUrl,
          id: arquives.length + 1,
          order: arquives.length + 1,
          file
        }])
      }
    }
  }

  return (
    <S.VisualResourcesTemplate>
      <PublisherEditTextBox sections={sections} />
      <S.InputButtonContainer>
        <S.VisualResorcesTemplateButtonContainer>
          <input type="file" accept={type === "image" ? "image/jpeg, image/png, image/jpg" : "video/*"} onChange={inputSelectFile} />
        </S.VisualResorcesTemplateButtonContainer>
      </S.InputButtonContainer>
      <S.ScreenShotImagensVideos
        delayOnTouchOnly
        animation={350}
        delay={10}
        list={arquives}

        //@ts-ignore
        setList={setArquives}
      >
        {arquives.length > 0 && arquives.map(file => {
          if (type === "image") {
            return (
              <S.ImagesContainer key={file.name}>
                <Trash onClick={() => removeArquive(file.id)} />
                <img src={file.url} alt="" />
                <S.ImageName>
                  <span>{file.originalName}</span>
                </S.ImageName>
              </S.ImagesContainer>
            )
          } else {
            return <RenderTumbnail key={file.name} file={file} removeArquive={removeArquive} />
          }
        })}
      </S.ScreenShotImagensVideos>
    </S.VisualResourcesTemplate>
  )
}

interface RenderTumbnailProps {
  file: GameImagesFile
  removeArquive(id: number): void
}

const RenderTumbnail = ({ file, removeArquive }: RenderTumbnailProps) => {

  const [isRendering, setIsRendering] = useState(false)

  useEffect(() => {
    setIsRendering(false)
    const timeout = setTimeout(() => { setIsRendering(true) }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [file])

  return (
    <S.ImagesContainer style={{ display: isRendering ? "flex" : "none" }}>
      <Trash onClick={() => removeArquive(file.id)} />
      <VideoTumbnail

        key={file.name}
        videoUrl={file.url}
      />
      <S.ImageName>
        <span>{file.originalName}</span>
      </S.ImageName>
    </S.ImagesContainer>
  )
}


const PublisherEditVisualResources = ({
  horizontalCap,
  screenShootImages,
  verticalCap,
  videos: PropVideos,
  gameBackgroundImage,
  gameIconImage,
  gamePopularImage,
  handleUpdateGame
}: PublisherEditVisualResourcesProps) => {

  const { gameId } = useParams()
  const { showMessageBox } = messageAuth()
  const [images, setImages] = useState<ImagesList[]>([])
  const [screenShoots, setScreenShoots] = useState<GameImagesFile[]>(screenShootImages ?? [])
  const [videos, setVideos] = useState<GameImagesFile[]>(PropVideos ?? [])
  const [inRequest, setInRequest] = useState(false)

  const handleSave = async () => {
    setInRequest(true)
    let error = false

    const newImages = screenShoots.filter(img => !screenShootImages?.some(ssi => ssi.id === img.id))
    const updatedImages = screenShoots.filter(img => screenShootImages?.some(ssi => ssi.id === img.id))
    const newVideos = videos.filter(video => !PropVideos?.find(propVideo => propVideo.id === video.id))
    const updatedVideos = videos.filter(video => PropVideos?.find(propVideo => propVideo.id === video.id))


    if (newImages.length > 0) {
      await Promise.all(newImages.map(async img => {
        const form = new FormData()
        form.append("file", img.file!)
        form.append("order", img.order.toString())

        const response = await ApiRequest<string>(`/api/games/${gameId}/screen_shoot_images`, "post", form)
        if (response && response.type === "error") {
          error = true
          showMessageBox(response.response as string, "error")
        }
      }))
    }

    if (updatedImages.length > 0) {
      await Promise.all(updatedImages.map(async img => {
        const response = await ApiRequest<string>(`/api/games/screen_shoot_images/${img.id}`, "put", { order: img.order })
        if (response && response.type === "error") {
          error = true
          showMessageBox(response.response as string, "error")
        }
      }))
    }

    if (newVideos.length > 0) {
      await Promise.all(newVideos.map(async video => {
        const form = new FormData()
        form.append("file", video.file!)
        form.append("order", video.order.toString())
        const response = await ApiRequest<string>(`/api/games/${gameId}/videos`, "post", form)
        if (response && response.type === "error") {
          error = true
          showMessageBox(response.response as string, "error")
        }
      }))
    }

    if (updatedVideos.length > 0) {
      await Promise.all(updatedVideos.map(async video => {
        const response = await ApiRequest<string>(`/api/games/videos/${video.id}`, "put", { order: video.order })
        if (response && response.type === "error") {
          error = true
          showMessageBox(response.response as string, "error")
        }
      }))
    }

    if (images.length > 0) {
      await Promise.all(images.map(async img => {
        const { file, tag } = img
        const form = new FormData()
        form.append("file", file)

        const resp = await ApiRequest(`/api/games/${gameId}/images/${tag}`, "post", form)
        if (resp && resp.type === "error") {
          showMessageBox(resp.response as string, "error")
        }
      }))
    }

    const data = {
      images: screenShootImages,
      videos
    }

    images.map(img => {
      let tag = img.tag
      if (tag === "gameImageHorizontalCap") {
        tag = "horizontalCap"
      }
      if (tag === "gameImageVerticalCap") {
        tag = "verticalCap"
      }
      //@ts-ignore
      data[tag] = img.file
    })

    handleUpdateGame(data)
    setInRequest(false)

    if (!error) {
      showMessageBox("Imagens atualizadas com sucesso!", "success")
    }
  }

  const handleUpdate = (file: File, tag: string) => {
    const newImage: ImagesList = { file, tag }
    setImages(prevImages => [...prevImages, newImage])
  }

  const handleUpdateAll = (files: GameImagesFile[], type: string) => {
    if (type === "image") {
      setScreenShoots(files)
    } else {
      setVideos(files)
    }
  }

  const handleRemoveFile = (id: number, type: "video" | "image") => {
    if (type === "video") {
      setVideos(videos.filter(v => v.id !== id))
    } else {
      setScreenShoots(screenShoots.filter(s => s.id !== id))
    }
  }

  //#region Sections


  const SectionImageVertical: Section[] = [
    { title: "design", content: "Deve focar na capa vertical do produto." },
    { title: "Uso", content: "Ela vai ser usada para o carrousel da pagina principal, e também na imagem do card do card das paginas de tags." },
    { title: "Tamanho", content: "Forneça uma imagem de 240x320" },
  ]

  const SectionImageHorizontal: Section[] = [
    { title: "design", content: `Deve focar na capa horizontal do produto.` },
    {
      title: "Uso", content: `Esta imagem aparecerá nas sessoes de jogos da pagina principal, 
      na pagina de tags e também nos jogos semelhantes na pagina do jogo.` },
    { title: "Tamanho", content: "Forneça uma imagem de 300x150" },
  ]

  const SectionImagePopularGame: Section[] = [
    { title: "design", content: `Forneça uma imagem que chame a atenção, e se possivel, que tenha o titulo do jogo junto.` },
    { title: "Uso", content: `Fica pagina principal, no topo na parte dos jogos populares, quando o jogo é selecionado.` },
    { title: "Tamanho", content: "Forneça uma imagem de 760x490" },
  ]

  const SectionImageBackground: Section[] = [
    { title: "design", content: `Use alguma imagem que destacará mais como plano de fundo.` },
    { title: "Uso", content: `Fica pagina das tags, nos jogos mais populares com certas tags, serve como background do jogo selecionado.` },
    { title: "Tamanho", content: "Forneça uma imagem de 1920x1080" },
  ]
  const SectionImageIcon: Section[] = [
    { title: "design", content: `Serve como icone de jogo do app do vortex.` },
    { title: "Uso", content: `Ficará do lado do titulo do jogo na lista de jogos do usuário.` },
    { title: "Tamanho", content: "Forneça uma imagem de tamanho 256x256" },
  ]

  const SectionImages: Section[] = [
    { title: "design", content: `Use imagens do jogo, algo que chame a atenção do usuário e faça ele ter vontade de comprar.` },
    { title: "Uso", content: `Fica no carousel de imagens pagina do jogo.` },
    { title: "Tamanho", content: "Forneça imagens de alta resolução como 1280x720 ou 1920x1080" },
  ]

  const SectionVideos: Section[] = [
    { title: "design", content: `Use videos e animações, tudo que pode ser útil para chamar a atenção do usuário e que seja sobre o jogo.` },
    { title: "Uso", content: `Fica no carousel de videos pagina do jogo.` }
  ]
  //#endregion

  return (
    <S.Container>
      <PublisherEditSectionTemplate title="Imagem Horizontal:" >
        <VisualResourcesTemplate
          resolution={{ width: 300, height: 150 }}
          file={horizontalCap}
          handleUpdate={handleUpdate}
          sections={SectionImageHorizontal}
          tag="gameImageHorizontalCap"
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Imagem Vertical:" >
        <VisualResourcesTemplate
          resolution={{ width: 240, height: 320 }}
          file={verticalCap}
          handleUpdate={handleUpdate}
          sections={SectionImageVertical}
          tag="gameImageVerticalCap"
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Imagem De Jogo Popular:" >
        <VisualResourcesTemplate
          resolution={{ width: 760, height: 490 }}
          file={gamePopularImage}
          handleUpdate={handleUpdate}
          sections={SectionImagePopularGame}
          tag="gamePopularImage"
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Imagem De Fundo:" >
        <VisualResourcesTemplate
          resolution={{ width: 1920, height: 1080 }}
          file={gameBackgroundImage}
          handleUpdate={handleUpdate}
          sections={SectionImageBackground}
          tag="gameBackgroundImage"
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Icone:" >
        <VisualResourcesTemplate
          resolution={{ width: 256, height: 256 }}
          file={gameIconImage}
          handleUpdate={handleUpdate}
          sections={SectionImageIcon}
          tag="gameIconImage"
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Capturas de Tela:" >
        <VisualResourcesScreenShootsVideosTemplate
          removeFile={handleRemoveFile}
          handleUpdateAll={handleUpdateAll}
          resolution={{ width: 1280, height: 720 }}
          secondSection={{ width: 1920, height: 1080 }}
          files={screenShoots}
          handleUpdate={handleUpdate}
          sections={SectionImages}
          tag=""
          type="image"
          file={null}
        />
      </PublisherEditSectionTemplate>

      <PublisherEditSectionTemplate title="Videos:" >
        <VisualResourcesScreenShootsVideosTemplate
          removeFile={handleRemoveFile}
          handleUpdateAll={handleUpdateAll}
          type="video"
          resolution={{ width: 10, height: 19 }}
          files={videos}
          handleUpdate={handleUpdate}
          sections={SectionVideos}
          tag=""
          file={null}
        />
      </PublisherEditSectionTemplate>

      <ButtonsContainer
        cancelClick={() => { }}
        cancelButton={false}
        isLoading={inRequest}
        saveClick={inRequest ? () => { } : handleSave}
      />
    </S.Container>
  )
}

export default PublisherEditVisualResources

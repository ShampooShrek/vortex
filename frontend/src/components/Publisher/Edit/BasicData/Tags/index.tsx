"use client"

import { XIcon } from "@/components/Icons"
import FormInput from "@/components/Inputs/FormInput"
import { useEffect, useState } from "react"
import * as S from "./style"

interface Tags {
  portugueseName: string
  id: number
}

interface Category extends Tags {
  category: string
}

interface Genre extends Tags {
  genre: string
}

type Tag = Category[] | Genre[] | Subgenre[]

interface Subgenre extends Tags {
  subgenre: string
}

type TagsNames = "categories" | "genres" | "subgenres"

interface PublisherEditTagsProps {
  selectedtags: Tag,
  tags: Tag
  tag: TagsNames
  handleSetTags(tags: string[], type: TagsNames): void
}

const PublisherEditTags = ({ selectedtags: selectedTagsProps, tags: PropTags, tag, handleSetTags }: PublisherEditTagsProps) => {

  const [tags, setTags] = useState<Tag>(PropTags)
  const [isFocus, setIsFocus] = useState(false)

  const [selectedTags, setSelectadTags] = useState<Tag>(selectedTagsProps)

  const [tagsSearch, setTagsSearch] = useState<string>("")

  let blurTimer: NodeJS.Timeout | null = null

  useEffect(() => {
    if (tagsSearch !== "") {
      setTags(() => {
        const filtredTags = (PropTags as any[]).filter((t: Category | Genre | Subgenre) => t.portugueseName.toLowerCase().replace(" ", "")
          .includes(tagsSearch.toLowerCase().replace(" ", "")));
        return filtredTags
      })
    }
  }, [tagsSearch])

  useEffect(() => {
    if (tag === "categories") {
      let selectedCats = selectedTags as Category[]
      const selectedCatsCategory: string[] = selectedCats.map((t: Category) => t.category)
      handleSetTags(selectedCatsCategory, "categories")
    } else if (tag === "genres") {
      let selectedGenres = selectedTags as Genre[]
      const selectedGenresGenre: string[] = selectedGenres.map(t => t.genre)
      handleSetTags(selectedGenresGenre, "genres")
    } else {
      let selectedSusgenres = selectedTags as Subgenre[]
      const selectedSusgenresSubgenre: string[] = selectedSusgenres.map(t => t.subgenre)
      handleSetTags(selectedSusgenresSubgenre, "subgenres")
    }

  }, [selectedTags])

  const addTag = (tag: Category | Genre | Subgenre) => {
    const selectedTag = [...selectedTags]

    if (!selectedTag.includes(tag)) {
      selectedTag.push(tag)
      setSelectadTags(selectedTag as Tag)
      setTagsSearch("")
      if (blurTimer) {
        clearTimeout(blurTimer)
        blurTimer = null
      }
    }
  }

  const handleInputBlur = () => {
    blurTimer = setTimeout(() => {
      setIsFocus(false)
      blurTimer = null
    }, 300)
  }


  const removeTag = (tagName: string) => {
    const selectedTag = [...selectedTags]
    const updatedTag = selectedTag.filter(tag => tag.portugueseName !== tagName)
    setSelectadTags(updatedTag as Tag)
  }

  return (
    <S.InputsContainer>
      {selectedTags.length > 0 && (
        <S.InputsTagsSelectedsContainer>
          {selectedTags.map((cat, i) => (
            <S.InputsTagsSelecteds
              key={`${cat.portugueseName}-${i}`}>
              {cat.portugueseName} <XIcon onClick={() => removeTag(cat.portugueseName)} />
            </S.InputsTagsSelecteds>
          ))}
        </S.InputsTagsSelectedsContainer>
      )}
      <FormInput
        marginBottom={false}
        type="text"
        value={tagsSearch}
        label={
          (tag === "categories" && "Categorias:") ||
          (tag === "genres" && "Genêros:") ||
          (tag === "subgenres" && "Subgeneros:") || ""}
        onChange={ev => setTagsSearch(ev.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={handleInputBlur}
      />
      {(tagsSearch.length > 0 && isFocus && tags.length > 0) && (
        <S.InputDropDownContainer>
          {tags.slice(0, 6).map((tag, i) => (
            <S.InputDropDownContent
              onClick={() => addTag(tag)}
              key={`${i}-${tag.id}-${tag.portugueseName}`}>
              {tag.portugueseName}
            </S.InputDropDownContent>
          ))}
        </S.InputDropDownContainer>
      )}
    </S.InputsContainer>
  )
}

export default PublisherEditTags

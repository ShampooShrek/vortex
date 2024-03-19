import { useEffect, useState } from "react"
import * as S from "./style"
import { ArrowDownIcon, ArrowRight, ArrowRightDefault } from "@/components/Icons"
import { GameCategories, Genres, Subgenres } from "@/models/dbModels"

interface FilterSectionsProps {
  sectionName: string
  contents: GameCategories[] | Genres[] | Subgenres[]
  appliedFilters: string[]
  setAppliedFilters(filter: string): void
}

interface ContentProps {
  key: string
  content: string
  appliedFilters: string[]
  setAppliedFilters(filter: string): void
}

const Content = ({content, key, appliedFilters, setAppliedFilters}: ContentProps) => {
  const [selected, setSelected] = useState(false)
  
  useEffect(() => {
    if(appliedFilters.includes(content)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [appliedFilters])

  const handleSelected = () => {
    setSelected(selected => selected ? false : true)
    setAppliedFilters(content)
  }

  return (
    <S.Content isSelected={selected} onClick={handleSelected} key={key}>
      {content}
    </S.Content>
  )
}

const FilterSections = ({ contents: contentsProps, sectionName, appliedFilters, setAppliedFilters }: FilterSectionsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contents , setContents] = useState([...contentsProps.slice(0, 5)])

  useEffect(() => {
    setContents([...contentsProps.slice(0, 5)])
  }, [contentsProps])

  const handleIsOpen = () => {
    setIsOpen(open => open ? false : true)
  }

  const handleShowMore = () => {
    if(contents.length === contentsProps.length) {
      setContents([...contentsProps.slice(0, 5)])
    } else {
      setContents(contentsProps)
    }
  }

  return (
    <S.Section>
      <S.SectionTitle onClick={handleIsOpen} >{sectionName} {isOpen ? <ArrowDownIcon /> : <ArrowRightDefault />} </S.SectionTitle>
      <S.SectionContent isOpen={isOpen}>
        {contents.map((content, i)=> (
          <Content  
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            content={content.portugueseName} 
            key={`${content.portugueseName}-${i}-${sectionName}`} />
        ))}
        <S.ShowMoreButton onClick={handleShowMore}>
          {contentsProps.length > 5 && (contents.length === contentsProps.length ? "Recolher" : "Exibir Mais")}
        </S.ShowMoreButton>
      </S.SectionContent>
    </S.Section>
  )
}

export default FilterSections
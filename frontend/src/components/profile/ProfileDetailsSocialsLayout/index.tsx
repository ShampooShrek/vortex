"use client"

import authHook from "@/data/hooks/authHook"
import { useEffect, useState } from "react"
import DetailsHeader from "../DetailsHeader"
import AsideNavigation from "../AsideNavigation"
import * as S from "./style"
import { SocialRequestInterface } from "@/models/frontModels"

interface Section {
  name: string
  sectionName: string
  component?: React.ReactElement
  link?: string
}

interface Sections {
  title: string
  sections: Section[]
}

interface SectionLayoutProps {
  userId: string
  headerSections: string[]
  sections: Sections[]
  socialData?: SocialRequestInterface
}

const ProfileLayout = ({ userId, sections, socialData, headerSections }: SectionLayoutProps) => {
  const { user, loading, setSocial, userStatus } = authHook()

  const [section, setSection] = useState<Section>(sections[0].sections[0])
  const [isAltered, setIsAltered] = useState(false)

  useEffect(() => {
    if (socialData) {
      setSocial(socialData)
    }
  }, [socialData])


  const handleSection = (sectionParam: Section) => {
    if (isAltered && sectionParam !== section) {
      const resp = window.confirm("Deseja continuar? você perdera as mudanças...")
      if (resp) {
        setSection(sectionParam)
        setIsAltered(false)
      }
    } else {
      setSection(sectionParam)
    }
  }



  if (loading) return ""

  if (!user || user.id !== userId) return <h1>Laoding...</h1>

  return (
    <>
      <DetailsHeader id={userId} image={user!.image} nickname={user!.nickname} sections={headerSections} />
      <S.Container>
        <AsideNavigation
          handleSection={handleSection}
          sections={sections}
          selectedSection={section.sectionName}
        />
        {sections.map(sec => sec.sections.map(sec => (
          <div key={sec.name} style={{ display: sec.sectionName === section.sectionName ? "block" : "none", width: "100%" }}>
            {sec.component}
          </div>
        )))}
      </S.Container>
    </>
  )
}

export default ProfileLayout

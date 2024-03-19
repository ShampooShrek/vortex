"use client"

import { MouseEvent, useEffect, useState } from "react"
import * as S from "./style"
import Link from "next/link"
import { ArrowDownIcon, ArrowUpIcon } from "@/components/Icons"

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


interface AsideNavigationProps {
  sections: Sections[]
  selectedSection: string
  handleSection(sectionName: Section): void
}

const AsideNavigation = ({ sections, selectedSection, handleSection }: AsideNavigationProps) => {

  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [sectionName, setSectionName] = useState<string>("")

  useEffect(() => {
    if (selectedSection) {
      sections.map(e => {
        const sec = e.sections.find(s => s.sectionName === selectedSection)
        if (sec) {
          setSectionName(sec.name)
        }
      })
    }
  }, [selectedSection])

  return (
    <>
      <S.AsideNavigation>
        {sections.map(section => (
          <S.AsideNavigationItemContainer key={section.title}>
            {section.title !== "" && <S.AsideNavigationTitle>{section.title}</S.AsideNavigationTitle>}
            {section.sections.map((option, i) => {
              if (option.component) {
                return (
                  <S.AsideNavigationItemContent
                    key={option.name}
                    onClick={() => handleSection(section.sections[i])}
                    selected={section.sections[i].sectionName === selectedSection}>
                    {option.name}
                  </S.AsideNavigationItemContent>
                )
              } else {
                return (
                  <S.AsideNavigationItemContentLink key={option.name}>
                    <Link replace href={option.link as string} >
                      {option.name}
                    </Link>
                  </S.AsideNavigationItemContentLink>
                )
              }
            })}
          </S.AsideNavigationItemContainer>
        ))}
      </S.AsideNavigation>

      <S.TopBarNavigationContainer>
        <S.TopBarNavigation onClick={() => setDropDownOpen(drop => !drop)}>
          <S.TopbarNavigationTitle  >{sectionName}</S.TopbarNavigationTitle>
          {dropDownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </S.TopBarNavigation>

        <S.TopBarNavigationDropDown isOpen={dropDownOpen}>
          {sections.map(section => (
            <S.TopbarNavigationSection key={section.title}>
              <S.TopBarNavigationSectionTitle>{section.title}</S.TopBarNavigationSectionTitle>
              {section.sections.map((s, i) => {
                if (s.component) {
                  return (
                    <S.TopBarNavigationContent
                      key={s.name}
                      onClick={() => { handleSection(section.sections[i]); setDropDownOpen(false) }}
                      selected={section.sections[i].sectionName === selectedSection}>
                      {s.name}
                    </S.TopBarNavigationContent>
                  )
                } else {
                  return (
                    <S.TopBarNavigationContentLink key={s.name} href={s.link!}>
                      {s.name}
                    </S.TopBarNavigationContentLink>
                  )
                }
              })}
            </S.TopbarNavigationSection>
          ))}
        </S.TopBarNavigationDropDown>
      </S.TopBarNavigationContainer>
    </>

  )
}

export default AsideNavigation

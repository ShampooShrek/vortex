"use client"

import styled from "styled-components"

interface SectionTemplateProps {
  section: string
  children: React.ReactNode
}


export const Section = styled.div`
  width: 100%;
`

export const SectionTitle = styled.h3`
  font-weight: normal;
  font-size: 2rem;
  margin-bottom: 20px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`


export const SectionTemplate = ({ children, section }: SectionTemplateProps) => {

  return (
    <Section>
      <SectionTitle>{section}</SectionTitle>
      {children}
    </Section>
  )
}


export default SectionTemplate
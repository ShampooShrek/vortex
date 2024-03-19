"use client"
import { Container, LoadingImage, LoadingText } from "./loadingStyle"
import { useEffect, useState } from "react"

export default function Loading() {
  const [periods, setPeriods] = useState(".")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const periodsLenght = periods.split("").length
      if (periodsLenght >= 4) {
        setPeriods(".")
      } else {
        setPeriods(prev => prev + ".")
      }
    }, 1000)

    return () => clearTimeout(timeoutId)

  }, [periods])

  return (
    <Container>
      <LoadingImage alt={"loading gif"} width={200} height={200} src="/logo.png" />
      <LoadingText>Loading{periods}</LoadingText>
    </Container>
  )
}

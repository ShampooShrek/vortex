"use client"

import { useEffect, useState } from "react"
import * as S from "./style"


const ProgressBar = () => {

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => 
        prevProgress >= 100 ? 0 : prevProgress + 10
      )
    }, 600) 

    return () => 
      clearInterval(interval)
  }, [])

  return (
    <S.Container>
      <S.LoadingBar width={progress}></S.LoadingBar>
    </S.Container>
  )
}

export default ProgressBar
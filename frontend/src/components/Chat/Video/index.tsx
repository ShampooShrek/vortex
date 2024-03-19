"use client"

import { useState, useRef, useEffect } from "react"

interface VideoProps {
  content: string
}

export default function Video({ content }: VideoProps) {
  const [videoUrl, setVideoUrl] = useState("")
  useEffect(() => {
    if (!videoUrl) {
      const getVideoUrl = async () => {
        const resp = await fetch(content)
        const blob = await resp.blob()
        const blobUrl = URL.createObjectURL(blob)
        setVideoUrl(blobUrl)
      }
      getVideoUrl()
    }
  }, [content])

  return <video src={videoUrl} controls />
}

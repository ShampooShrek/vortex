"use client"

import MessageBox from '@/components/MessageBox'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface MessageBoxContextProps {
  showMessageBox: (content: string, type: "error" | "success", callback?: () => void) => void
  hideMessageBox: () => void
}

const MessageBoxContext = createContext<MessageBoxContextProps>({} as MessageBoxContextProps)

export const MessageBoxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [message, setMessage] = useState<{ content: string, type: "error" | "success", callback?: () => void } | null>(null)

  const showMessageBox = (content: string, type: "error" | "success", callback?: () => void) => {
    setMessage({ content, type, callback })
  }

  const hideMessageBox = () => {
    setMessage(null)
  }

  return (
    <MessageBoxContext.Provider value={{ showMessageBox, hideMessageBox }}>
      {children}
      {message && <MessageBox {...message} />}
    </MessageBoxContext.Provider>
  )
}

export default MessageBoxContext

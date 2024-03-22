"use client"

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#AB1A1A"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  )
}

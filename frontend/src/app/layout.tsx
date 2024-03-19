"use client"
import AuthProvider from '@/data/context/authContext'
import '../styles/global.css'
import StyledComponentsRegistry from '@/libs/registry'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Head from 'next/head';
import { MessageBoxProvider } from '@/data/context/messageContent';
import { SkeletonTheme } from 'react-loading-skeleton';
import Script from 'next/script';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <link href="https://unpkg.com/react-image-crop/dist/ReactCrop.css" rel="stylesheet" />
        <Script src="https://unpkg.com/react-image-crop/dist/index.umd.cjs"></Script>
        <ProgressBar
          height="3px"
          color="#AB1A1A"
          options={{ showSpinner: false }}
          shallowRouting
        />

        <AuthProvider>
          <MessageBoxProvider>
            <StyledComponentsRegistry>
              <SkeletonTheme baseColor={"#090A0E"} highlightColor={"#131419"}>
                {children}
              </SkeletonTheme>
            </StyledComponentsRegistry>
          </MessageBoxProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import AuthProvider from '@/data/context/authContext'
import '../styles/global.css'
import StyledComponentsRegistry from '@/libs/registry'
import { cookies } from 'next/headers';

import Head from 'next/head';
import { MessageBoxProvider } from '@/data/context/messageContent';
import { SkeletonTheme } from 'react-loading-skeleton';
import Script from 'next/script';
import { UserAuth } from '@/models/frontModels';
import { GetUserByToken } from '@/utils/ApiRequests';
import { headers } from "next/headers"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user: null | UserAuth = null
  const token = cookies().get("vortex-auth-token")
  const href = headers().get("referer")
  if (href) {
    const pathname = href.split(`${process.env.NEXT_PUBLIC_HREF ?? "http://localhost:3000"}`)[1]
    const noRequestUrls = ["/", "/auth/signIn", "/auth/signUp"]

    const inNoRequestsUrl = noRequestUrls.some(loc => loc === pathname)

    if (token && !inNoRequestsUrl) {
      const resp = await GetUserByToken(token.value)
      if (typeof resp !== "string") user = resp
    }
  }

  return (
    <html lang="pt-br">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <link href="https://unpkg.com/react-image-crop/dist/ReactCrop.css" rel="stylesheet" />
        <Script src="https://unpkg.com/react-image-crop/dist/index.umd.cjs"></Script>
        <AuthProvider userProps={user} >
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

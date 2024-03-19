
import { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Games", default: "Games" }
}

export default function SearchGamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}


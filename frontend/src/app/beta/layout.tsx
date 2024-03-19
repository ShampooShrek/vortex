
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Game"
}

export default function BetaGameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

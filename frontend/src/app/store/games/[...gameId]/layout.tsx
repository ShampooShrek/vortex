import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Game",
    default: "Game"
  }
}

export default function StoreGamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Genre",
    default: "Genre"
  }
}

export default function StoreGenresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

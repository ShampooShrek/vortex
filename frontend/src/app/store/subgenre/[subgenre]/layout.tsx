import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Subgenre",
    default: "Subgenre"
  }
}

export default function StoreSubgenreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

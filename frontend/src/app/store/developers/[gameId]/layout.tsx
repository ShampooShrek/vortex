import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Developers",
    default: "Developers"
  }
}

export default function StoreDevelopersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

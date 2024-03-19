
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Beta Store",
    default: "Beta Store"
  }
}

export default function BetaGameStoreeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

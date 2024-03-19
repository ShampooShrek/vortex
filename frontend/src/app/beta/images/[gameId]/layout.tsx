
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Beta Images",
    template: "%s | Beta Images"
  }
}

export default function BetaImagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

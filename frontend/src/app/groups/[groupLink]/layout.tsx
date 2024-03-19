
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Page",
    default: "Group Page"
  }
}

export default function GroupPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

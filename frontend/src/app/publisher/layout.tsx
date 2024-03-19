import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Publisher"
}

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

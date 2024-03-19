import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Details",
    default: "Details"
  }
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

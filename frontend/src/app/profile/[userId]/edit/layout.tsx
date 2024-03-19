import { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Edit", default: "Edit" }
}

export default function ProfileEditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

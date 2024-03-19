
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confirm Email"
}

export default function ConfirmEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

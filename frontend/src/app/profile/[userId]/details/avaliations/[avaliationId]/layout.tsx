
import { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Avaliation", default: "User Avaliations" }
}

export default function ProfileAvaliationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

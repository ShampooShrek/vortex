
import { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Achievemenets", default: "User Achievemenets" }
}

export default function ProfileAchievemnetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}


import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Group"
}

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

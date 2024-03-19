import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Groups",
    default: "Groups"
  }
}

export default function SearchGroupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

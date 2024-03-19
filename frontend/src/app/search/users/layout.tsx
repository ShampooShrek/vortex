import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Users",
    default: "Users"
  }
}

export default function SearchUsersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

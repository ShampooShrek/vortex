
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Edit",
    default: "Edit Group"
  }
}

export default function EditGroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

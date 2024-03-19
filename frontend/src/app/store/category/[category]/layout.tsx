
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Categories",
    default: "Categories"
  }
}

export default function StoreCategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

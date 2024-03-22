
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Transactiosn"
}

export default function TransactionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

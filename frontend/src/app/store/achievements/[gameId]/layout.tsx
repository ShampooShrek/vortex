import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Achievements",
    default: "Achievements"
  }
}

export default function StoreAchievemenetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

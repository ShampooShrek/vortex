import { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Social", default: "Social" }
}

export default function ProfileSocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}




import Link from "next/link"

interface LinkProps {
  text: string
  link: string
}

export function NavLinks({link, text}: LinkProps) {
  return (
    <Link replace href={link} > 
      {text}
    </Link>
  )
}
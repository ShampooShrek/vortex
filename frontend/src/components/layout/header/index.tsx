import { FC } from "react"
import { Container, HeaderComponent, Logo } from "./style"
import {Nav} from "./nav"

export function Header() {
  return (
    <Container>
      <HeaderComponent>
          <Nav />
      </HeaderComponent>
    </Container>
  )
}
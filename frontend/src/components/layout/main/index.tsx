import { FC } from "react";
import { Container, Content } from "./style";

interface MainProps {
  children: any
  mainMargin: boolean
}

export function Main({children, mainMargin}: MainProps) {
  return (
    <Container mainMargin={mainMargin}>
      <Content>{children}</Content>
    </Container>
  )
}

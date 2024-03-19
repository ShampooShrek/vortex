import styled from "styled-components"

export const DescriptionContainer = styled.div`
`

export const Description = styled.p`
font-size: 1.2rem;
line-height: 20px;

img {
  width: 100%;
}

&:not(:last-child) {
  margin-bottom: 10px;
}

@media screen and (max-width: 1600px) {
  font-size: 0.9rem
}
`

import styled from "styled-components";



export const CardContainerDiv = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));


  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }

`

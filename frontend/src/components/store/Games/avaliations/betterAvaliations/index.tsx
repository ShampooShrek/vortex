"use client"

import {useState} from "react"

import * as S from "./style"

const BetterAvaliations = () => {
  const [seeMore, setSeeMore] = useState(false)
  
  return (
    <S.Container>
      <S.UserContainer>
        <S.User>
          <S.UserImage src="https://imgs.search.brave.com/6qS8CgwvZrxswZ9jIzTW5C_BGYTnLvmggjSlCEDqAB8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/em9vcGx1cy5lcy9t/YWdhemluZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wMy9T/b2JyZXBlc28tZW4t/Z2F0b3MuanBlZw" />
          <S.UserName>GATO!</S.UserName>
        </S.User>
      </S.UserContainer>
      <S.AvaliationContainer>
        <S.Avaliation>
          <img src="https://imgs.search.brave.com/Ky6M0y1PTtawuRDbFZbBklUpRGLcVRXxDSUiUOKT7X4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbGlrZS9zbWFs/bC9saWtlX1BORzEw/LnBuZw" alt="" />
          <S.AvaliationTitle>
            <h3>Recomendado</h3>
            <span>Jogou por 42.0 horas(30.3 horas quando avaliado)</span>
          </S.AvaliationTitle>
        </S.Avaliation>
        <S.AvaliationContentContainer>
          <S.AvaliationDate>PUBLICADO DIA 03 DE AGOSTO</S.AvaliationDate>
          <S.AvaliationContent seeMore={seeMore}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          {!seeMore && <S.AvaliationGradient /> }
          </S.AvaliationContent>
          {!seeMore && <S.SeeMore onClick={() => setSeeMore(true)}><span>Ler Mais</span></S.SeeMore> }
        </S.AvaliationContentContainer>
        <S.Bar />
        <S.ControlContainer>
          <h4>O que você achou da análise?</h4>
          <S.ButtonsContainer>
            <S.Buttons title="uga" >Gostei :D</S.Buttons>
            <S.Buttons title="uga" >Não Gostei :C</S.Buttons>
          </S.ButtonsContainer>
          <S.VoteInfo>
            <span>30 pessoas gostaram desta analise</span>
            <span>15 pessoas não gostaram desta analise</span>
          </S.VoteInfo>
        </S.ControlContainer>
      </S.AvaliationContainer>
    </S.Container>
  )
}

export default BetterAvaliations
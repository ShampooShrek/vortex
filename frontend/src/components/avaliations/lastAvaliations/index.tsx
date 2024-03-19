import * as S from "./style"

const LastAvaliations = () => {

  return (
    <S.Container>
      <S.AvaliationContainer>
        <S.Avaliation>
          <S.User>
            <S.UserImage src="https://imgs.search.brave.com/6qS8CgwvZrxswZ9jIzTW5C_BGYTnLvmggjSlCEDqAB8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/em9vcGx1cy5lcy9t/YWdhemluZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wMy9T/b2JyZXBlc28tZW4t/Z2F0b3MuanBlZw" />
            <S.UserName>GATO!</S.UserName>
          </S.User>
          <S.AvaliationNoteContainer>
            <S.AvaliationImage src="https://imgs.search.brave.com/Ky6M0y1PTtawuRDbFZbBklUpRGLcVRXxDSUiUOKT7X4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbGlrZS9zbWFs/bC9saWtlX1BORzEw/LnBuZw" alt="" />
            <S.AvaliationTitle>
              <h3>Recomendado</h3>
              <span>27.0h</span>
            </S.AvaliationTitle>
          </S.AvaliationNoteContainer>
        </S.Avaliation>
        <S.AvaliationContentContainer>
          <S.AvaliationDate>PUBLICADO DIA 03 DE AGOSTO</S.AvaliationDate>
          <S.AvaliationContent >
          Jogo excelente, ótima história, gráficos sensacional de nova geração, já até zerei o game... Agradeço ao Marcus do canal PC Facts por ter fornecido a chave do game e ter me dado a chance de jogar essa obra prima!
          </S.AvaliationContent>
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
            <span>15 pessoas não desta analise</span>
          </S.VoteInfo>
        </S.ControlContainer>
      </S.AvaliationContainer>
    </S.Container>
  )
}

export default LastAvaliations
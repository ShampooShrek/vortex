import * as S from "./style"

interface FilterInterface {
  children: React.ReactNode
}

const Filter = ({ children }: FilterInterface) => {
  
  return (
    <S.FilterContainer>
      {children}
    </S.FilterContainer>
  )
}


export default Filter
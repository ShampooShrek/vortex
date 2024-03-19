
import * as S from "./style"

interface FilterOptionsInterface {
  option: string
  isSelected: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const FilterOptions = ({ isSelected, onClick, option }: FilterOptionsInterface) => {

  return (
    <S.FilterOptions isSelected={isSelected} onClick={onClick}>
      {option}
    </S.FilterOptions>
  )
}

export default FilterOptions
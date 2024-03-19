import { XIcon } from "@/components/Icons"
import * as S from "./style"

interface AppliedFiltersProps {
  filters: string[]
  setAppliedSlice(filter: string): void
}

const AppliedFilters = ({ filters, setAppliedSlice }: AppliedFiltersProps) => {

  return (
    <S.Container>
      <S.SectionTitle>Filtros Aplicados:</S.SectionTitle>
      <S.FiltersContainer>
        {filters.map((filter, i) => (
          <S.Filter onClick={() => setAppliedSlice(filter)} key={`filter-${filter}-${i}`} > <XIcon />{filter}</S.Filter>
        ))}
      </S.FiltersContainer>
    </S.Container>
  )
}

export default AppliedFilters
import ContainerGameJolt from "@/components/ContainerGameJolt"
import { FiltersOptions, Profile, UserDetails } from "@/models/frontModels"

interface DetailsContentHeaderProps {
  selectedFilter: keyof UserDetails
  filters: FiltersOptions[]
  children: React.ReactNode
}

const DetailsContent = ({ filters, selectedFilter, children }: DetailsContentHeaderProps) => {
  
  return (
    <ContainerGameJolt selectedFilter={selectedFilter} filters={filters}>
      {children}
    </ContainerGameJolt>
  )
}


export default DetailsContent
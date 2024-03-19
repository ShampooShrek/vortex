import ProfileAvaliations from "@/components/avaliations/ProfileAvaliations"
import ProfileContentContainer from "../ProfileContentContainer"
import { Avaliations } from "@/models/dbModels"

const ProfileAvaliation = ({ avaliations }: { avaliations: Avaliations[] }) => {

  return (
    <ProfileContentContainer title="Últimas Avaliações:" >
      {avaliations.map(av => (
        <ProfileAvaliations avaliation={av} key={`av-profile-${av.gameId}`} />
      ))}
    </ProfileContentContainer>
  )
}

export default ProfileAvaliation

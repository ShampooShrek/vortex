import * as S from "./style"
import Link from "next/link"
import { Groups } from "@/models/frontModels"


interface DetailsGroupsProps {
  groups: Groups[]
}

const DetailsGroups = ({ groups }: DetailsGroupsProps) => {

  return (
    <S.GroupContainer>
      {groups.map(g => (
        <S.GroupCard key={g.id}>
          <S.GroupImageStatus>
            <S.GroupImg src={g.image ? g.image.url : "group_image.jpg"} />
            <S.UserContent>
              <Link replace href={`/groups/${g.groupLink}`}>{g.name}</Link>
            </S.UserContent>
          </S.GroupImageStatus>
        </S.GroupCard>
      ))}
    </S.GroupContainer>
  )
}

export default DetailsGroups

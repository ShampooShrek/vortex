import { ChangeEvent } from "react"
import * as S from "./style"

interface ProfileSectionHeaderProps {
  placeholder: string
  text: string
  value: string
  onChange(ev: ChangeEvent<HTMLInputElement>): void 
  margin?: boolean
}

export const ProfileSectionHeader = ({ placeholder, text, value, onChange, margin = true }: ProfileSectionHeaderProps) => {

  return (
    <S.EnvitesHeader style={{ marginBottom: margin ? "10px" : "0" }}>
      <S.Input>
        <label>{text}</label>
        <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
      </S.Input>
    </S.EnvitesHeader>
  )
}

export default ProfileSectionHeader
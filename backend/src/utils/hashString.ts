import bcrypt from "bcrypt"

const hashValue = (value: string): string => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(value.trim(), salt)
}


export default hashValue

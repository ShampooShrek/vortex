const Nickname = /^[a-zA-Z0-9_]/
const Email = /^[a-zA-Z0-9_%+-.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
const Username = /^[a-zA-ZÁ-ú\s]+$/
const Group = /^[a-zA-Z0-9_-]+$/

export type regexOptions =  
  "Username" | "Email" | "Nickname" | "Group" | false


export default { Email, Username, Nickname, Group }
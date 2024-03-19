import Content from "./Content"
import { GameCategories } from "@/models/dbModels";

interface GameCategoriesProps {
  categories: GameCategories[] | string
}

export default async function Categories({ categories }: GameCategoriesProps) {

  if (typeof categories === "string") return <p>Ops, algo deu errado na requesição!</p>

  return (
    <Content section={"Categorias"} categories={categories as GameCategories[]} />
  )
}

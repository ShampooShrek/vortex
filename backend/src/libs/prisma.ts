import { PrismaClient } from "@prisma/client"
// import { categories } from "../../prisma/seeds"

const prisma = new PrismaClient()

export default prisma

// const main = async () => {
//   for(const category of categories) {
//     const catExists = await prisma.gameCategories.findUnique({ where: { category } })
//     if(!catExists) {
//       await prisma.gameCategories.create({ data: { category } })
//     }
//   }
// }


// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

import Cart from "@/components/Cart";
import { Layout } from "@/components/layout";
import { GamesStore } from "@/models/frontModels";
import { CartRequest } from "@/utils/ApiRequests";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CartPage() {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  if(!token) redirect("/auth/signIn")

  const cartResponse = await CartRequest(token.value)

  if(typeof cartResponse === "string") redirect("/home")
  
  const cart = cartResponse as GamesStore[]

  return (
    <Layout needConfirmEmail>
      <Cart cart={cart} />
    </Layout>
  )
}
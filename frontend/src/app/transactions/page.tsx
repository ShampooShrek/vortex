import Transactions from "@/components/Transactions";
import { Layout } from "@/components/layout";
import { Transaction } from "@/models/dbModels";
import { CartRequest, TransactionRequest } from "@/utils/ApiRequests";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {

  const useCookies = cookies()
  const token = useCookies.get("vortex-auth-token")

  if (!token) redirect("/auth/signIn")

  const transactionResponse = await TransactionRequest(token.value)

  if (typeof transactionResponse === "string") redirect("/home")

  const transaction = transactionResponse as Transaction[]

  return (
    <Layout needConfirmEmail>
      <Transactions transactions={transaction} />
    </Layout>
  )
}

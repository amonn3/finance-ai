import { db } from "../_lib/prisma";
import { DataTable } from "@/app/_components/ui/data-table";
import { transactionColumns } from "@/app/transactions/_columns";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import Navbar from "@/app/_components/navbar";
const TransactionsPage = async () => {
  //acessar as transações do usuário no banco de dados

  const transactions = await db.transaction.findMany({});

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default TransactionsPage;

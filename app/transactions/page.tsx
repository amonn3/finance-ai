import { db } from "../_lib/prisma";
import { Button } from "@/app/_components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { DataTable } from "@/app/_components/ui/data-table";
import { transactionColumns } from "@/app/transactions/_columns";

const TransactionsPage = async () => {
  //acessar as transações do usuário no banco de dados

  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          <ArrowDownUpIcon />
          Adicionar Transação
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;

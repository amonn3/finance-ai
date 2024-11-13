import {
  WalletIcon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const balance = depositsTotal - (investmentsTotal + expensesTotal);

  return (
    <>
      <div className="space-y-6"></div>
      {/* primeiro card */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* outros cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investimentos"
          amount={investmentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon className="text-primary" size={16} />}
          title="Receita"
          amount={depositsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon className="text-red-500" size={16} />}
          title="Despesas"
          amount={expensesTotal}
          size="small"
        />
      </div>
    </>
  );
};

export default SummaryCards;

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar";
import SummaryCards from "@/app/(home)/_components/summary-cards";
import TimeSelect from "@/app/(home)/_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "@/app/(home)/_components/transactions-pie-chart";
import { getDashboard } from "@/app/_data/get-dashboard";
import ExpensesPerCategory from "@/app/(home)/_components/expenses-per-category";
import LastTransactions from "@/app/(home)/_components/last-transactions";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";
import AiReportsButton from "./_components/ai-reports-button";
import { Decimal } from "@prisma/client/runtime/library";
interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <AiReportsButton
              hasPremiumPlan={
                user.publicMetadata.subscription_plan === "premium"
              }
              month={month}
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions
            lastTransactions={dashboard.lastTransactions.map((transaction) => ({
              ...transaction,
              amount: new Decimal(transaction.amount),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

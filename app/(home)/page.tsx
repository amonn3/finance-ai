import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar";
import SummaryCards from "@/app/(home)/_components/summary-cards";
import TimeSelect from "@/app/(home)/_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "@/app/(home)/_components/transactions-pie-chart";
import { getDashboard } from "@/app/_data/get-dashboard";
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
    redirect("?month=01");
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboard} month={month} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

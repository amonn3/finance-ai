import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar";
import SummaryCards from "@/app/(home)/_components/summary-cards";
import TimeSelect from "@/app/(home)/_components/time-select";
import { isMatch } from "date-fns";
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

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
      </div>
      <SummaryCards month={month} />
    </>
  );
};

export default Home;

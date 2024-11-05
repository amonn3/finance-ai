import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>Dashboard Page</h1>
      <UserButton showName />
    </div>
  );
};

export default Home;

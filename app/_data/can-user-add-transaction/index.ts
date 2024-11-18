import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscription_plan === "premium") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
};

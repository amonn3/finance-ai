import { endOfMonth, startOfMonth } from "date-fns";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentMonthTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};

"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import {
  TransactionType,
  TransactionCategory,
  PaymentMethod,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: AddTransactionParams) => {
  addTransactionSchema.parse(params);
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id ?? "",
    },
  });

  revalidatePath("/transactions");
};

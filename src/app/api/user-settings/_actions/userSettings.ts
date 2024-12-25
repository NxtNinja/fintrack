"use server";

import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schemas/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
  const paresedData = UpdateUserCurrencySchema.safeParse({ currency });

  if (!paresedData.success) {
    throw paresedData.error;
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });

  return userSettings;
}

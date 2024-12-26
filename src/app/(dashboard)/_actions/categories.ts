"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schemas/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const CreateCategory = async (from: CreateCategorySchemaType) => {
  const parsedBody = CreateCategorySchema.safeParse(from);

  if (!parsedBody.success) {
    throw new Error("Invalid request body");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { name, icon, type } = parsedBody.data;

  const category = await prisma.category.create({
    data: {
      name,
      icon,
      type,
      userId: user.id,
    },
  });

  return category;
};

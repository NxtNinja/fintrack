import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowDownUpIcon, WalletMinimal } from "lucide-react";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <>
      <div className="h-full bg-background">
        <div className="bg-card border-b">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-8">
            <p className="text-3xl font-bold w-full">
              Hello, {user.firstName} 👋
            </p>
            <div className="flex justify-start md:justify-end w-full items-center gap-3">
              <CreateTransactionDialog
                trigger={
                  <Button
                    variant={"outline"}
                    className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                  >
                    <p className="">New Income</p>
                    <WalletMinimal />
                  </Button>
                }
                type="income"
              />

              <CreateTransactionDialog
                trigger={
                  <Button
                    variant={"outline"}
                    className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                  >
                    <p className="">New Expense</p>
                    <ArrowDownUpIcon />
                  </Button>
                }
                type="expense"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

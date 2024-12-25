import { CurrencyBox } from "@/components/CurrencyBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <div className="container flex max-w-2xl flex-col items-center justify-center gap-4">
        <div className="">
          <h1 className="text-center text-3xl">
            Welcome to Fintrack,{" "}
            <span className="ml-2 font-bold">{user.firstName} 👋</span>
          </h1>
          <h2 className="mt-4 text-center text-base text-muted-foreground">
            Let&apos;s get started by setting up your currency
          </h2>
          <h3 className="mt-2 text-center text-sm text-muted-foreground">
            You can change these settings anytime
          </h3>
        </div>
        <Separator />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>PLease set your default currency</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyBox />
          </CardContent>
        </Card>
        <Separator />
        <Button className="w-full" asChild>
          <Link href={"/"}>I&apos;m done!</Link>
        </Button>
      </div>
    </>
  );
};

export default page;

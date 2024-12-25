"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

const MobileNavbar = () => {
  return (
    <div className="border-separate bg-background md:hidden p-5 flex justify-between items-center w-full">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6" side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <div className="text-2xl font-bold tracking-widest uppercase">
                Fintrack
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 h-full">
            {items.map((item) => (
              <NavbarItem key={item.label} {...item} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <ThemeSwitchButton />
        <UserButton />
      </div>
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <>
      <div className="hidden md:block w-screen">
        <nav className="container flex items-center justify-between px-8 mx-auto border-separate border-b bg-background">
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <div className="text-2xl font-bold tracking-widest uppercase">
              Fintrack
            </div>
            <div className="flex h-full">
              {items.map((item) => (
                <NavbarItem key={item.label} {...item} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitchButton />
            <UserButton />
          </div>
        </nav>
      </div>
    </>
  );
};

const NavbarItem = ({ label, link }: { label: string; link: string }) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
};

export default Navbar;

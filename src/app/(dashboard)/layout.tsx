import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative flex flex-col w-full justify-center items-center">
        <Navbar />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default layout;

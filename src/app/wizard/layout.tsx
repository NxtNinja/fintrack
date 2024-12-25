import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative h-screen flex justify-center items-center flex-col">
        {children}
      </div>
    </>
  );
};

export default layout;

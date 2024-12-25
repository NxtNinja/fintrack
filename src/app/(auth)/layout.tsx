import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-[100dvh] justify-center items-center flex-col gap-5">
        {/* <Logo /> */}
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default layout;

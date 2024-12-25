import { FC, ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonWrapperProps {
  children: ReactNode;
  isloading: boolean;
  fullWidth: boolean;
}

const SkeletonWrapper: FC<SkeletonWrapperProps> = ({
  children,
  isloading,
  fullWidth = true,
}) => {
  if (!isloading) {
    return <>{children}</>;
  }
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;

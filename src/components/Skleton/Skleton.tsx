import React from "react";
import { Skeleton } from "@nextui-org/react";

const LocalSkeleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Skeleton className={`${className}`}>{children}</Skeleton>
    </>
  );
};

export default LocalSkeleton;

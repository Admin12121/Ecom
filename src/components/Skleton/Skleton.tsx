import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const HomeSkleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Skeleton className={`${className}`}></Skeleton>
      {children}
    </>
  );
};

export default HomeSkleton;

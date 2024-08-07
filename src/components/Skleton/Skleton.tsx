import React from "react";
import { Spinner } from "@nextui-org/react";

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



 
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      {...props}
    />
  )
}
 
export { Skeleton }



function LocalSpinner() {
  return (
    <Spinner color="default"/>
  )
}

export { LocalSpinner }
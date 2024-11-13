import { cn } from "@/lib/utils";
import React from "react";

interface CodeProps {
  className: string;
  children: React.ReactNode;
}

export const Code = ({ className, children }: CodeProps) => {
  return (
    <code
      className={cn(
        "px-2 py-1 font-mono font-normal whitespace-nowrap text-default-foreground ",
        className
      )}
    >
      {children}
    </code>
  );
};

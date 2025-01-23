import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import { buttonVariants } from "./button";

interface Props {
  children: React.ReactNode;
  className?: string;
  varaint?:
    | "active"
    | "custom"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon";
  handle?: any;
}

const Tag = ({ children, className, handle, varaint, size }: Props) => {
  const handleClick = () => {
    if (handle) {
      handle();
    }
  };
  return (
    <div
      className={cn(
        "animate-fadeIn relative inline-flex h-5 cursor-default items-center rounded-md bg-background pe-5 pl-2 ps-2 text-xs font-medium text-secondary-foreground transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 data-[fixed]:pe-2",
        "bg-secondary dark:bg-neutral-200 dark:text-black text-secondary-foreground shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-50"
      )}
    >
      {children}
      <button
        className={cn(
          "absolute -inset-y-px -end-px flex size-6 items-center justify-center rounded-e-lg p-0 text-muted-foreground/80 outline-0 transition-colors hover:text-foreground dark:hover:text-black dark:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
        )}
        onClick={() => handleClick()}
        aria-label="Remove"
      >
        <X size={11} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Tag;

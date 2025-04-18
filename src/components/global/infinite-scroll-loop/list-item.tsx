"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type GroupListItemProps = {
  name: string;
  selected?: string;
};

export const GroupListItem = ({
  name,
  selected,
}: GroupListItemProps) => {
  return (
    <Button
      variant="secondary"
      className={cn(
        "flex  gap-3 items-center py-2 px-4 rounded-lg dark:bg-[#171718] dark:text-white cursor-pointer",
        "whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium flex-shrink-0",
        selected === name ? "border-themeTextGray" : "border-themeGray"
      )}
    >
      {name}
    </Button>
  );
};

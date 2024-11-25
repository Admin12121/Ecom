"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context";
import { cn } from "@/lib/utils";

export const CurrencySelector = ({className}:{className?:string}) => {
  const { liveratedata, handleSelectionChange, selectedcurrencyiso } = useAuth();
  return (
    <>
      {liveratedata && selectedcurrencyiso && (
        <Select
          onValueChange={(value) =>
            handleSelectionChange({
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          defaultValue={selectedcurrencyiso}
        >
          <SelectTrigger className={cn("w-[180px] border-0 border-none bg-transparent", className)}>
            <SelectValue placeholder="Country / Region" />
          </SelectTrigger>
          <SelectContent className={cn("p-0 rounded-xl dark:bg-zinc-800")}>
            <SelectGroup>
              {liveratedata &&
                liveratedata.map((item) => (
                  <SelectItem
                    className={cn("transparent backdrop-blur-md rounded-xl")}
                    key={item?.iso3}
                    value={item?.iso3}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{item?.symbol}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col dark:text-white">
                        <span className="text-base">{item?.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

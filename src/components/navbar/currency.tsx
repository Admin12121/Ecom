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

export const CurrencySelector = ({ className }: { className?: string }) => {
  const { liveratedata, handleSelectionChange, selectedcurrencyiso } =
    useAuth();
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
          <SelectTrigger
            icon={false}
            className={cn(
              "w-8 p-0 md:px-3 md:py-2 md:w-[180px] border-0 border-none bg-transparent",
              className
            )}
          >
            <SelectValue placeholder="Country / Region">
              <div className="flex gap-2 items-center">
                <Avatar className="rounded-md md:rounded-full w-8 h-9 md:h-8">
                  <AvatarFallback className="rounded-md md:rounded-full">
                    {
                      liveratedata.find(
                        (item) => item.iso3 === selectedcurrencyiso
                      )?.symbol
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col dark:text-white">
                  <span className="hidden md:flex text-base">
                    {
                      liveratedata.find(
                        (item) => item.iso3 === selectedcurrencyiso
                      )?.name
                    }
                  </span>
                </div>
              </div>
            </SelectValue>
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
                      <Avatar className="rounded-md md:rounded-full w-8 h-8">
                        <AvatarFallback className="rounded-md md:rounded-full">
                          {item?.symbol}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col dark:text-white">
                        <span className="md:hidden flex text-base">
                          {item?.iso3}
                        </span>
                        <span className="hidden md:flex text-base">
                          {item?.name}
                        </span>
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

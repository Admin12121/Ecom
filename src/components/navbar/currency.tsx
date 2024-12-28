"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
            customIcon={<></>}
            className={cn(
              "w-12 p-0 md:px-3 md:py-2 md:w-[100px] border-0 border-none bg-transparent",
              className
            )}
          >
            <SelectValue placeholder="Country / Region">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col dark:text-white">
                  <span className="flex text-base items-center justify-center gap-1 md:gap-2">
                    {
                      liveratedata.find(
                        (item) => item.iso3 === selectedcurrencyiso
                      )?.flag
                    }{" "}
                    <span className="hidden md:flex">
                      {
                        liveratedata.find(
                          (item) => item.iso3 === selectedcurrencyiso
                        )?.iso3
                      }{" "}
                    </span>
                    {
                      liveratedata.find(
                        (item) => item.iso3 === selectedcurrencyiso
                      )?.symbol
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
                      <div className="flex flex-col dark:text-white">
                        <span className="flex text-base">
                          {item?.iso3} {item?.symbol}
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

"use client";

import Image from "next/image";
import { useAuth } from "@/lib/context";
import { Card, CardContent as CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";

const Voucher = ({ data }: { data: any }) => {
  const { convertPrice } = useAuth();
  const { convertedPrice, symbol } = convertPrice(data.variantDetails.price);
  const discount = data.variantDetails.discount;
  const finalPrice = useMemo(() => {
    return convertedPrice - convertedPrice * (discount / 100);
  }, [convertedPrice, discount]);

  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );
  return (
    <Card className="p-2 w-full rounded-md shadow-none bg-transparent h-[90px] bg-white dark:bg-neutral-900">
      <CardBody className="flex justify-between flex-row items-center h-full">
        <span className="flex gap-5 items-center h-full">
          <span className="h-full rounded-md w-[80px] dark:bg-zinc-700/50">
            <Image
              alt="nextui logo"
              height={100}
              src={data.images.image}
              width={80}
              className="w-[80px] h-full object-contain"
            />
          </span>
          <span className="flex items-start flex-col gap-2 justify-between h-full">
            <span className="flex flex-col gap-0">
              <p className="text-base ">
                {truncateText(data.product_name, 14)}
              </p>
              <p className="text-xs text-zinc-400">
                {data.categoryname}{" "}
                {data.variantDetails.size
                  ? ` ( ${data.variantDetails.size}cm )`
                  : ""}
              </p>
            </span>
            <span>
              <p className="text-xs text-zinc-400 pb-1">qty: {data.pcs}</p>
            </span>
          </span>
        </span>
        <span className="flex items-end gap-8 justify-between flex-col h-full ">
          <p className="text-sm bg-secondary-500 rounded-md text-center px-2 text-white ">
            {discount ? `-${discount}%` : "for you"}
          </p>
          <span className={cn("flex", discount > 0 && " gap-2")}>
            <p className="text-sm">
              {discount > 0 && `${symbol} ${finalPrice * data.pcs}`}
            </p>
            <p
              className={cn(
                "text-sm",
                discount > 0 && "text-neutral-500 line-through"
              )}
            >
              {symbol} {convertedPrice * data.pcs}
            </p>
          </span>
        </span>
      </CardBody>
    </Card>
  );
};

export default Voucher;
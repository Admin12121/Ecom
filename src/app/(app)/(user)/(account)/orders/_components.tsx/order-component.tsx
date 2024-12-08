import React, { useCallback, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { LeftIcon, RightIcon } from "./icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useProductsByIdsQuery } from "@/lib/store/Service/api";
import { MapPin, ShoppingCart, Truck } from "lucide-react";
import Voucher, {
  VoucherSkleton,
} from "../../../checkout/[transitionuid]/_components/voucher";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Order as OrderData } from ".";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  variants: Array<{ id: string }>;
  categoryname: string;
  description: string;
  images: string[];
  product_name: string;
  productslug: string;
}

const renderBadge = (status: string) => {
  const statusMap: {
    [key: string]: {
      varaint?:
        | "default"
        | "secondary"
        | "warning"
        | "success"
        | "danger"
        | "destructive"
        | "outline"
        | null
        | undefined;
      color: string;
      label: string;
    };
  } = {
    pending: { varaint: "warning", color: "bg-orange-500", label: "Pending" },
    verified: { varaint: "warning", color: "bg-blue-500", label: "Verified" },
    proceed: { color: "bg-blue-500", label: "Proceed" },
    packed: { color: "bg-blue-500", label: "Packed" },
    delivered: {
      varaint: "success",
      color: "bg-green-500",
      label: "Delivered",
    },
    successful: {
      varaint: "success",
      color: "bg-green-500",
      label: "Successful",
    },
    cancled: { varaint: "danger", color: "bg-red-500", label: "Canceled" },
  };

  const { varaint, color, label } = statusMap[status] || {
    varaint: "default",
    color: "gray",
    label: "Unknown",
  };
  return (
    <Badge variant={varaint} className={`relative border-0 gap-1`}>
      <span
        className={cn(
          "animate-ping absolute inline-flex h-2 w-2  rounded-full ",
          color
        )}
      ></span>
      <span
        className={cn("inline-flex h-2 w-2 right-0 top-0 rounded-full ", color)}
      ></span>
      {label}
    </Badge>
  );
};

export const OrderComponent = ({ data }: { data: OrderData[] }) => {
  return (
    <div className="w-full h-full flex gap-2">
      {data.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-1 w-full">
          {data ? (
            data.map((order: OrderData) => (
              <AccordionItem
                key={order.transactionuid}
                value={order.transactionuid}
                className="rounded-lg shadow-none bg-white dark:bg-neutral-900 transition-all w-full"
              >
                <OrderDetails order={order} />
              </AccordionItem>
            ))
          ) : (
            <span className="space-y-2">
              <h1 className="text-xl">Orders</h1>
              <p>Your account has no orders. Yet.</p>
              <Button>Shop Now</Button>
            </span>
          )}
        </Accordion>
      ) : (
        <div className="flex flex-col w-full h-[50dvh] gap-2 items-center justify-center">
          <h1>Your Order list is empty</h1>
          <p className="text-sm text-neutral-500">Start by exploring out Productsa and great deals!</p>
          <Button>Continue Shopping</Button>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ order }: { order: OrderData }) => {
  const router = useRouter();
  const productIds = useMemo(() => {
    return order.products.map((item) => item.product);
  }, [order]);

  const { data: products, isLoading } = useProductsByIdsQuery(
    { ids: productIds },
    { skip: productIds.length === 0 }
  );

  const productsWithData = useMemo(() => {
    if (!products) return [];
    return order.products.map((cartItem) => {
      const product = products.results.find(
        (p: Product) => p.id === cartItem.product
      );
      const variantDetails = Array.isArray(product.variants)
        ? product.variants.find((v: any) => v.id === cartItem.variant)
        : product.variants;

      return {
        ...cartItem,
        pcs: cartItem.qty,
        categoryname: product.categoryname,
        description: product.description,
        images: product.images,
        product_name: product.product_name,
        productslug: product.productslug,
        variantDetails: variantDetails || {},
      };
    });
  }, [products, order]);

  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateEstimatedArrival = (
    created: string,
    daysToAdd: number
  ): string => {
    const createdDate = new Date(created);
    createdDate.setDate(createdDate.getDate() + daysToAdd);
    return formatDate(createdDate);
  };

  return (
    <>
      <AccordionTrigger
        icon={<></>}
        className="text-left hover:no-underline p-0 w-full lg:min-w-[450px] bg-white dark:bg-neutral-900/50 rounded-lg"
      >
        <div className="flex w-full rounded-lg p-1 flex-col">
          <div className="w-full p-2 flex justify-between items-center rounded-lg">
            <h1 className="flex gap-1">
              <ShoppingCart className="w-5 h-5" />{" "}
              {truncateText(order.transactionuid, 15)}
            </h1>
            {renderBadge(order.status)}
          </div>
          <div className="w-full p-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 rounded-lg">
            <span className="p-2 border-1 rounded-xl">
              <p className="text-sm flex items-center gap-1">
                <Truck className="w-4 h-4" /> Kathmandu, Nepal
              </p>
            </span>
            <span className="flex items-center justify-center">
              <LeftIcon className="dark:fill-white/70 dark:stroke-white/70 stroke-neutral-700 hidden lg:flex" />
              <span className="p-2 border-1 rounded-xl">
                <p className="text-sm text-neutral-500">
                  Estimated arrival:{" "}
                  {calculateEstimatedArrival(order.created, 7)}
                </p>
              </span>
              <RightIcon className="dark:fill-white/70 dark:stroke-white/70 stroke-neutral-700 hidden lg:flex" />
            </span>
            <span className="p-2 border-1 rounded-xl">
              <p className="text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {order?.shipping?.city}, {order?.shipping?.country}
              </p>
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-2 pb-0">
        <VoucherSkleton loading={isLoading}>
          {productsWithData.map((product: any) => (
            <Voucher key={product.productslug} data={product} price={false} />
          ))}
        </VoucherSkleton>
        <Separator className="mt-1" />
        <div className="w-full p-1 py-2 flex justify-between items-center">
          <p>Total: $ {order.total_amt}</p>
          <Button onClick={() => router.push(`/orders/${order.transactionuid}`)}>Details</Button>
        </div>
      </AccordionContent>
    </>
  );
};

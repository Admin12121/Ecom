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
import { ChevronDown, MapPin, ShoppingCart, Truck } from "lucide-react";
import Voucher, {
  VoucherSkleton,
} from "../../../checkout/[transitionuid]/_components/voucher";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  variants: Array<{ id: string }>;
  categoryname: string;
  description: string;
  images: string[];
  product_name: string;
  productslug: string;
}

interface CartItem {
  product: string;
  variant: string;
  categoryname?: string;
  description?: string;
  images?: string[];
  product_name?: string;
  productslug?: string;
  qty:number;
}

interface OrderData {
  products: CartItem[];
  status: string;
  created: string;
  shipping: {
    city: string;
    country: string;
  };
  total_amt: number;
  transactionuid: string;
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
    pending: { varaint: "warning", color: "orange", label: "Pending" },
    verified: { varaint: "warning", color: "blue", label: "Verified" },
    proceed: { color: "blue", label: "Proceed" },
    packed: { color: "blue", label: "Packed" },
    delivered: { varaint: "success", color: "green", label: "Delivered" },
    successful: { varaint: "success", color: "green", label: "Successful" },
    cancled: { varaint: "danger", color: "red", label: "Canceled" },
  };

  const { varaint, color, label } = statusMap[status] || {
    varaint: "default",
    color: "gray",
    label: "Unknown",
  };
  return (
    <Badge variant={varaint} className={`relative border-0 gap-1`}>
      <span
        className={`animate-ping absolute inline-flex h-2 w-2  rounded-full bg-${color}-500`}
      ></span>
      <span
        className={`inline-flex h-2 w-2 right-0 top-0 rounded-full bg-${color}-500`}
      ></span>
      {label}
    </Badge>
  );
};

export const OnShipping = ({ data }: { data: OrderData[] }) => {
    const productIds = useMemo(() => {
      const ids = new Set<string>();
      data.forEach(order => order.products.forEach(item => ids.add(item.product)));
      return Array.from(ids);
    }, [data]);
  
    const { data: products, isLoading } = useProductsByIdsQuery(
      { ids: productIds },
      { skip: productIds.length === 0 }
    );
  
    const getCartItemsWithDetails = useCallback(() => {
      if (!products) return [];
      return data.flatMap(order =>
        order.products.map(cartItem => {
          const product = products.results.find((p: Product) => p.id === cartItem.product);
          if (!product) return null;
  
          const variantDetails = Array.isArray(product.variants)
            ? product.variants.find((v:any) => v.id === cartItem.variant)
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
        })
      ).filter(item => item !== null);
    }, [products, data]);
  
    const truncateText = useCallback((text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    }, []);
  
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };
  
    const calculateEstimatedArrival = (created: string, daysToAdd: number): string => {
      const createdDate = new Date(created);
      createdDate.setDate(createdDate.getDate() + daysToAdd);
      return formatDate(createdDate);
    };
  
    const productsWithData = useMemo(() => getCartItemsWithDetails(), [getCartItemsWithDetails]);

    return (
      <div className="w-full h-full flex gap-2">
        <Accordion type="single" collapsible className="space-y-1 w-full">
          {data.map((order: OrderData) => (
            <AccordionItem
              key={order.transactionuid}
              value={`address`}
              className="rounded-lg shadow-none bg-white dark:bg-neutral-900 transition-all w-full"
            >
              <AccordionTrigger
                icon={<></>}
                className="text-left hover:no-underline p-0 w-full lg:min-w-[450px] bg-white dark:bg-neutral-900/50"
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
                          Estimated arrival: {calculateEstimatedArrival(order.created, 7)}
                        </p>
                      </span>
                      <RightIcon className="dark:fill-white/70 dark:stroke-white/70 stroke-neutral-700 hidden lg:flex" />
                    </span>
                    <span className="p-2 border-1 rounded-xl">
                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {order.shipping.city}, {order.shipping.country}
                      </p>
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <VoucherSkleton loading={isLoading}>
                  {productsWithData.map((product: any) => (
                    <Voucher key={product.productslug} data={product} price={false}/>
                  ))}
                </VoucherSkleton>
                <Separator className="mt-1"/>
                <div className="w-full p-1 py-2 flex justify-between items-center">
                    <p>Total: $ {order.total_amt}</p>
                    <Button>
                      Details
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };
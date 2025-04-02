"use client";
import React, { useCallback, useDeferredValue, useMemo } from "react";
import {
  useSalesRetrieveQuery,
  useProductsByIdsQuery,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { MapPin, ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LeftIcon, RightIcon } from "../../_components/icons";
import Voucher from "@/app/(app)/(user)/checkout/[transitionuid]/_components/voucher";
import { VoucherSkleton } from "@/app/(app)/(user)/checkout/[transitionuid]/_components/voucher";
import { Separator } from "@/components/ui/separator";
import { useDecryptedData } from "@/hooks/dec-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Complete_payment from "./complete_payment";

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
  id: number;
  price: number;
  qty: number;
  total: number;
  transition: number;
  product: string;
  variant: string;
  categoryname?: string;
  description?: string;
  images?: string;
  product_name?: string;
  productslug?: string;
}

export interface Order {
  id: number;
  products: CartItem[];
  costumer_name: string;
  transactionuid: string;
  status: string;
  total_amt: number;
  sub_total: number;
  shipping: {
    city: string;
    country: string;
  };
  discount: number;
  payment_method: string;
  redeem_data: any;
  payment_intent_id: any;
  created: string;
  updated_at: string;
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
    unpaid: { varaint: "secondary", color: "bg-neutral-500", label: "Unpaid" },
    cancelled: { varaint: "danger", color: "bg-red-500", label: "Cancelled" },
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

const OrderRetrieve = ({ transactionuid }: { transactionuid: string }) => {
  const { accessToken } = useAuthUser();
  const { data: encryptedData, isLoading } = useSalesRetrieveQuery(
    { transactionuid, token: accessToken },
    { skip: !accessToken }
  );
  const { data, loading } = useDecryptedData(encryptedData, isLoading);
  return (
    <PageSkeleton loading={loading}>
      {data && <ProductCard data={data} />}
    </PageSkeleton>
  );
};

const ProductCard = ({ data }: { data: Order }) => {
  const productIds = useMemo(() => {
    return data?.products.map((item: CartItem) => item.product);
  }, [data]);

  const { data: products, isLoading } = useProductsByIdsQuery(
    { ids: productIds },
    { skip: !productIds || productIds.length === 0 }
  );

  const productsWithData = useMemo(() => {
    if (!products) return [];
    return data?.products.map((cartItem: CartItem) => {
      const product = products.results.find(
        (p: Product) => p.id === cartItem.product
      );
      const variantDetails = Array.isArray(product.variants)
        ? product.variants.find((v: any) => v.id === cartItem.variant)
        : product.variants;

      return {
        ...cartItem,
        pcs: cartItem.qty,
        price: cartItem.price,
        categoryname: product.categoryname,
        description: product.description,
        images: product.images,
        product_name: product.product_name,
        productslug: product.productslug,
        variantDetails: variantDetails || {},
      };
    });
  }, [products, data]);

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
    <div className="text-left hover:no-underline p-0 w-full lg:min-w-[450px] bg-white dark:bg-neutral-900/50 rounded-lg">
      <div className="flex w-full rounded-lg p-1 flex-col">
        <div className="w-full p-2 flex justify-between items-center rounded-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="flex gap-1">
                  <ShoppingCart className="w-5 h-5" />{" "}
                  {truncateText(data.transactionuid, 15)}
                </h1>
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.transactionuid}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {renderBadge(data?.status)}
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
              {data.status === "unpaid"
                ? "Complete Payment within 24 hrs"
                : data.status === "successful" || data.status === "delivered"
                ? "Delivered Successfully"
                : data.status === "cancelled"
                ? "Cancelled"
                : `Estimated arrival: ${calculateEstimatedArrival( data?.created, 7 )}`}
              </p>
            </span>
            <RightIcon className="dark:fill-white/70 dark:stroke-white/70 stroke-neutral-700 hidden lg:flex" />
          </span>
          <span className="p-2 border-1 rounded-xl">
            <p className="text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data?.shipping?.city}, {data?.shipping?.country}
            </p>
          </span>
        </div>
      </div>
      <div className="p-2 pb-0 flex gap-2 flex-col relative">
        <VoucherSkleton loading={isLoading}>
          {productsWithData.map((product: any) => (
            <Voucher key={product.productslug} data={product} price={false} />
          ))}
        </VoucherSkleton>
        <Separator className="mt-1 bg-[hsl(var(--custombg))] h-[2px] relative before:absolute before:w-5 before:h-5 before:bg-[hsl(var(--custombg))] before:rounded-full before:-left-5 before:-bottom-2.5 after:absolute after:w-5 after:h-5 after:bg-[hsl(var(--custombg))] after:rounded-full after:-right-5 after:-bottom-2.5" />
        <div className="w-full flex justify-between items-center">
          <div className="w-full p-1 pb-2 gap-2 flex items-center">
            <p>Total :</p>{" "}
            {data.discount > 0 && (
              <p>
                {data.payment_method == "Esewa" ? "रु" : "$"} {data?.total_amt}
              </p>
            )}{" "}
            <p
              className={cn(
                data?.discount > 0 && "line-through text-neutral-950/50"
              )}
            >
              {data.payment_method == "Esewa" ? "रु" : "$"} {data?.sub_total}
            </p>
          </div>
          {data.status === "unpaid" && (
            <Complete_payment
              total_amt={data.total_amt}
              transaction_uid={data.transactionuid}
              status={data.payment_method}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <section className="w-full min-w-[350px] p-1 h-full flex flex-col gap-1 rounded-lg">
      <div className="w-full animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[390px] rounded-lg"></div>
    </section>
  );
};

export const PageSkeleton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  const load = useDeferredValue(loading);
  if (load) {
    return (
      <>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </>
    );
  }
  return <>{children}</>;
};

export default OrderRetrieve;

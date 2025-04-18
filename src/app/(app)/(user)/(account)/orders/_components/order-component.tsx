import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { LeftIcon, RightIcon } from "./icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, ShoppingCart, Truck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Order as OrderData } from ".";
import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import Spinner from "@/components/ui/spinner";
import InfiniteScroll from "@/components/global/infinite-scroll";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { renderBadge } from "@/components/global/renderBadge";


export const OrderComponent = ({
  data,
  loadMore,
  hasMore,
  loading,
}: {
  data: OrderData[];
  loadMore: any;
  hasMore: boolean;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex gap-2">
      {data.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-1 w-full">
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            className="space-y-1 w-full"
          >
            {data.map((order: OrderData) => (
              <AccordionItem
                key={order.transactionuid}
                value={order.transactionuid}
                className="rounded-lg shadow-none bg-white dark:bg-neutral-900 transition-all w-full"
              >
                <OrderDetails order={order} />
              </AccordionItem>
            ))}
          </InfiniteScroll>
        </Accordion>
      ) : (
        <div className="flex flex-col w-full h-[50dvh] gap-2 items-center justify-center">
          <h1>Your Order list is empty</h1>
          <p className="text-sm text-neutral-500">
            Start by exploring out Productsa and great deals!
          </p>
          <Button>Continue Shopping</Button>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ order }: { order: OrderData }) => {
  const router = useRouter();
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
    <AccordionTrigger
      icon={<></>}
      className="text-left hover:no-underline p-0 w-full lg:min-w-[450px] bg-white dark:bg-neutral-900/50 rounded-lg"
    >
      <div className="flex w-full rounded-lg p-1 flex-col">
        <div className="w-full p-2 flex justify-between items-center rounded-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="flex gap-1">
                  <ShoppingCart className="w-5 h-5" />{" "}
                  {truncateText(order.transactionuid, 15)}
                </h1>
              </TooltipTrigger>
              <TooltipContent>
                <p>{order.transactionuid}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                {order.status === "unpaid"
                  ? "Complete Payment within 24 hrs"
                  : order.status === "successful" ||
                    order.status === "delivered"
                  ? "Delivered Successfully"
                  : order.status === "cancelled"
                  ? "Cancelled"
                  : `Estimated arrival: ${calculateEstimatedArrival(
                      order?.created,
                      7
                    )}`}
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
        <div className="w-full p-2 flex justify-between items-center">
          <p>
            Total: {order.payment_method == "Esewa" ? "रु" : "$"}{" "}
            {order.total_amt}
          </p>
          <span
            className={cn(buttonVariants({ variant: "default" }))}
            onClick={() => router.push(`/orders/${order.transactionuid}`)}
          >
            Details
          </span>
        </div>
      </div>
    </AccordionTrigger>
  );
};

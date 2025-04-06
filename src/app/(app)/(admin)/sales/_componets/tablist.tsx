"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useGetOrdersQuery, useUpdateSaleMutation } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const Orders = ({ deferredSearch }: { deferredSearch?: string }) => {
  const { accessToken } = useAuthUser();
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sales, setSales] = useState<Order[]>([]);
  const [updateSale] = useUpdateSaleMutation();
  const { data, isLoading: loading, refetch } = useGetOrdersQuery(
    { token: accessToken, status: status, page: page, search: deferredSearch },
    { skip: !accessToken }
  );

  useEffect(() => {
    if (data) {
      setSales((prev) =>
        page === 1 ? data.results : [...(prev || []), ...data.results]
      );
      setHasMore(Boolean(data.next));
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(page + 1);
    }
  }, [hasMore, loading, page]);

  const switchTab = (value: string) => {
    setStatus(value);
    setSales([]);
    setPage(1);
  };

  const handleUpdateSale = async (id: number, status: string) => {
    const toastId = toast.loading(
      `Updating status for order ${id} to ${status}`,
      {
        position: "top-center",
      }
    );
    await delay(500);
    const actualData = {
      id: id,
      status: status,
    };
    const res = await updateSale({ actualData, token:accessToken });
    if (res.data) {
      toast.success("Status updated successfully", {
        id: toastId,
        position: "top-center",
      });
      refetch();
    } else {
      toast.error("Failed to update status", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <section className="w-full min-h-[calc(100dvh_-_145px)] flex flex-col">
      <Tabs
        defaultValue="all"
        value={status}
        onValueChange={(value) => switchTab(value)}
        className="w-full min-h-[60dvh] mb-10"
      >
        <TabsList className="w-full overflow-hidden overflow-x-auto justify-start md:justify-center">
          <TabsTrigger className="w-full" value="all">
            All Orders
          </TabsTrigger>
          <TabsTrigger className="w-full" value="onshipping">
            Payment Verification
          </TabsTrigger>
          <TabsTrigger className="w-full" value="arrived">
            Arrived
          </TabsTrigger>
          <TabsTrigger className="w-full" value="delivered">
            Delivered
          </TabsTrigger>
          <TabsTrigger className="w-full" value="canceled">
            Cancelled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="w-full h-full">
          <OrderComponent
            data={sales}
            handleUpdateSale={handleUpdateSale}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
            />
        </TabsContent>
        <TabsContent value="onshipping" className="w-full h-full">
          <OrderComponent
            data={sales}
            handleUpdateSale={handleUpdateSale}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
            />
        </TabsContent>
        <TabsContent value="arrived" className="w-full h-full">
          <OrderComponent
            data={sales}
            handleUpdateSale={handleUpdateSale}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
            />
        </TabsContent>
        <TabsContent value="delivered" className="w-full h-full">
          <OrderComponent
            handleUpdateSale={handleUpdateSale}
            data={sales}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
            />
        </TabsContent>
        <TabsContent value="canceled" className="w-full h-full">
          <OrderComponent
            data={sales}
            handleUpdateSale={handleUpdateSale}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EllipsisIcon, MapPin, ShoppingCart, Truck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, delay } from "@/lib/utils";
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
import { toast } from "sonner";

const OrderComponent = ({
  data,
  handleUpdateSale,
  loadMore,
  hasMore,
  loading,
}: {
  data: Order[];
  handleUpdateSale: (id: number, status: string) => Promise<void>;
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
            {data.map((order: Order) => (
              <AccordionItem
                key={order.transactionuid}
                value={order.transactionuid}
                className="rounded-lg shadow-none bg-white dark:bg-neutral-900 transition-all w-full"
              >
                <OrderDetails order={order} handleUpdateSale={handleUpdateSale}/>
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

const OrderDetails = ({ order, handleUpdateSale }: { order: Order,   handleUpdateSale: (id: number, status: string) => Promise<void>; }) => {
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
          <div className="flex items-center gap-2 justify-center">
            {renderBadge(order.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span
                  role="button"
                  tabIndex={order.status === "cancelled" ? -1 : 0}
                  className={cn(
                    "cursor-pointer p-2 rounded-lg hover:bg-muted",
                    order.status === "cancelled" &&
                      "cursor-not-allowed opacity-50"
                  )}
                >
                  <EllipsisIcon size={16} aria-hidden="true" />
                </span>
              </DropdownMenuTrigger>
              {(() => {
                const statusFlow = [
                  "unpaid",
                  "pending",
                  "verified",
                  "proceed",
                  "packed",
                  "delivered",
                  "successful",
                ];

                const currentIndex = statusFlow.indexOf(order.status);
                if (["cancelled", "successful"].includes(order.status))
                  return null;

                const isInitialPhase = currentIndex <= 2;
                const options = isInitialPhase
                  ? ["unpaid", "pending", "verified", "cancelled"].filter(
                      (s) => s !== order.status
                    )
                  : statusFlow.slice(currentIndex + 1);

                const getStatusLabel = (s: string) =>
                  s.charAt(0).toUpperCase() + s.slice(1);

                return (
                  <DropdownMenuContent>
                    {options.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleUpdateSale(order.id, status)}
                      >
                        {getStatusLabel(status)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                );
              })()}
            </DropdownMenu>
          </div>
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
            onClick={() => router.push(`/sales/${order.transactionuid}`)}
          >
            Details
          </span>
        </div>
      </div>
    </AccordionTrigger>
  );
};

const LeftIcon = ({ ...props }) => {
  return (
    <svg width="100" height="20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="5" />
      <line
        x1="20"
        y1="10"
        x2="80"
        y2="10"
        strokeWidth="2.5"
        strokeDasharray="5,5"
      />
      <line
        x1="80"
        y1="10"
        x2="90"
        y2="10"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
    </svg>
  );
};

const RightIcon = ({ ...props }) => {
  return (
    <svg width="150" height="40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line
        x1="20"
        y1="20"
        x2="10"
        y2="20"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <line
        x1="25"
        y1="20"
        x2="70"
        y2="20"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <path d="M75,15 L85,20 L75,25 L77,20 L75,15 Z" />
    </svg>
  );
};

export default Orders;

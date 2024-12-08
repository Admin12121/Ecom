"use client";
import React, {
  useState,
  DragEvent,
  useCallback,
  useDeferredValue,
} from "react";
import { Badge, BadgeCheck, Search, Truck } from "lucide-react";
import { motion, PanInfo } from "framer-motion";
import { cn, delay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetOrdersQuery,
  useUpdateSaleMutation,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Input } from "@/components/ui/input";
import Kbd from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { FaceIcon } from "@radix-ui/react-icons";

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

export default function SalesManagementKanban() {
  const { accessToken } = useAuthUser();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const {
    data: onShippingOrders,
    refetch: refetchOnShipping,
    isLoading: isLoadingOnShipping,
  } = useGetOrdersQuery(
    { token: accessToken, status: "onshipping", search: deferredSearch },
    { skip: !accessToken }
  );

  const {
    data: arrivedOrders,
    refetch: refetchArrived,
    isLoading: isLoadingArrived,
  } = useGetOrdersQuery(
    { token: accessToken, status: "arrived", search: deferredSearch },
    { skip: !accessToken }
  );

  const {
    data: deliveredOrders,
    refetch: refetchDelivered,
    isLoading: isLoadingDelivered,
  } = useGetOrdersQuery(
    { token: accessToken, status: "delivered", search: deferredSearch },
    { skip: !accessToken }
  );

  const {
    data: canceledOrders,
    refetch: refetchCanceled,
    isLoading: isLoadingCanceled,
  } = useGetOrdersQuery(
    { token: accessToken, status: "canceled", search: deferredSearch },
    { skip: !accessToken }
  );

  const refetchData = (type: string, multiple: boolean) => {
    switch (type) {
      case "onshipping":
        refetchOnShipping();
        if (multiple) refetchArrived();
        break;
      case "arrived":
        refetchArrived();
        if (multiple) refetchDelivered();
        break;
      case "delivered":
        refetchDelivered();
        break;
      case "canceled":
        refetchCanceled();
        if (multiple) {
          refetchOnShipping();
          refetchArrived();
        }
        break;
      default:
        console.warn(`Unknown refetch type: ${type}`);
    }
  };

  return (
    <main className="w-full h-full min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <span className="flex items-start justify-between gap-2 flex-col md:flex-row">
        <h1 className="text-2xl">Sales</h1>
        <div
          className={`relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg`}
        >
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className=" dark:bg-neutral-800 pl-8 border-0 focus:outline-none focus-visible:ring-0"
          />
          <Kbd
            keys={["command"]}
            className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
          ></Kbd>
        </div>
      </span>
      <div className="h-[calc(100dvh_-_120px)] w-full overflow-hidden">
        <div className="grid grid-cols-4 h-full w-full gap-3 px-6">
          <Column
            title="OnShipping"
            column="onshipping"
            headingColor="text-orange-400"
            headingBgColor="bg-orange-400"
            data={onShippingOrders}
            refetchData={refetchData}
            loading={isLoadingOnShipping}
          />
          <Column
            title="Arrived"
            column="arrived"
            headingColor="text-blue-400"
            headingBgColor="bg-blue-400"
            data={arrivedOrders}
            refetchData={refetchData}
            loading={isLoadingArrived}
          />
          <Column
            title="Delivered"
            column="delivered"
            headingColor="text-green-400"
            headingBgColor="bg-green-400"
            data={deliveredOrders}
            refetchData={refetchData}
            loading={isLoadingDelivered}
          />
          <Column
            title="Canceled"
            column="canceled"
            headingColor="text-red-400"
            headingBgColor="bg-red-400"
            data={canceledOrders}
            refetchData={refetchData}
            loading={isLoadingCanceled}
          />
        </div>
      </div>
    </main>
  );
}

type ColumnProps = {
  title: string;
  headingColor: string;
  headingBgColor: string;
  column: any;
  data: any;
  refetchData: (type: string, multiple: boolean) => void;
  loading: boolean;
};

const getStatusTransition = (
  currentIndex: number,
  targetIndex: number
): string | null => {
  if (currentIndex === 0 && targetIndex === 1) return "proceed";
  if (currentIndex === 1 && targetIndex === 2) return "delivered";
  if (
    (currentIndex === 0 && targetIndex === 3) ||
    (currentIndex === 1 && targetIndex === 3)
  )
    return "canceled";
  return null;
};

const Column = ({
  title,
  headingColor,
  headingBgColor,
  column,
  data,
  refetchData,
  loading,
}: ColumnProps) => {
  const { accessToken } = useAuthUser();
  const [updateSale] = useUpdateSaleMutation();

  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    const nonDraggableStatuses = ["pending", "proceed", "delivered"];
    if (nonDraggableStatuses.includes(card.status)) {
      toast.error("This order isn't verified yet", { position: "top-center" });
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData("cardId", card.id.toString());
    e.dataTransfer.setData("status", card.status);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    const status = e.dataTransfer.getData("status");
    setActive(false);
    clearHighlights();

    const columnOrder = ["onshipping", "arrived", "delivered", "canceled"];
    let currentColumnIndex = -1;
    switch (status) {
      case "pending":
      case "verified":
        currentColumnIndex = columnOrder.indexOf("onshipping");
        break;
      case "proceed":
      case "packed":
        currentColumnIndex = columnOrder.indexOf("arrived");
        break;
      case "delivered":
      case "successful":
        currentColumnIndex = columnOrder.indexOf("delivered");
        break;
      default:
        currentColumnIndex = columnOrder.indexOf(status);
    }
    const targetColumnIndex = columnOrder.indexOf(column);
    if (targetColumnIndex - currentColumnIndex > 1) {
      toast.error("Cannot Skip Process", { position: "top-center" });
    } else if (targetColumnIndex < currentColumnIndex) {
      toast.error("Reverse Process is not allowed", { position: "top-center" });
      return;
    }
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    if (!element) return;
    const transition = getStatusTransition(
      currentColumnIndex,
      targetColumnIndex
    );
    if (transition) {
      handleUpdateSale(parseInt(cardId), transition, currentColumnIndex, true);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleUpdateSale = async (
    id: number,
    status: string,
    currentStatus: number,
    type: boolean = false
  ) => {
    const columnOrder = ["onshipping", "arrived", "delivered", "canceled"];
    const currentColumn = columnOrder[currentStatus];
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
    const res = await updateSale({ actualData, token: accessToken });
    if (res.data) {
      toast.success("Status updated successfully", {
        id: toastId,
        position: "top-center",
      });
      refetchData(currentColumn, type);
    } else {
      toast.error("Failed to update status", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`font-medium flex gap-2 relative items-center px-2 ${headingColor}`}
        >
          <span
            className={cn(
              "animate-ping absolute inline-flex h-2 w-2  rounded-full ",
              headingBgColor
            )}
          ></span>
          <span
            className={cn(
              "inline-flex h-2 w-2 right-0 top-0 rounded-full ",
              headingBgColor
            )}
          ></span>
          {title}
        </h3>
        <span className="rounded text-sm text-neutral-400">{data?.count}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-[calc(100dvh_-_145px)] pb-10 w-full overflow-y-auto transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        <SalesSkeleton loading={loading}>
          {data?.results.length > 0 ? (
            data?.results.map((c: Order) => {
              return (
                <Card
                  key={c.id}
                  {...c}
                  handleDragStart={handleDragStart}
                  handleUpdateSale={handleUpdateSale}
                />
              );
            })
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-neutral-400 pt-10">No orders found</p>
            </div>
          )}
        </SalesSkeleton>
        <DropIndicator beforeId={null} column={column} />
        {data?.next && (
          <div className="w-full flex justify-center">
            <Button>Load more</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const statusMap: Record<string, boolean> = {
  pending: false,
  verified: true,
  proceed: false,
  packed: true,
  delivered: false,
  successful: true,
};

const relevantStatuses: Record<string, string[]> = {
  pending: ["pending"],
  verified: ["verified"],
  proceed: ["verified", "proceed"],
  packed: ["verified", "packed"],
  delivered: ["verified", "packed", "delivered"],
  successful: ["verified", "packed", "successful"],
};

type DragStartHandler = (e: DragEvent, card: CardType) => void;

const Card = ({
  transactionuid,
  id,
  status,
  total_amt,
  created,
  handleDragStart,
  handleUpdateSale,
}: Order & {
  handleDragStart: DragStartHandler;
  handleUpdateSale: any;
}) => {
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

  const handleMotionDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragEvent = event as unknown as DragEvent;
    handleDragStart(dragEvent, { transactionuid, id: id.toString(), status });
  };

  const getAchievedBadges = ({
    currentStatus,
    id,
  }: {
    currentStatus: string;
    id: number;
  }): JSX.Element[] => {
    const relevant = relevantStatuses[currentStatus] || [];

    const handleUpdate = () => {
      let state = "";
      let currentIndex = -1;
      switch (currentStatus) {
        case "pending":
          state = "verified";
          currentIndex = 0;
          break;
        case "proceed":
          state = "packed";
          currentIndex = 1;
          break;
        case "delivered":
          state = "successful";
          currentIndex = 2;
          break;
        default:
          toast.error("Not a valid state", { position: "top-center" });
          return;
      }
      handleUpdateSale(id, state, currentIndex);
    };

    return relevant.map((status) => {
      const isVerified = statusMap[status];
      return isVerified ? (
        <BadgeCheck className="w-4 h-4 stroke-blue-500 " key={status} />
      ) : (
        <Badge
          onClick={handleUpdate}
          className="w-4 h-4 stroke-orange-500 !cursor-pointer hover:fill-orange-500/40"
          key={status}
        />
      );
    });
  };

  return (
    <>
      <DropIndicator beforeId={id.toString()} column={status} />
      <motion.div
        layout
        layoutId={id.toString()}
        draggable="true"
        onDragStart={handleMotionDragStart}
        className="cursor-grab rounded-lg border border-neutral-700 bg-neutral-800 p-2 active:cursor-grabbing"
      >
        <span className="flex gap-2 items-center justify-between">
          <p className="text-sm text-neutral-100 flex items-center gap-1">
            <Truck className="w-4 h-4" />
            {truncateText(transactionuid, 15)}
          </p>
          <div className="flex gap-1">
            {getAchievedBadges({ currentStatus: status, id: id })}
          </div>
        </span>
        <p className="text-sm text-neutral-500 flex items-center gap-1 pt-2">
          Estimated arrival: {calculateEstimatedArrival(created, 7)}
        </p>
        <div className="w-full flex justify-between items-end">
          <p>Total: $ {total_amt}</p>
          <Button size="sm">Details</Button>
        </div>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const Skeleton = () => {
  return (
    <div className="w-full h-24 flex flex-col justify-between bg-neutral-700/40 mb-2 rounded-lg border border-neutral-700 p-1">
      <span className="flex gap-2">
        <span className="animate-pulse w-full h-10 rounded-lg bg-neutral-700/50"></span>
      </span>
      <span className="flex gap-2 justify-between">
        <span className="animate-pulse w-1/2 h-10 rounded-lg bg-neutral-700/50"></span>
        <span className="animate-pulse w-20 h-10 rounded-lg bg-neutral-700/50"></span>
      </span>
    </div>
  );
};

export const SalesSkeleton = ({
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
        {Array.from(
          { length: Math.floor(Math.random() * 4) + 1 },
          (_, index) => (
            <Skeleton key={index} />
          )
        )}
      </>
    );
  }
  return <>{children}</>;
};

type CardType = {
  transactionuid: string;
  id: string;
  status: any;
};

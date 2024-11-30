"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGetOrdersQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { OnShipping } from "./onshipping";

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

interface CategorizedOrders {
  onShipping: Order[];
  arrived: Order[];
  canceled: Order[];
  delivered: Order[];
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
        className={`animate-ping absolute inline-flex h-2 w-2  rounded-full bg-${color}-500 opacity-75`}
      ></span>
      <span
        className={` inline-flex h-2 w-2 right-0 top-0 rounded-full bg-${color}-500 opacity-75`}
      ></span>
      {label}
    </Badge>
  );
};

const Orders = () => {
  const { accessToken } = useAuthUser();
  const { data, isLoading, isFetching } = useGetOrdersQuery(
    { token: accessToken },
    { skip: !accessToken }
  );

  if (isLoading || isFetching) {
    return (
      <section className="w-full h-[calc(100vh_-_170px)] flex items-center justify-center">
        <p>Loading your orders...</p>
      </section>
    );
  }


  return (
    <section className="w-full h-[calc(100vh_-_170px)] flex flex-col">
      {!data ? (
        <span className="space-y-2">
          <h1 className="text-xl">Orders</h1>
          <p>Your account has no orders. Yet.</p>
          <Button>Shop Now</Button>
        </span>
      ) : (
        <MyOrders data={data} />
      )}
    </section>
  );
};

const MyOrders = ({ data }: { data: any }) => {

  function categorizeOrders(orders: Order[]): CategorizedOrders {
    const categorized: CategorizedOrders = {
      onShipping: [],
      arrived: [],
      canceled: [],
      delivered: [],
    };

    orders.forEach((order) => {
      switch (order.status) {
        case "pending":
        case "verified":
          categorized.onShipping.push(order);
          break;
        case "proceed":
        case "packed":
          categorized.arrived.push(order);
          break;
        case "cancled":
          categorized.canceled.push(order);
          break;
        case "delivered":
        case "successful":
          categorized.delivered.push(order);
          break;
        default:
          break;
      }
    });

    return categorized;
  }
  const categorizedOrders = categorizeOrders(data.results);

  return (
    <Tabs defaultValue="shipping" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="shipping">
          On Shipping
        </TabsTrigger>
        <TabsTrigger className="w-full" value="arrived">
          Arrived
        </TabsTrigger>
        <TabsTrigger className="w-full" value="cancled">
          Cancled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="shipping" className="w-full">
        {categorizedOrders.onShipping && <OnShipping data={categorizedOrders.onShipping} />}
      </TabsContent>
      <TabsContent value="arrived">
        <Arravied />
      </TabsContent>
      <TabsContent value="cancled">
        <Cancled />
      </TabsContent>
    </Tabs>
  );
};

const Arravied = () => {
  return <></>;
};

const Cancled = () => {
  return <></>;
};

export default Orders;

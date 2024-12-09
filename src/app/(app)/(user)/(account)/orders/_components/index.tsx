"use client";
import React from "react";
import { useGetOrdersQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderComponent } from "./order-component";

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

const Orders = () => {
  const { accessToken } = useAuthUser();
  const { data, isLoading, isFetching } = useGetOrdersQuery(
    { token: accessToken },
    { skip: !accessToken }
  );

  if (isLoading || isFetching) {
    return (
      <section className="w-full h-[calc(100dvh_-_145px)] flex items-center justify-center">
        <p>Loading your orders...</p>
      </section>
    );
  }

  return (
    <section className="w-full min-h-[calc(100dvh_-_145px)] flex flex-col">
      {data && <MyOrders data={data} />}
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
    <>
      <Tabs defaultValue="all" className="w-full min-h-[60dvh] mb-10">
        <TabsList className="w-full overflow-hidden overflow-x-auto justify-start md:justify-center">
          <TabsTrigger className="w-full" value="all">
            All
            <p className="ml-2 text-xs text-center bg-black text-white dark:bg-white w-4 h-4 rounded-full dark:text-black">
              {data.results.length}
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="shipping">
            On Shipping{" "}
            <p className="ml-2 text-xs text-center bg-black text-white dark:bg-white w-4 h-4 rounded-full dark:text-black">
              {categorizedOrders.onShipping.length}
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="arrived">
            Arrived
            <p className="ml-2 text-xs text-center bg-black text-white dark:bg-white w-4 h-4 rounded-full dark:text-black">
              {categorizedOrders.arrived.length}
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="delivered">
            Delivered
            <p className="ml-2 text-xs text-center bg-black text-white dark:bg-white w-4 h-4 rounded-full dark:text-black">
              {categorizedOrders.delivered.length}
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="cancled">
            Cancled
            <p className="ml-2 text-xs text-center bg-black text-white dark:bg-white w-4 h-4 rounded-full dark:text-black">
              {categorizedOrders.canceled.length}
            </p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="w-full h-full">
          <OrderComponent data={data?.results} />
        </TabsContent>
        <TabsContent value="shipping" className="w-full h-full">
          <OrderComponent data={categorizedOrders.onShipping} />
        </TabsContent>
        <TabsContent value="arrived" className="w-full h-full">
          <OrderComponent data={categorizedOrders.arrived} />
        </TabsContent>
        <TabsContent value="delivered" className="w-full h-full">
          <OrderComponent data={categorizedOrders.delivered} />
        </TabsContent>
        <TabsContent value="cancled" className="w-full h-full">
          <OrderComponent data={categorizedOrders.canceled} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Orders;

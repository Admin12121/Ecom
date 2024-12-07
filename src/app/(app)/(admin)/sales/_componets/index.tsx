"use client";
import React from "react";
import { CustomKanban } from "./text";
import { useGetOrdersQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";

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

export interface CategorizedOrders {
  onShipping: Order[];
  arrived: Order[];
  canceled: Order[];
  delivered: Order[];
}

const Sales = () => {
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
    <main className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <span className="flex justify-between items-center">
        <h1 className="text-2xl">Sales</h1>
      </span>
      <div>
        <CustomKanban data={categorizedOrders} />
      </div>
    </main>
  );
};

export default Sales;

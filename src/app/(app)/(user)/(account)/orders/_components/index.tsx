"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback } from "react";
import { useGetOrdersQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderComponent = dynamic(
  () => import("./order-component").then((mod) => mod.OrderComponent),
  { ssr: false }
);

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

const Orders = () => {
  const { accessToken } = useAuthUser();
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sales, setSales] = useState<Order[]>([]);
  const { data, isLoading:loading } = useGetOrdersQuery(
    { token: accessToken, status: status, page: page },
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

  const switchTab = (value:string) => {
    setStatus(value);
    setSales([]);
    setPage(1);
  }

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
          <OrderComponent data={sales} loadMore={loadMore} hasMore={hasMore} loading={loading}/>
        </TabsContent>
        <TabsContent value="onshipping" className="w-full h-full">
          <OrderComponent data={sales} loadMore={loadMore} hasMore={hasMore} loading={loading}/>
        </TabsContent>
        <TabsContent value="arrived" className="w-full h-full">
          <OrderComponent data={sales} loadMore={loadMore} hasMore={hasMore} loading={loading}/>
        </TabsContent>
        <TabsContent value="delivered" className="w-full h-full">
          <OrderComponent data={sales} loadMore={loadMore} hasMore={hasMore} loading={loading}/>
        </TabsContent>
        <TabsContent value="canceled" className="w-full h-full">
          <OrderComponent data={sales} loadMore={loadMore} hasMore={hasMore} loading={loading}/>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Orders;

import { Button } from "@/components/ui/button";
import React from "react";

const Orders = () => {
  return (
    <section className="w-full h-[calc(100vh_-_170px)] flex items-center justify-center flex-col">
      <span className="space-y-2">
        <h1 className="text-xl">Orders</h1>
        <p>Your account has no orders. Yet.</p>
        <Button>Shop Now</Button>
      </span>
    </section>
  );
};

export default Orders;

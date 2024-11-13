import React from "react";
import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProductNotFound = () => {
  const router = useRouter();
  return (
    <div className="lg:col-span-3 md:col-span-2 flex flex-col items-center justify-center gap-y-16 h-screen w-screen">
      <Empty />
      <span className="flex flex-col gap-5 items-center ">
        <h1 className="font-semibold text-4xl">Product not Found</h1>
        <Button
          className="flex gap-3 text-themeTextGray border-0"
          onClick={() => router.push("/collections")}
        >
          Back to Collactions
        </Button>
      </span>
    </div>
  );
};

export default ProductNotFound;

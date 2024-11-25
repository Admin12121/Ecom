"use client";
import React, { useState, useEffect } from "react";
import { getWishlist } from "@/lib/utils";
import { useProductsByIdsQuery } from "@/lib/store/Service/User_Auth_Api";
import { ProductCard, ProductSkeleton } from "@/components/global/product-card";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { OctagonAlert } from "lucide-react";
import { authUser } from "@/hooks/use-auth-user";
import { RecommendedProducts } from "../../collections/_components";

const WishList = () => {
  const { status } = authUser();
  const wishlist = getWishlist();
  const [products, SetProducts] = useState<Product[] | null>([]);
  const { data, isLoading, refetch } = useProductsByIdsQuery(
    { ids: wishlist, all:true },
    { skip: wishlist.length === 0 }
  );
  useEffect(() => {
    SetProducts(data?.results);
  }, [data]);

  return (
    <div className="pt-3 px-1 lg:px-14 flex gap-3 flex-col pb-10">
      {!status && (
        <span className="flex items-end justify-end gap-3 flex-col md:flex-row">
          <Code className="flex gap-2 h-9 text-sm items-center bg-neutral-200 dark:bg-neutral-900 rounded-md">
            <OctagonAlert className="w-4 h-4"/>
            <p>Login and save your wishlist forever</p>
          </Code>
          <Button>login</Button>
        </span>
      )}
      <h1 className="text-3xl">Wishlist</h1>
      <div className="mt-14 flex flex-col gap-1">
        {products && products.length > 0 && (
          <p className="text-sm text-neutral-600 dark:text-themeTextGray">
            {products?.length} products
          </p>
        )}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none`}
        >
          <ProductSkeleton loading={isLoading}>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
                >
                  <ProductCard data={product} />
                </div>
              ))
            ) : (
              <div className="flex w-screen h-full flex-col gap-3 justify-center items-start">
                <span>
                  <p className="text-themeTextWhite text-lg">
                    An empty wishlist? Bold move.
                  </p>
                  <p className="text-themeTextGray text-sm">
                    Great deals are calling your name.
                  </p>
                </span>
                <Button>Shop Now</Button>
              </div>
            )}
          </ProductSkeleton>
        </div>
      </div>
      {products && products.length > 0 && <RecommendedProducts className="!px-0" base="w-[98dvw]"/>}
    </div>
  );
};

export default WishList;

"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { ProductCard, ProductSkeleton } from "@/components/global/product-card";

const Category = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { data, isLoading, refetch } = useProductsViewQuery({ category });
  const [products, SetProducts] = useState<Product[] | null>([]);
  const [filters, setFilters] = useState<boolean>(false);

  useEffect(() => {
    SetProducts(data?.results);
  }, [data]);

  const Products = ({
    products,
    loading,
  }: {
    products: Product[] | null;
    loading: boolean;
  }) => {
    if (loading) {
      return Array.from({ length: 4 }, (_, index) => (
        <ProductSkeleton key={index} />
      ));
    }

    return (
      <>
        {products &&
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
              >
                <ProductCard data={product} />
              </div>
            );
          })}
      </>
    );
  };

  return (
    <span className="flex justify-between max-md:flex-col-reverse ">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none`}
      >
        <Products products={products} loading={isLoading} />
      </div>
      {filters && (
        <div className="w-[500px] p-[10px] max-md:w-full max-md:top-[120px] max-md:z-50">
          <span className="flex w-full rounded-md sticky top-[130px] h-[82vh] max-md:bg-neutral-950 ">
            {/* <Sidebar/> */}
          </span>
        </div>
      )}
    </span>
  );
};

export default Category;

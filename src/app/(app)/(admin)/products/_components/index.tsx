"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  useProductsViewQuery,
} from "@/lib/store/Service/User_Auth_Api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { ProductCard, ProductSkeleton } from "@/components/global/admin-productcard";

const FeatureProduct = dynamic(
  () => import("@/components/global/feature-product"),
  { ssr: false }
);

const ProductPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const { data, isLoading, refetch } = useProductsViewQuery({
    category,
    search,
  });
  const [products, SetProducts] = useState<Product[] | null>([]);
  const [filters, setFilters] = useState<boolean>(false);

  useEffect(() => {
    SetProducts(data?.results);
  }, [data]);

  return (
    <>
      <section className="flex flex-col gap-5 pt-5">
        {search && (
          <span className="">
            <p className="text-neutral-600 dark:text-themeTextGray ">
              Search results for
            </p>
            <h1 className="text-3xl font-bold text-neutral-700 dark:text-themeTextWhite">
              {search}
            </h1>
          </span>
        )}
        <div className="flex flex-col gap-1">
          <span>
            <p className="text-sm text-neutral-600 dark:text-themeTextGray">
              {products?.length} products
            </p>
          </span>
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
                <div className="flex w-screen h-full ">
                  <p className="text-themeTextGray">
                    No results found. Please try searching with a different
                    term.
                  </p>
                </div>
              )}
            </ProductSkeleton>
          </div>
        </div>
        {filters && (
          <div className="w-[500px] p-[10px] max-md:w-full max-md:top-[120px] max-md:z-50">
            <span className="flex w-full rounded-md sticky top-[130px] h-[82vh] max-md:bg-neutral-950 ">
              {/* <Sidebar/> */}
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductPage;

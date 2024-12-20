"use client";

import React, { useState, useEffect } from "react";
import { useProductsViewQuery } from "@/lib/store/Service/api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import {
  ProductCard,
  ProductSkeleton,
} from "@/components/global/admin-productcard";
import InfiniteScroll from "@/components/global/infinite-scroll";
import { useAuthUser } from "@/hooks/use-auth-user";


const ProductPage = () => {
  const { accessToken } = useAuthUser();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { data, isLoading } = useProductsViewQuery(
    {
      page,
      category,
      search,
      token: accessToken,
    },
    { skip: !accessToken }
  );

  const [products, SetProducts] = useState<Product[] | null>([]);
  useEffect(() => {
    if (page === 1) {
      SetProducts(data?.results);
      setHasMore(data?.next ? true : false);
    } else {
      SetProducts((prev) => [...(prev || []), ...(data?.results || [])]);
    }
  }, [data]);

  const loadMoreProducts = () => {
    if (data?.next) {
      setPage(page + 1);
      setHasMore(data?.next ? true : false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-5 pb-5">
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
              {data?.count} products
            </p>
          </span>
          <InfiniteScroll
            loading={isLoading}
            hasMore={hasMore}
            loadMore={loadMoreProducts}
          >
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
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export default ProductPage;

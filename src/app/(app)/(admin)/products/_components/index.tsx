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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Kbd from "@/components/ui/kbd";

const ProductPage = () => {
  const { accessToken } = useAuthUser();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [search, setSearch] = useState("");
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
        <div className="flex flex-col gap-1">
          <span className="flex flex-col md:flex-row md:justify-between gap-1">
            <p className="text-sm text-neutral-600 dark:text-themeTextGray">
              {data?.count} products
            </p>
            <div
              className={`relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg`}
            >
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className=" dark:bg-neutral-800 pl-8 border-0 focus:outline-none focus-visible:ring-0"
              />
              <Kbd
                keys={["command"]}
                className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
              ></Kbd>
            </div>
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

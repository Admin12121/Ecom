"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  useProductsViewQuery,
  useTrendingProductsViewQuery,
} from "@/lib/store/Service/api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { ProductCard, ProductSkeleton } from "@/components/global/product-card";
import InfiniteScroll from "@/components/global/infinite-scroll";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Sidebar from "./sidebar";

const FeatureProduct = dynamic(
  () => import("@/components/global/feature-product"),
  { ssr: false }
);

const CollectionPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [products, SetProducts] = useState<Product[] | null>([]);
  const [filters, setFilters] = useState<boolean>(false);
  const { data, isLoading } = useProductsViewQuery({
    category,
    search,
    page,
  });

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
      <section className="flex flex-col gap-5 pt-5 w-full">
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
        <div className="flex flex-col gap-2">
          <span className="flex justify-between items-center w-full">
            <p className="text-sm text-neutral-600 dark:text-themeTextGray">
              {data?.count} products
            </p>
            <div
              className="space-y-2 flex gap-3 items-center"
              style={{ "--ring": "270 66.67% 47.06%" } as React.CSSProperties}
            >
              <Select defaultValue="s1">
                <SelectTrigger
                  customIcon={<Settings2 className="w-4 h-4" />}
                  id="select-19"
                  className="min-w-44"
                >
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">Best Selling</SelectItem>
                  <SelectItem value="s2">New In</SelectItem>
                  <SelectItem value="s3">Price: high to low</SelectItem>
                  <SelectItem value="s4">Price: low to high</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className={cn(
                  "!m-0 gap-2 min-w-[8rem] px-2",
                  filters &&
                    "ring-offset-2 ring-2 dark:ring-offset-background ring-purple-600/40 transition"
                )}
                onClick={() => setFilters(!filters)}
              >
                {filters ? "Hide" : "Show"} Filters{" "}
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>
          </span>
          <div className="flex gap-5 w-full">
            <InfiniteScroll
              loading={isLoading}
              hasMore={hasMore}
              loadMore={loadMoreProducts}
              className={cn(filters && "lg:w-[calc(100%-350px)]")}
            >
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none",
                  filters && "lg:grid-cols-2 xl:grid-cols-3"
                )}
              >
                <ProductSkeleton loading={isLoading}>
                  {products && products.length > 0 ? (
                    products.map((product, index) => (
                      <div
                        key={index}
                        className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
                      >
                        <ProductCard
                          data={product}
                          base={Math.random() >= 0.5}
                        />
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
            <div
              className={cn(
                "hidden w-[330px] max-md:w-full max-md:top-[120px] max-md:z-50 left-96 relative transition-all transform duration-500 ease-in-out",
                filters && "lg:flex left-0 opacity-100 translate-x-0",
                !filters && "translate-x-full"
              )}
            >
              <span className="flex w-full rounded-md sticky top-[70px] h-[82dvh] max-md:bg-neutral-950 ">
                <Sidebar />
              </span>
            </div>
          </div>
        </div>
      </section>
      <RecommendedProducts className="pb-14" />
    </>
  );
};

export const RecommendedProducts = ({
  className,
  base,
}: {
  className?: string;
  base?: string;
}) => {
  const { data, isLoading } = useTrendingProductsViewQuery({});
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  return (
    <FeatureProduct
      title="You may also like"
      className={className}
      base={base}
      products={products}
      loading={isLoading}
    />
  );
};

export default CollectionPage;

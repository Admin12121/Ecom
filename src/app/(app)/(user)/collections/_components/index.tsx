"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  useProductsViewQuery,
  useTrendingProductsViewQuery,
} from "@/lib/store/Service/api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import {
  ProductCard,
  ProductSkeleton,
  Skeleton,
} from "@/components/global/product-card";
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

interface State {
  [key: string]: string[] | number;
  metal: string[];
  type: string[];
  color: string[];
  size: string[];
  availability: string[];
  page: number;
  max_price: number;
  min_price: number;
}

const initialState: State = {
  metal: [],
  type: [],
  color: [],
  size: [],
  availability: [],
  page: 1,
  max_price: 0,
  min_price: 0,
};

type Action = 
  | { type: string; value: string | number }
  | { type: string; value: Array<{ type: string; value: string | number }> };

function reducer(state: State, action: Action): State {
  if (Array.isArray(action.value)) {
    return action.value.reduce((accState, { type, value }) => {
      return reducer(accState, { type, value });
    }, state);
  }

  const { type, value } = action;
  if ((type === "page" || type === "min_price" || type === "max_price") && typeof value === "number") {
    return {
      ...state,
      [type]: value,
    };
  }
  if (type in state && Array.isArray(state[type])) {
    return {
      ...state,
      [type]: (state[type] as string[]).includes(value as string)
        ? (state[type] as string[]).filter((item) => item !== value)
        : [...(state[type] as string[]), value as string],
    };
  }
  return state;
}

const CollectionPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState<Product[] | null>([]);
  const [filter, setFilter] = useState("bestselling");
  const [filters, setFilters] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading } = useProductsViewQuery({
    category: category,
    search,
    filter,
    metal: state.metal,
    type: state.type,
    size: state.size,
    stock: state.availability,
    color: state.color,
    page: state.page,
    max_price: state.max_price,
    min_price: state.min_price,
  });

  useEffect(() => {
    if (data) {
      setProducts((prev) => (state.page === 1 ? data.results : [...prev || [], ...data.results]));
      setHasMore(Boolean(data.next));
      setLoading(false);
    }
  }, [data]);

  const loadMoreProducts = useCallback(() => {
    if (hasMore && !loading) {
      setLoading(true);
      dispatch({ type: "page", value: state.page + 1 });
    }
  }, [hasMore, loading, state.page]);

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
    dispatch({ type: "page", value: 1 });
  }, []);

  const handleClose = () => {
    setFilters(!filters);
  }

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
          <span className="flex gap-3 flex-col md:flex-row justify-between md:items-center w-full">
            <p className="text-sm text-neutral-600 dark:text-themeTextGray">
              {data?.count} products
            </p>
            <div
              className="space-y-2 flex gap-3 md:items-center flex-col md:flex-row"
              style={{ "--ring": "270 66.67% 47.06%" } as React.CSSProperties}
            >
              <Select
                defaultValue="bestselling"
                value={filter}
                onValueChange={handleFilterChange}
              >
                <SelectTrigger
                  customIcon={<Settings2 className="w-4 h-4" />}
                  id="select-19"
                  className="md:min-w-44"
                >
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                  <SelectItem value="newin">New In</SelectItem>
                  <SelectItem value="hightolow">Price: high to low</SelectItem>
                  <SelectItem value="lowtohigh">Price: low to high</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className={cn(
                  "!m-0 gap-2 min-w-[8rem] px-3 flex !justify-between w-full",
                  filters &&
                    "ring-offset-2 ring-2 dark:ring-offset-background ring-purple-600/40 transition "
                )}
                onClick={handleClose}
              >
                {filters ? "Hide" : "Show"} Filters{" "}
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>
          </span>
          <div className="flex gap-5 w-full">
            <InfiniteScroll
              loading={loading}
              hasMore={hasMore}
              loadMore={loadMoreProducts}
              className={cn(filters && "lg:w-[calc(100%-350px)]", " w-full")}
            >
              <ProductSkeleton loading={isLoading}>
                {products && products.length > 0 ? (
                  <div
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none",
                      filters && "lg:grid-cols-2 xl:grid-cols-3",
                      loading || isLoading && "pointer-events-none opacity-50 blur-sm"
                    )}
                  >
                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
                      >
                        <ProductCard
                          data={product}
                          base={Math.random() >= 0.5}
                        />
                      </div>
                    ))}
                    {loading && Array.from({ length: 4 }, (_, index) => (
                      <Skeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="flex w-screen h-full ">
                    <p className="text-themeTextGray">
                      No results found. Please try searching with a different
                      term.
                    </p>
                  </div>
                )}
              </ProductSkeleton>
            </InfiniteScroll>
            <div
              className={cn(
                "hidden lg:w-[330px] max-md:w-full left-96 relative transition-all transform duration-500 ease-in-out",
                filters && "flex absolute lg:relative top-0 left-0 opacity-100 z-50 lg:z-0 w-full lg:translate-x-0",
                !filters && "translate-x-full"
              )}
            >
              <span className={cn("flex w-full rounded-lg sticky top-[70px] lg:h-[82dvh] ",
                "max-w-[95rem] h-[100dvh] p-2 lg:p-0"
              )}>
                <Sidebar state={state} dispatch={dispatch} handleClose={handleClose}/>
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

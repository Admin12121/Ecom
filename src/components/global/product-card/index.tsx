"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUpdateQueryParams } from "@/lib/query-params";
import React, { useState, useEffect, useMemo } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import { Star as FaStar } from "lucide-react";

import {
  Product,
  VariantObject,
  Image as InterfaceImage,
} from "@/types/product";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import WishList from "../wishlist-button";
import Cartbutton from "./cart-button";


interface ProductCardProps {
  data: Product;
  width?: string | null;
  base?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  data,
  width,
  base,
}) => {
  const { convertPrice } = useAuth();
  const updateQueryParams = useUpdateQueryParams();
  const [variantsData, setVariantsData] = useState<
    VariantObject[] | VariantObject | null
  >(null);
  const [selectedSize, setSelectedSize] = useState<{
    id: number;
    size: string | null;
  } | null>(null);

  useEffect(() => {
    if (data?.variants && Array.isArray(data.variants)) {
      const variants = data.variants;
      const sortedVariants = [...variants].sort(
        (a, b) => Number(a.size) - Number(b.size)
      );
      setVariantsData(sortedVariants);
      if (sortedVariants.length > 0) {
        setSelectedSize({
          id: sortedVariants[0].id,
          size: sortedVariants[0].size,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.variants) {
      setVariantsData(data.variants);
      if (!Array.isArray(data.variants)) {
        setSelectedSize({
          id: data.variants.id,
          size: data.variants.size,
        });
      }
    }
  }, [data]);

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      const variant = variantsData.find((variant) => variant.id === index);
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };

  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price", selectedSize?.id)
  );

  const discount = getVariantData(variantsData, "discount", selectedSize?.id);
  const stocks = getVariantData(variantsData, "stock", selectedSize?.id);

  const finalPrice = useMemo(() => {
    return convertedPrice - convertedPrice * (discount / 100);
  }, [convertedPrice, discount]);

  const productslug = data.productslug;

  const handleRoute = () => {
    updateQueryParams({ category: data?.categoryname }, "/collections");
  };

  return (
    <section className="relative w-full flex gap-5">
      <span
        className={cn(
          "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
          "bg-white dark:bg-neutral-950",
          "flex flex-col gap-1"
        )}
      >
        <span
          className={cn(
            `absolute z-10 px-3 top-3 flex justify-between items-center h-5 w-full`
          )}
        >
          {stocks === 0 ? (
            <span className="absolute -top-1 left-1 w-[80px] h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
              Out of stock
            </span>
          ) : (
            <>
              {data?.rating > 0 && (
                <span className="w-[50px] -top-1 left-1 h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
                  {data?.rating ? data?.rating : 0.0} <FaStar size={10} />
                </span>
              )}
              {discount > 0 && (
                <span className="absolute -top-1 left-1 w-[50px] h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1 font-semibold font-custom">
                  {discount}% Off
                </span>
              )}
            </>
          )}
          <span className="h-full flex text-xs items-center justify-center absolute right-2">
            {data.id && <WishList productId={data.id} />}
          </span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className={cn(`w-full h-[390px] rounded-lg`, width)}
        >
          {data &&
            data?.images &&
            data.images.map((data: InterfaceImage, index: number) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full left-0 top-0 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                  <Link href={`/collections/${productslug}`}>
                    <Image
                      src={data.image}
                      width={600}
                      height={600}
                      priority 
                      className=" w-full cursor-pointer h-[350px]  object-contain"
                      alt={productslug}
                      
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <span
          className={cn(
            "w-full h-[90px] flex flex-col rounded-lg p-3 py-2 justify-between  dark:bg-transparent",
            base
          )}
        >
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs text-slate-500" onClick={handleRoute}>
                {data.categoryname}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center gap-1">
            <span className={cn("flex", discount > 0 && " gap-2")}>
              <p className="text-sm">
                {discount > 0 && `${symbol} ${finalPrice}`}
              </p>
              <p
                className={cn(
                  "text-sm",
                  discount > 0 && "text-neutral-500 line-through"
                )}
              >
                {symbol} {convertedPrice}
              </p>
            </span>
            {variantsData && (
              <Cartbutton
                data={data.id}
                stocks={stocks}
                variantsData={variantsData}
                setSelectedSize={setSelectedSize}
                selectedSize={selectedSize}
                finalPrice={finalPrice}
                convertedPrice={convertedPrice}
                symbol={symbol}
              />
            )}
          </div>
        </span>
      </span>
    </section>
  );
};

export const Skeleton = () => {
  return (
    <section className="w-full min-w-[350px] p-1 h-full flex flex-col gap-1 rounded-lg">
      <div className="w-full animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[390px] rounded-lg"></div>
      <div className="w-full flex flex-col p-2 animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[100px] rounded-lg ">
        <span className="w-full h-[40px] flex">
          <span className="animate-pulse w-48 h-10 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
        <span className="w-full h-[40px] flex flex-row items-end justify-between">
          <span className="animate-pulse w-32 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
          <span className="animate-pulse w-16 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
      </div>
    </section>
  );
};

export const ProductSkeleton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </>
    );
  }
  return <>{children}</>;
};

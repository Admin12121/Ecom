"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect, useMemo } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import { Star as FaStar, Heart, ShoppingBag } from "lucide-react";

import {
  Product,
  VariantObject,
  Image as InterfaceImage,
} from "@/types/product";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  data: Product;
  width?: string | null;
  base?: boolean;
  handleRoute: (data: { productslug: string }) => void;
}

export const CommandCard: React.FC<ProductCardProps> = ({
  data,
  width,
  base,
  handleRoute,
}) => {
  const { convertPrice } = useAuth();
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
    return Number(
      (convertedPrice - convertedPrice * (discount / 100)).toFixed(2)
    );
  }, [convertedPrice, discount]);

  const productslug = data.productslug;

  return (
    <section
      className="relative w-[258px] flex gap-5"
      onClick={() => handleRoute({ productslug })}
    >
      <span
        className={cn(
          "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
          "bg-neutral-100 dark:bg-neutral-900",
          "flex flex-col gap-1"
        )}
      >
        <span
          className={cn(
            `absolute z-10 pl-1 top-2 flex items-center gap-1 h-5 w-full font-normal`
          )}
        >
          {stocks === 0 ? (
            <span className="absolute left-1 w-[80px] h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
              Out of stock
            </span>
          ) : (
            <>
              {data?.rating > 0 && (
                <span className="w-[50px] -top-1 left-1 h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
                  {data?.rating ? data?.rating : 0.0}{" "}
                  <FaStar className="stroke-5 w-3 h-3" />
                </span>
              )}
              {discount > 0 && (
                <span className="w-[60px] h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
                  {discount}% Off
                </span>
              )}
            </>
          )}
          <span className="h-full flex text-xs items-center justify-center absolute right-3">
            <Heart
              size={18}
              className={cn(
                "dark:stroke-white stroke-neutral-800 fill-neutral-100/20"
              )}
            />
          </span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className={cn(`w-[250px] h-[190px] rounded-lg `, width)}
        >
          {data &&
            data?.images &&
            data.images.map((data: InterfaceImage, index: number) => {
              const isPng = data.image.endsWith("not.png");
              const imageClassName = isPng ? "w-full h-full object-cover" : "";
              return (
                <SwiperSlide key={index}>
                  <div className="h-full w-full left-0 overflow-hidden top-0 bg-white dark:bg-neutral-950 flex items-center justify-center">
                    <div className={cn(imageClassName)}>
                      <Image
                        src={data.image}
                        width={600}
                        height={600}
                        priority
                        className={cn(
                          " w-full cursor-pointer h-[150px]  object-contain",
                          imageClassName
                        )}
                        alt={productslug}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <span
          className={cn(
            "relative w-full h-[70px] flex flex-col rounded-lg p-3 py-2 justify-between dark:bg-transparent",
            base && "bg-[url('/bg.svg')] bg-cover dark:bg-img-inherit"
          )}
        >
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs font-normal text-neutral-500 dark:text-zinc-100/80">
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
                  discount > 0 && "text-neutral-400 line-through"
                )}
              >
                {symbol} {convertedPrice}
              </p>
            </span>
            <Button
              variant="active"
              size="sm"
              className={cn(
                "h-[30px] flex justify-center items-center text-sm gap-2 relative -right-[10px] bottom-1",
                stocks === 0 && Array.isArray(variantsData) && "shadow-none"
              )}
            >
              {stocks === 0 && !Array.isArray(variantsData) ? (
                "Notify me"
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        </span>
      </span>
    </section>
  );
};

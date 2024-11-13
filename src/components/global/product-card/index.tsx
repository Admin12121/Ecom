"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context";
import {
  ShoppingBag as HiOutlineShoppingBag,
  Heart as IoIosHeartEmpty,
  Star as FaStar,
} from "lucide-react";
import {
  Product,
  VariantObject,
  Image as InterfaceImage,
} from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  data: Product;
  width?: string | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, width }) => {
  const router = useRouter();
  const { convertPrice } = useAuth();
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [variantsData, setVariantsData] = useState<
    VariantObject[] | VariantObject | null
  >(null);

  useEffect(() => {
    if (data?.variants) {
      setVariantsData(data.variants);
    }
  }, [data]);

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      // const variant = variantsData.find((variant) => variant.id === index);
      const variant = variantsData[index];
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };
  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price")
  );
  const variantId = getVariantData(variantsData, "id");
  const handleRoute = () => {
    router.push(`/collections?category=${data?.categoryname}`);
  };
  const productslug = data.productslug;
  return (
    <section className="relative w-full flex gap-5">
      <span
        className={cn(
          "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
          "dark:bg-themeGray dark:border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-4xl bg-opacity-40",
          "flex flex-col gap-1"
        )}
      >
        <span
          className={`absolute z-10 ${
            width ? `w-full ` : "w-[350px]"
          } px-3 top-3 flex justify-between items-center h-5 `}
        >
          {data?.rating > 0 && (
            <span className="w-[50px] h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
              {data?.rating ? data?.rating : 0.0} <FaStar size={10} />
            </span>
          )}
          <span className="h-full flex text-xs items-center justify-center absolute right-4">
            <IoIosHeartEmpty size={18} color="#fff" />
          </span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className={`w-full h-[390px] rounded-lg`}
        >
          {data &&
            data?.images &&
            data.images.map((data: InterfaceImage, index: number) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full left-0 top-0 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                  <Link href={`/products/${productslug}`}>
                    <Image
                      src={data.image}
                      width={600}
                      height={600}
                      className=" w-full cursor-pointer h-[350px]  object-contain"
                      alt="Image 1"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <span className=" w-full h-[90px] flex flex-col rounded-lg p-3 py-2 justify-between bg-neutral-100 dark:bg-transparent">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs text-slate-500" onClick={handleRoute}>
                {data.categoryname}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <p className="text-sm">
              {symbol} {convertedPrice}
            </p>
            <Button
              color="default"
              size="sm"
              className=" h-[30px] flex justify-center items-center text-sm"
              //   onClick={(event) => {
              //     addToCart(data!.id, event, variantId);
              //   }}
            >
              <HiOutlineShoppingBag size={14} />
              Add
            </Button>
          </div>
        </span>
      </span>
    </section>
  );
};

export const ProductSkeleton = () => {
  return (
    <section className="w-[350px] p-1 h-full flex flex-col gap-1 rounded-lg">
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
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
import { useUpdateQueryParams } from "@/lib/query-params";
import { getSizeCategory } from "@/app/(app)/(user)/collections/[productslug]/_components/sidebar";

interface ProductCardProps {
  data: Product;
  width?: string | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, width }) => {
  const router = useRouter();
  const { convertPrice } = useAuth();
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const updateQueryParams = useUpdateQueryParams();
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
    updateQueryParams({ category: data?.categoryname }, "/collections");
  };

  const productslug = data.productslug;
  return (
    <section className="relative w-full flex gap-5">
      <span
        className={cn(
          "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
          "bg-white dark:bg-neutral-950",
          "flex flex-col gap-1"
        )}
      >
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
                      className=" w-full cursor-pointer h-[350px]  object-contain"
                      alt="Image 1"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <span className=" w-full h-[55px] flex flex-col rounded-lg p-3 py-2 justify-between  dark:bg-transparent">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs text-slate-500" onClick={handleRoute}>
                {data.categoryname}
              </p>
            </div>
          </div>
          {/* <div className="flex w-full justify-between items-center gap-1">
            <p className="text-sm">
              {symbol} {convertedPrice}
            </p>
            <Button
              variant="active"
              size="sm"
              className="h-[30px] flex justify-center items-center text-sm gap-2"
              //   onClick={(event) => {
                //     addToCart(data!.id, event, variantId);
                //   }}
                >
              <HiOutlineShoppingBag className="w-3 h-3" />
              Add
            </Button>
          </div> */}
        </span>
      </span>
    </section>
  );
};

export const Skeleton = () => {
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

export const VariantCategory = ({
  variantsData,
}: {
  variantsData: VariantObject[] | VariantObject | null;
}) => {
  if (!Array.isArray(variantsData)) {
    return null;
  }

  const [selectedSize, setSelectedSize] = useState<{
    id: number;
    size: string | null;
  } | null>(null);
  const sortedVariants = Array.isArray(variantsData)
    ? [...variantsData].sort((a, b) => Number(a.size) - Number(b.size))
    : [];

  return (
    <span className="flex gap-2 items-center">
      {sortedVariants.map((variant, index) => (
        <Button
          key={variant.id}
          variant={selectedSize?.id === variant.id ? "active" : "secondary"}
          size="sm"
          onClick={() =>
            setSelectedSize({
              id: variant.id,
              size: variant.size,
            })
          }
        >
          {getSizeCategory(index)}
        </Button>
      ))}
    </span>
  );
};

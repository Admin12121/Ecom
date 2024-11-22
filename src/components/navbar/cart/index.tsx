"use client";

import { useState, useCallback } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag as PiHandbag } from "lucide-react";
import { getDecryptedProductList } from "@/lib/utils";
import { useProductsByIdsQuery } from "@/lib/store/Service/User_Auth_Api";
import Image from "next/image";
import {
  Card,
  CardContent as CardBody,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Plus, Minus, Trash } from "lucide-react";
import { Badge as Chip } from "@/components/ui/badge";

interface cartItemsProps {
  product: number;
  variant: number;
  pcs: number;
  categoryname: string;
  description: string;
  images: {
    image: string;
  };
  product_name: string;
  productslug: string;
  variantDetails: {
    id: number;
    size: number | null;
    price: number;
    discount: number;
    stock: number;
  };
}

export default function Cart() {
  const cartdata = getDecryptedProductList();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const productIds = Array.from(new Set(cartdata.map((item) => item.product)));
  const { data, isLoading, refetch } = useProductsByIdsQuery(
    { ids: productIds },
    { skip: productIds.length === 0 || !isSheetOpen }
  );

  const handleOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
  };

  const getCartItemsWithDetails = useCallback(() => {
    if (!data) return [];
    return cartdata
      .map((cartItem) => {
        const product = data.results.find(
          (p: {
            id: number;
            variants: any[];
            categoryname: string;
            description: string;
            images: { image: string };
            product_name: string;
            productslug: string;
          }) => p.id === cartItem.product
        );
        if (!product) return null;

        let variantDetails;
        if (Array.isArray(product.variants)) {
          variantDetails = product.variants.find(
            (v: { id: number }) => v.id === cartItem.variant
          );
        } else {
          variantDetails = product.variants;
        }

        return {
          ...cartItem,
          categoryname: product.categoryname,
          description: product.description,
          images: product.images,
          product_name: product.product_name,
          productslug: product.productslug,
          variantDetails: variantDetails || {},
        };
      })
      .filter((item) => item !== null);
  }, [cartdata, data]);

  const cartItemsWithDetails = getCartItemsWithDetails();
  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
          <PiHandbag className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 w-[97vw] mr-[1.5vw] md:min-w-[500px] h-[98vh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 p-3">
        <SheetHeader>
          <SheetTitle className="text-base">Cart</SheetTitle>
          <SheetDescription className="text-neutral-800 dark:text-zinc-400 text-sm bg-white dark:bg-neutral-900 p-3 rounded-md mt-4 ">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-2 mt-3 flex flex-col gap-3">
          <h1 className="text-2xl">Your cart total is {""}</h1>
          <span className="flex flex-col gap-2">
            {cartItemsWithDetails &&
              cartItemsWithDetails.map((data, index) => (
                <CartItem data={data} key={index} />
              ))}
          </span>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const CartItem = ({ data }: { data: any }) => {
  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );

  return (
    <Card className="w-full rounded-md shadow-none bg-transparent min-h-[100px] bg-white dark:bg-neutral-900">
      <CardBody className="flex justify-between flex-row items-center h-full">
        <span className="flex gap-5 items-center h-full">
          <Image
            alt="nextui logo"
            height={100}
            src={data.images.image}
            width={100}
            className="w-[70px] h-[80px] object-contain"
          />
          <span className="flex items-start flex-col gap-2 justify-between">
            <span className="flex flex-col gap-0">
              <p className="text-base">{truncateText(data.product_name, 25)}</p>
              <p className="text-xs text-zinc-400">{data.categoryname}</p>
            </span>
            <span className="flex items-center gap-5">
              <Button
                variant="outline"
                aria-label="Like"
                className="cursor-pointer bg-transparent max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
              >
                {data.pcs > 1 ? (
                  <Minus size={14} className="stroke-black dark:stroke-white" />
                ) : (
                  <Trash
                    color="#ffffffd6"
                    size={14}
                    className="stroke-black dark:stroke-white"
                  />
                )}
              </Button>
              {data.variantDetails.stock === 0 ? (
                <Chip>out of stock</Chip>
              ) : (
                <>
                  <p className="text-sm">{data.pcs}</p>
                  <Button
                    variant="outline"
                    aria-label="Like"
                    className="cursor-pointer bg-transparent max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
                  >
                    <Plus
                      color="#ffffffd6"
                      size={14}
                      className="stroke-black dark:stroke-white"
                    />
                  </Button>
                </>
              )}
            </span>
          </span>
        </span>
        <span className="flex justify-between flex-col h-full">
          <p className="text-sm bg-orange-500 rounded-md text-center"></p>
          <p className="text-base"></p>
        </span>
      </CardBody>
    </Card>
  );
};

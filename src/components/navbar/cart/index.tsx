"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag as PiHandbag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductsByIdsQuery } from "@/lib/store/Service/api";
import Image from "next/image";
import { Card, CardContent as CardBody } from "@/components/ui/card";
import { Plus, Minus, Trash } from "lucide-react";
import { Badge as Chip } from "@/components/ui/badge";
import { useAuth } from "@/lib/context";
import Icons from "./icons";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import FeatureProduct from "./feature-products";
import Spinner from "@/components/ui/spinner";
import { encryptData } from "@/lib/transition";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { VoucherSkleton } from "@/app/(app)/(user)/checkout/[transitionuid]/_components/voucher";

interface Variant {
  id: number;
  size: string;
  price: string;
  discount: number;
  stock: number;
  product: number;
}

interface Product {
  id: number;
  categoryname: string;
  description: string;
  images: { image: string };
  product_name: string;
  productslug: string;
  variants: Variant[];
}

interface CartProduct {
  user?: number;
  product: number;
  variant: number;
  pcs?: number;
}

interface CartItemWithDetails extends CartProduct {
  categoryname: string;
  description: string;
  images: { image: string };
  product_name: string;
  productslug: string;
  variantDetails: Variant;
}

export default function Cart() {
  const router = useRouter();
  const { status } = useAuthUser();
  const { convertPrice } = useAuth();
  const { cartdata, totalPieces } = useCart();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const productIds = Array.from(new Set(cartdata.map((item) => item.product)));
  const { data, isLoading, refetch } = useProductsByIdsQuery(
    { ids: productIds },
    { skip: productIds.length === 0 || !isSheetOpen }
  );

  useEffect(() => {
    if (data && isSheetOpen && cartdata.length > 0) {
      refetch();
    }
  }, [cartdata]);

  const handleOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
  };

  const getCartItemsWithDetails = useCallback(() => {
    if (!data) return { availableItems: [], outOfStockItems: [] };

    const availableItems: CartItemWithDetails[] = [];
    const outOfStockItems: CartItemWithDetails[] = [];

    cartdata.forEach((cartItem) => {
      const product = data.results.find((p: any) => p.id === cartItem.product);
      if (!product) return;

      let variantDetails;
      if (Array.isArray(product.variants)) {
        variantDetails = product.variants.find(
          (v: { id: number }) => v.id === cartItem.variant
        );
      } else {
        variantDetails = product.variants;
      }

      if (variantDetails) {
        const item: CartItemWithDetails = {
          ...cartItem,
          categoryname: product.categoryname,
          description: product.description,
          images: product.images,
          product_name: product.product_name,
          productslug: product.productslug,
          variantDetails: variantDetails || {},
        };
        if (variantDetails.stock > 0) {
          availableItems.push(item);
        } else {
          outOfStockItems.push(item);
        }
      }
    });

    return { availableItems, outOfStockItems };
  }, [data, cartdata]);

  const getTotalPrice = (items: any[]) => {
    return items.reduce(
      (acc, item) => {
        const price = parseFloat(item.variantDetails.price);
        const discount = item.variantDetails.discount;
        const pcs = item.pcs ?? 0;
        const finalPrice = price - price * (discount / 100);
        acc.totalPrice += finalPrice * pcs;
        return acc;
      },
      { totalPrice: 0 }
    );
  };

  const [outOfStockItems, setOutOfStockItems] = useState<CartItemWithDetails[]>(
    []
  );
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    const { availableItems, outOfStockItems } = getCartItemsWithDetails();
    const { totalPrice } = getTotalPrice(availableItems);
    const { convertedPrice, symbol } = convertPrice(totalPrice);

    setOutOfStockItems(outOfStockItems);
    setCartItemsWithDetails(availableItems);
    setConvertedPrice(convertedPrice);
    setSymbol(symbol);
  }, [isSheetOpen, cartdata, data, convertPrice]);

  const handleenc = () => {
    if (status) {
      const availableCartItems = cartItemsWithDetails.map((item) => ({
        product: item.product,
        variant: item.variantDetails.id,
        pcs: item.pcs,
      }));
      encryptData(availableCartItems, router);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
          <PiHandbag className="w-4 h-4" />
          {totalPieces > 0 && (
            <span className="absolute bg-secondary-400 text-white w-[18px] h-[18px] text-[9px] top-0 flex items-center justify-center rounded-full right-0 border-[3px] !border-white dark:!border-transparent">
              {totalPieces}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 w-[97dvw] mr-[1.5dvw] md:min-w-[500px] h-[98dvh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 p-2">
        <SheetHeader>
          <SheetTitle className="text-base">Cart</SheetTitle>
        </SheetHeader>
        {totalPieces > 0 ? (
          <div className="relative h-[93.5dvh]">
            <div className="py-2 flex flex-col gap-3 h-[85dvh] overflow-y-auto">
              <div className="text-neutral-800 dark:text-zinc-400 text-sm bg-white dark:bg-neutral-900 p-3 rounded-md ">
                Make changes to your profile here. Click save when you&apos;re
                done.
              </div>
              <h1 className="text-2xl">
                Your cart total is {symbol} {convertedPrice}
              </h1>
              <span className="flex flex-col gap-2">
                <VoucherSkleton loading={isLoading}>
                  {cartItemsWithDetails.map((data, index) => (
                    <CartItem data={data} key={index} />
                  ))}
                </VoucherSkleton>
              </span>
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="Add Coupon or Gift Card"
                  className="rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all "
                >
                  <AccordionTrigger className="text-left hover:no-underline py-3">
                    <p className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Add Coupon or Gift Card
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="flex gap-2 text-base py-4 px-1">
                    <Input className="w-full" placeholder="Enter your code" />
                    <Button variant="custom">Apply</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Card className="min-h-[105px] border !border-zinc-400/50 dark:!border-zinc-800">
                <CardBody className="flex text-sm gap-1 flex-col">
                  <span className="flex w-full justify-between items-center">
                    <p>Subtotal</p>
                    <p>
                      {symbol} {convertedPrice}
                    </p>
                  </span>
                  <span className="flex w-full justify-between items-center">
                    <p>Shipping </p>
                    <p>Free</p>
                  </span>
                  <Separator
                    className="my-1 bg-zinc-800/20 dark:bg-zinc-400/50"
                    orientation="horizontal"
                  />
                  <span className="flex w-full justify-between items-center">
                    <p>Total </p>
                    <p>
                      {symbol} {convertedPrice}
                    </p>
                  </span>
                </CardBody>
              </Card>
              {outOfStockItems.length > 0 && (
                <VoucherSkleton loading={isLoading}>
                  {outOfStockItems.map((data, index) => (
                    <CartItem data={data} key={index} outstock={true} />
                  ))}
                </VoucherSkleton>
              )}
              <FeatureProduct title="You may also like" skip={isSheetOpen} />
            </div>
            <SheetFooter className="flex !flex-col gap-1 items-center absolute w-full bottom-0 py-2  z-50">
              <Icons className="bg-neutral-200 dark:bg-neutral-950 pt-1" />
              <Separator
                className="w-[90%] bg-zinc-800/20 dark:bg-zinc-400/50"
                orientation="horizontal"
              />
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="w-full !m-0"
                  variant="custom"
                  onClick={handleenc}
                >
                  Checkout
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        ) : (
          <SheetFooter className="flex !flex-col gap-1 items-center !justify-center h-full relative bottom-0 py-2">
            <h2 className="text-neutral-600">Why is your cart empty?</h2>
            <SheetClose asChild>
              <Button type="submit" className="!m-0" variant="custom">
                Continue Shopping
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

const CartItem = ({
  data,
  outstock = false,
}: {
  data: any;
  outstock?: boolean;
}) => {
  const { convertPrice } = useAuth();
  const { HandleIncreaseItems, HandledecreaseItems, loading } = useCart();
  const { convertedPrice, symbol } = convertPrice(data.variantDetails.price);
  const discount = data.variantDetails.discount;
  const finalPrice = useMemo(() => {
    return convertedPrice - convertedPrice * (discount / 100);
  }, [convertedPrice, discount]);

  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );

  return (
    <Card className="p-1 w-full rounded-md relative shadow-none bg-transparent h-[90px] bg-white dark:bg-neutral-900">
      {outstock && (
        <div className="w-full absolute h-full top-0 left-0 bg-neutral-950/20 rounded-md z-50"></div>
      )}
      <CardBody className="flex justify-between flex-row items-center h-full">
        <span className="flex gap-5 items-center h-full">
          <span className="h-full rounded-md w-[80px] dark:bg-zinc-700/50">
            <Image
              alt="nextui logo"
              height={100}
              src={data.images.image}
              width={100}
              className="w-[80px] h-full object-contain"
            />
          </span>
          <span className="flex items-start flex-col gap-2 justify-between">
            <span className="flex flex-col gap-0">
              <p className="text-base ">
                {truncateText(data.product_name, 14)}
              </p>
              <p className="text-xs text-zinc-400">
                {data.categoryname}{" "}
                {data.variantDetails.size
                  ? ` ( ${data.variantDetails.size}cm )`
                  : ""}
              </p>
            </span>
            <span className="flex items-center gap-5">
              <Button
                variant="outline"
                aria-label="Like"
                className="cursor-pointer bg-transparent max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
                disabled={loading}
                onClick={() =>
                  HandledecreaseItems({
                    product: data.product,
                    variant: data.variantDetails.id,
                  })
                }
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
                <Chip variant="danger">out of stock</Chip>
              ) : (
                <>
                  <p className="text-sm">{data.pcs}</p>
                  <Button
                    variant="outline"
                    aria-label="Like"
                    className="cursor-pointer bg-transparent max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
                    disabled={data.variantDetails.stock === data.pcs || loading}
                    onClick={() =>
                      HandleIncreaseItems({
                        product: data.product,
                        variant: data.variantDetails.id,
                      })
                    }
                  >
                    <Plus
                      color="#ffffffd6"
                      size={14}
                      className="stroke-black dark:stroke-white"
                    />
                  </Button>
                  {loading && <Spinner size="sm" color="secondary" />}
                </>
              )}
            </span>
          </span>
        </span>
        <span className="flex items-end gap-8 justify-between flex-col h-full ">
          <p className="text-sm bg-secondary-500 rounded-md text-center px-2 text-white">
            {discount ? `-${discount}%` : "for you"}
          </p>
          <span className={cn("flex", discount > 0 && " gap-2")}>
            <p className="text-sm">
              {discount > 0 && `${symbol} ${finalPrice * data.pcs}`}
            </p>
            <p
              className={cn(
                "text-sm",
                discount > 0 && "text-neutral-500 line-through"
              )}
            >
              {symbol} {convertedPrice * data.pcs}
            </p>
          </span>
        </span>
      </CardBody>
    </Card>
  );
};

"use client";

import Payment from "@/components/global/payment";
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { decryptData } from "@/lib/transition";
import { useRouter } from "next/navigation";
import {
  useProductsByIdsQuery,
  useVerifyRedeemCodeMutation,
} from "@/lib/store/Service/api";
import Voucher, { VoucherSkleton } from "./voucher";
import BackdropGradient from "@/components/global/backdrop-gradient";
import { Card, CardContent as CardBody } from "@/components/ui/card";
import GradientText from "@/components/global/gradient-text";
import { useAuth } from "@/lib/context";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/global/glass-card";
import Address from "./address";
import { delay } from "@/lib/utils";
import { handleClick } from "./animation";
interface Product {
  product: number;
  variant: number;
  pcs: number;
}

interface State {
  redeemData: any;
  discount: number;
  productData: Product[];
  cartItemsWithDetails: any[];
  totalPrice: { price: number; symbol: string };
  totalPriceAfterDiscount: { price: number; symbol: string };
  shipping: string;
}

type Action =
  | { type: "SET_REDEEM_DATA"; payload: any }
  | { type: "SET_DISCOUNT"; payload: number }
  | { type: "SET_CART_ITEMS_WITH_DETAILS"; payload: any[] }
  | { type: "SET_TOTAL_PRICE"; payload: { price: number; symbol: string } }
  | {
      type: "SET_TOTAL_PRICE_AFTER_DISCOUNT";
      payload: { price: number; symbol: string };
    }
  | { type: "SET_SHIPPING"; payload: string };

const initialState: State = {
  redeemData: null,
  discount: 0,
  productData: [],
  cartItemsWithDetails: [],
  totalPrice: { price: 0, symbol: "" },
  totalPriceAfterDiscount: { price: 0, symbol: "" },
  shipping: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_REDEEM_DATA":
      return { ...state, redeemData: action.payload };
    case "SET_DISCOUNT":
      return { ...state, discount: action.payload };
    case "SET_CART_ITEMS_WITH_DETAILS":
      return { ...state, cartItemsWithDetails: action.payload };
    case "SET_TOTAL_PRICE":
      return { ...state, totalPrice: action.payload };
    case "SET_TOTAL_PRICE_AFTER_DISCOUNT":
      return { ...state, totalPriceAfterDiscount: action.payload };
    case "SET_SHIPPING":
      return { ...state, shipping: action.payload };
    default:
      return state;
  }
};

const schema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

const Checkout = ({ params }: { params: string }) => {
  const router = useRouter();
  const { accessToken, user } = useAuthUser();
  const { getRates, loading } = useAuth();
  const [redeemCode] = useVerifyRedeemCodeMutation();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    productData: decryptData(params, router) || [],
  });

  const productIds = useMemo(
    () => Array.from(new Set(state.productData.map((item) => item.product))),
    [state.productData]
  );
  const { data: products } = useProductsByIdsQuery(
    { ids: productIds },
    { skip: productIds.length === 0 }
  );
  const totalPieces = useMemo(() => {
    return state.productData.reduce((acc, item) => acc + (item.pcs ?? 0), 0);
  }, [state.productData]);

  const getCartItemsWithDetails = useCallback(() => {
    if (!products) return [];
    return state.productData
      .map((cartItem) => {
        const product = products.results.find(
          (p: any) => p.id === cartItem.product
        );
        if (!product) return null;

        const variantDetails = Array.isArray(product.variants)
          ? product.variants.find((v: any) => v.id === cartItem.variant)
          : product.variants;

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
  }, [products, state.productData]);

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

  const calculateDiscount = (totalPrice: number, discountData: any) => {
    if (discountData.type === "percentage") {
      return totalPrice * (discountData.discount / 100);
    } else if (discountData.type === "amount") {
      return discountData.discount;
    }
    return 0;
  };

  const applyDiscount = (discountAmount: number) => {
    const newTotalPrice = state.totalPrice.price - discountAmount;
    dispatch({
      type: "SET_TOTAL_PRICE_AFTER_DISCOUNT",
      payload: { price: newTotalPrice, symbol: state.totalPrice.symbol },
    });
  };

  useEffect(() => {
    if (!loading) {
      const itemsWithDetails = getCartItemsWithDetails();
      const { totalPrice } = getTotalPrice(itemsWithDetails);
      const { convertedPrice, symbol } = getRates(totalPrice, "USD");
      dispatch({
        type: "SET_CART_ITEMS_WITH_DETAILS",
        payload: itemsWithDetails,
      });
      dispatch({
        type: "SET_TOTAL_PRICE",
        payload: { price: convertedPrice, symbol: symbol },
      });
    }
  }, [products, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const code = { code: data.code };
    const toastId = toast.loading("Verifying Redeem Code...", {
      position: "top-center",
    });
    await delay(500);
    const res = await redeemCode({ code: code, token: accessToken });
    if (res.data) {
      toast.success("Code Verified", {
        id: toastId,
        position: "top-center",
      });
    } else {
      toast.error((res.error as any).data?.error || "Something went wrong!", {
        id: toastId,
        position: "top-center",
      });
      setError("code", { message: (res.error as any).data?.error });
      return;
    }

    dispatch({ type: "SET_REDEEM_DATA", payload: res.data });
    if (state.totalPrice.price > res.data.minimum) {
      const discountAmount = calculateDiscount(
        state.totalPrice.price,
        res.data
      );
      dispatch({ type: "SET_DISCOUNT", payload: discountAmount });
      applyDiscount(discountAmount);
      handleClick();
    } else {
      setError("code", { message: "Minimum purchase amount not met" });
    }
  };
  return (
    <>
      <div className="flex h-full lg:h-[90vh]">
        <BackdropGradient
          className="w-8/12 h-2/6 opacity-50 flex"
          container="gap-10"
        >
          <span className="flex gap-5 flex-col">
            <GradientText element="H2" className="text-4xl font-semibold py-1">
              Proceed to Payment
            </GradientText>
            <Address accessToken={accessToken} shipping={state.shipping} dispatch={dispatch}/>
            <VoucherSkleton loading={loading}>
              {state.cartItemsWithDetails &&
                state.cartItemsWithDetails.map((product: any) => {
                  return <Voucher key={Math.random()} data={product} />;
                })}
            </VoucherSkleton>
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="flex flex-col gap-2">
                <Label>Add Coupon or Gift Card</Label>
                <span className="flex gap-2">
                  <Input
                    className={cn(
                      "w-full bg-white dark:bg-neutral-950 rounded-md",
                      errors.code && "!ring-red-500 !bg-red-500/10"
                    )}
                    placeholder="Enter your code"
                    disabled={state.redeemData}
                    {...register("code")}
                  />
                  <Button
                    variant="custom"
                    type="submit"
                    disabled={state.redeemData}
                  >
                    Apply
                  </Button>
                </span>
                {errors.code && (
                  <p className="text-red-500 text-xs font-normal">
                    {errors.code.message}
                  </p>
                )}
              </span>
            </form>
            <Card className="min-h-[105px] border !border-zinc-400/50 dark:!border-zinc-800 mb-28">
              <CardBody className="flex text-sm gap-1 flex-col">
                <span className="flex w-full justify-between items-center">
                  <p>Subtotal • {totalPieces} items</p>
                  <p>
                    {state.totalPrice.symbol} {state.totalPrice.price}
                  </p>
                </span>
                {state.discount > 0 && (
                  <span className="flex w-full justify-between items-center">
                    <p>Discount </p>
                    <p>
                      - {state.totalPrice.symbol} {state.discount}
                    </p>
                  </span>
                )}
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
                  <span className="flex gap-1">
                    <p className="text-[9px] text-zinc-500">{`(All taxes included )`}</p>
                    <p>
                      {state.totalPriceAfterDiscount.price > 0
                        ? `${state.totalPriceAfterDiscount.symbol} ${state.totalPriceAfterDiscount.price}`
                        : `${state.totalPrice.symbol} ${state.totalPrice.price}`}
                    </p>
                  </span>
                </span>
              </CardBody>
            </Card>
          </span>
        </BackdropGradient>
      </div>
      <div className="pb-5">
        <div className="lg:items-center relative w-full flex flex-col pb-14 lg:pb-0 ">
          <GlassCard className="xs:w-full lg:w-10/12 xl:w-8/12 mt-16 py-4 p-2 !rounded-lg">
            <div className="px-2 flex flex-col gap-3">
              <span>
                <h5 className="font-bold text-base dark:text-themeTextWhite">
                  Payment Method
                </h5>
                <p className="text-themeTextGray leading-tight">
                  Easy to pay with One Click. No hidden fees.
                </p>
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              {user?.email && (
                <Payment
                  user={user.email}
                  total_amt={
                    state.totalPriceAfterDiscount.price
                      ? state.totalPriceAfterDiscount.price
                      : state.totalPrice.price
                  }
                  discount={state.discount}
                  products={state.productData}
                  redeemData={state.redeemData}
                  shipping={state.shipping}
                />
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
};

export default Checkout;

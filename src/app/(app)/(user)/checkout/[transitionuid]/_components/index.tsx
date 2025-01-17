"use client";

import Payment from "@/components/global/payment";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { decryptData } from "@/lib/transition";
import { useRouter } from "nextjs-toploader/app";
import {
  useCheckout_productsQuery,
  useVerifyRedeemCodeMutation,
} from "@/lib/store/Service/api";
import Voucher, { VoucherSkleton } from "./voucher";
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/components/navbar/cart/icons";
import Esewa from "./esewa";
import { useDecryptedData } from "@/hooks/dec-data";

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
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    "esewa"
  );
  const [redeemCode, { isLoading }] = useVerifyRedeemCodeMutation();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    productData: decryptData(params, router) || [],
  });

  const productIds = useMemo(
    () => Array.from(new Set(state.productData.map((item) => item.product))),
    [state.productData]
  );

  const { data: checkout_products , isLoading:productLoading} = useCheckout_productsQuery(
    { ids: productIds, token: accessToken },
    { skip: productIds.length === 0 }
  );
  const { data:products } = useDecryptedData(checkout_products, productLoading);

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
        const finalPrice = Number(
          (price - price * (discount / 100)).toFixed(2)
        );
        acc.totalPrice += finalPrice * pcs;
        return acc;
      },
      { totalPrice: 0 }
    );
  };

  const calculateDiscount = (totalPrice: number, discountData: any) => {
    if (discountData.type === "percentage") {
      return Number((totalPrice * (discountData.discount / 100)).toFixed(2));
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
      const cur = selectedValue === "esewa" ? "NPR" : "USD";
      const itemsWithDetails = getCartItemsWithDetails();
      const { totalPrice } = getTotalPrice(itemsWithDetails);
      const { convertedPrice, symbol } = getRates(totalPrice, cur);
      dispatch({
        type: "SET_CART_ITEMS_WITH_DETAILS",
        payload: itemsWithDetails,
      });
      dispatch({
        type: "SET_TOTAL_PRICE",
        payload: { price: convertedPrice, symbol: symbol },
      });
    }
  }, [products, loading, selectedValue]);

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

  const items = [
    {
      title: "Esewa",
      name: "esewa",
      icons: ["esewa"],
      content: (
        <div className="flex items-center gap-4 p-2 justify-center flex-col">
          <div className="p-5 flex items-center gap-4 justify-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-270.8 371 102 52"
              className="w-[200px] dark:stroke-neutral-600 dark:fill-neutral-600"
            >
              <path
                className="dark:stroke-neutral-600"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"
              ></path>
              <circle cx="-255.5" cy="376.5" r="1.5"></circle>
              <circle cx="-250.5" cy="376.5" r="1.5"></circle>
              <circle cx="-245.5" cy="376.5" r="1.5"></circle>
            </svg>
            <div>
              <p className="text-center dark:text-neutral-400">
                After clicking &ldquo;Pay with Esewa&rdquo;, you will be redirected to Esewa
                to complete your purchase securely.
              </p>
            </div>
          </div>
          <Esewa
            params={params}
            token={accessToken || ""}
            user={user?.email || ""}
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
        </div>
      ),
    },
    {
      title: "Credit / Debit Card",
      name: "card",
      icons: ["visa", "mastercard", "amex"],
      content: (
        <div className="p-2">
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
      ),
    },
  ];

  const handleAccordionChange = (value: string) => {
    setSelectedValue(
      value === selectedValue
        ? selectedValue
        : value !== ""
        ? value
        : selectedValue
    );
  };

  return (
    <>
      <div className="flex h-full lg:h-[90vh]">
        <div className="relative w-full flex flex-col gap-10">
          <span className="flex gap-5 flex-col">
            <GradientText element="H2" className="text-4xl font-semibold py-1">
              Proceed to Payment
            </GradientText>
            <Address
              accessToken={accessToken}
              shipping={state.shipping}
              dispatch={dispatch}
            />
            <VoucherSkleton loading={loading}>
              {state.cartItemsWithDetails &&
                state.cartItemsWithDetails.map((product: any) => {
                  return (
                    <Voucher
                      key={Math.random()}
                      data={product}
                      selectedValue={selectedValue}
                    />
                  );
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
                    loading={isLoading}
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
            <Card className="min-h-[105px] bg-white dark:bg-neutral-900 lg:mb-28">
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
        </div>
      </div>
      <div className="lg:items-center relative w-full flex flex-col ">
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
          <div className="w-full flex items-center justify-center flex-col pt-5 min-h-44">
            <RadioGroup
              className="w-full"
              value={selectedValue}
              onValueChange={handleAccordionChange}
            >
              <Accordion
                type="single"
                collapsible
                value={selectedValue}
                onValueChange={handleAccordionChange}
                className="w-full space-y-2"
              >
                {items.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      value={item.name}
                      className="w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-lg"
                    >
                      <div className="flex items-center px-4 text-[15px] justify-between leading-6 hover:no-underline gap-3">
                        <span className="flex items-center gap-2">
                          <RadioGroupItem value={item.name} />
                          <AccordionTrigger icon={<> </>}>
                            {item.title}
                          </AccordionTrigger>
                        </span>
                        <Icons icons={item.icons} className="w-auto" />
                      </div>
                      <AccordionContent className="p-0 bg-neutral-50 dark:bg-zinc-800/50">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </RadioGroup>
          </div>
        </GlassCard>
      </div>
    </>
  );
};

export default Checkout;

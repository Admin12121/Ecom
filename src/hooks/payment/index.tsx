"use client";

import { onGetStripeClientSecret } from "@/actions/payments";
import { CreateSalesSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useClearCartMutation } from "@/lib/store/Service/api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthUser } from "../use-auth-user";
import { delay } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { encryptData } from "@/hooks/dec-data";

export const useStripeElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string);
  return { StripePromise };
};

export const usePayments = (
  user: string,
  source: boolean,
  total_amt?: number | null,
  discount?: number,
  products?: any,
  redeemData?: any,
  shipping?: string,
  tranuid?: string
) => {
  const [clearCart] = useClearCartMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuthUser();
  const { setCartItems } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm<z.infer<typeof CreateSalesSchema>>({
    resolver: zodResolver(CreateSalesSchema),
    defaultValues: {
      transactionuid: uuidv4(),
      shipping: 0,
    },
  });

  useEffect(() => {
    setValue(
      "sub_total",
      total_amt ? total_amt + (discount ? discount : 0) : 0
    );
    setValue("total_amt", total_amt || 0);
    setValue("discount", discount);
    setValue("email", user);
  }, [total_amt, discount, redeemData, user, setValue]);

  const { data: Intent, isPending: creatingIntent } = useQuery({
    queryKey: ["payment-intent", total_amt],
    queryFn: () => {
      if (total_amt && products && user) {
        return onGetStripeClientSecret({
          transactionuid: tranuid ? tranuid : getValues("transactionuid"),
          amount: total_amt,
          products,
          user: user,
        });
      }
      return null;
    },
    enabled: !!total_amt && !!products && !!user,
  });

  const { mutateAsync: createGroup, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateSalesSchema>) => {
      if (!stripe || !elements || !Intent) {
        return null;
      }
      setIsLoading(true);
      const toastId = toast.loading("Veryfing Products...", {
        position: "top-center",
      });
      if (!accessToken) {
        toast.error("unAuthorized", {
          id: toastId,
          position: "top-center",
        });
        setIsLoading(false);
        return;
      }
      if (!shipping) {
        toast.error("Please select shipping address", {
          id: toastId,
          position: "top-center",
        });
        setIsLoading(false);
        return;
      }
      if (!tranuid) {
        const actualData = {
          ...data,
          payment_method: "Stripe",
          total_amt,
          products,
          redeemData,
          shipping,
        };

        await delay(500);
        const encdata = encryptData(actualData, accessToken);
        const response = await fetch("/api/initiate-payment", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ data: encdata }),
        });
        if (response.ok) {
          toast.success("Products Veryfied", {
            id: toastId,
            position: "top-center",
          });
        } else {
          toast.error("Something went wrong!", {
            id: toastId,
            position: "top-center",
          });
          setIsLoading(false);
          return;
        }
      }
      await delay(500);
      toast.loading("Processing Payment", {
        id: toastId,
        position: "top-center",
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        Intent.secret!,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );

      if (error) {
        toast.error("Oops! Failed to process payment", {
          id: toastId,
          position: "top-center",
        });
        setIsLoading(false);
      }

      if (paymentIntent?.status === "succeeded") {
        await delay(500);
        toast.success("Payment SuccessFull", {
          id: toastId,
          position: "top-center",
        });
        if (source) {
          const res = await clearCart({ token: accessToken });
          if (res.data) {
            localStorage.removeItem("productList");
            setCartItems([]);
          }
        }
        await delay(500);
        toast.loading("Placing Order...", {
          id: toastId,
          position: "top-center",
        });
        await delay(500);
        toast.success("Order Placed Successfully", {
          id: toastId,
          position: "top-center",
        });
        setIsLoading(false);
        router.push(`/orders/${data.transactionuid}`);
      }
    },
  });

  const handlePaymentSubmission = handleSubmit(async (values) => {
    try {
      await createGroup(values);
    } catch (error) {
      console.error("Error in submission:", error);
    }
  });

  return {
    handlePaymentSubmission,
    isLoading,
    isPending,
    register,
    errors,
    formState: { errors },
    creatingIntent,
    setValue,
  };
};

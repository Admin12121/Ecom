"use client";

import { onGetStripeClientSecret } from "@/actions/payments";
import { CreateSalesSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePostSaleMutation } from "@/lib/store/Service/api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { z } from "zod";

export const useStripeElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string);
  return { StripePromise };
};

export const usePayments = (
  user: string,
  total_amt?: number | null,
  discount?: number,
  products?: any,
  redeemData?: any
) => {
  const [postSale, { isLoading }] = usePostSaleMutation();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
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
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        Intent.secret!,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );

      if (error) {
        return toast("Error", {
          description: "Oops! something went wrong, try again later",
        });
      }

      if (paymentIntent?.status === "succeeded") {
        const actualData = {
          ...data,
          total_amt,
          products,
          redeemData,
          paymentIntentId: paymentIntent.id,
        };
        const res = await postSale({ actualData });
        if (res.data) {
          toast.success("Payment SuccessFull", { position: "top-center" });
          router.push(`/orders/${data.transactionuid}`);
        }
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

"use client";

import {
  onGetStripeClientSecret,
} from "@/actions/payments";
import { CreateSalesSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import { useMutation , useQuery} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePostSaleMutation } from "@/lib/store/Service/User_Auth_Api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useStripeElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string);
  return { StripePromise };
};

export const usePayments = (
  userId: string,
  usdPrice?: number | null,
  grand_total? : number | null,
  stripeId?: string,
  products?: any
) => {
  const [postSale, { isLoading }] = usePostSaleMutation();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<z.infer<typeof CreateSalesSchema>>({
    resolver: zodResolver(CreateSalesSchema),
  });


  const { data: Intent, isPending: creatingIntent } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: () => {
      if (grand_total && products && userId) {
        return onGetStripeClientSecret({ amount: grand_total, products, user: userId });
      }
      return null;
    },
    enabled: !!grand_total && !!products && !!userId,
  })


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
        })
      }

      if (paymentIntent?.status === "succeeded") {
        const actualData = {
          ...data,
          userId,
          usdPrice,
          stripeId,
          products,
          paymentIntentId: paymentIntent.id,
        };
        const res = await postSale({actualData});
        if (res.data) {
          router.push("/orders");
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
    isPending,
    register,
    errors,
    formState: { errors },
    creatingIntent,
    setValue,
    watch,
  };
};
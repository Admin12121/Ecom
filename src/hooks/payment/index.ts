"use client";

import {
  onGetStripeClientSecret,
} from "@/actions/payments";
import { CreateSalesSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
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
    watch,
  } = useForm<z.infer<typeof CreateSalesSchema>>({
    resolver: zodResolver(CreateSalesSchema),
    defaultValues: {
      transactionuid: Date.now() * 1000000 + Math.floor(Math.random() * 1000000),
      email: userId, // Set the user email
    },
  });

  const { mutateAsync: createGroup, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateSalesSchema>) => {
      console.log("Inside mutationFn");
      if (!stripe || !elements) {
        console.log("Stripe or elements not available");
        return null;
      }

      const Intent = await onGetStripeClientSecret({ amount: usdPrice, products , user: userId });

      if (!Intent) {
        console.log("Failed to create payment intent");
        return toast("Error", {
          description: "Failed to create payment intent",
        });
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
        console.log("Payment error:", error);
        return toast("Error", {
          description: "Oops! something went wrong, try again later",
        });
      }

      if (paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        const res = await postSale({
          ...data,
          userId,
          usdPrice,
          stripeId,
          paymentIntentId: paymentIntent.id,
        });
        console.log("Post sale response:", res);
      }
    },
  });

  const handlePaymentSubmission = handleSubmit(async (values) => {
    console.log("Submitting payment with values:", values);
    await createGroup(values);
  });

  return {
    handlePaymentSubmission,
    isPending,
    register,
    errors,
  };
};
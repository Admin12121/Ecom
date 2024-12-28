"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: "2024-11-20.acacia",
});

export const onGetStripeClientSecret = async ({
  amount,
  products,
  user,
  transactionuid,
}: {
  transactionuid: string;
  amount: number;
  products: any;
  user: string;
}) => {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: Math.round(amount * 100),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        transactionuid: transactionuid,
        user: user,
        products: JSON.stringify(products),
      },
    });

    return paymentIntent
      ? { secret: paymentIntent.client_secret }
      : { status: 500, message: "Failed to create payment intent." };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message || "Failed to load form",
    };
  }
};

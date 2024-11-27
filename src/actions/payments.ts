"use server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: "2024-11-20.acacia",
})

export const onGetStripeClientSecret = async ({ amount, products , user}: any) => {
  try {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: Math.round(amount * 100),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        user: user,
        products: JSON.stringify(products),
      },
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    return { status: 400, message: (error as Error).message || "Failed to load form" };
  }
};
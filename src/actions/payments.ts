"use server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: "2024-06-20",
})

export const onGetStripeClientSecret = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret }
    }
  } catch (error) {
    return { status: 400, message: "Failed to load form" }
  }
}
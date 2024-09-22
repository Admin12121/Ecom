"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSalesSchema } from "./schema"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement, loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useLazyGetStripeClientSecretQuery, usePostSaleMutation } from "@/lib/store/Service/User_Auth_Api"

export const useStripeElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string)

  return { StripePromise }
}

export const usePayments = (
  userId: string,
  usdPrice: number | null,
  stripeId?: string,
) => {
  const [isCategory, setIsCategory] = useState<string | undefined>(undefined)
  const stripe = useStripe()
  const elements = useElements()

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<z.infer<typeof CreateSalesSchema>>({
    resolver: zodResolver(CreateSalesSchema),
    defaultValues: {
      transactionuid : Date.now() * 1000000 + Math.floor(Math.random() * 1000000),
    },
  })

  const [getStripeClientSecret, { data: Intent, isLoading: creatingIntent }] = useLazyGetStripeClientSecretQuery()

  const [createGroup, { isLoading: isPending }] = usePostSaleMutation()

  const handleCreateGroup = async (data: z.infer<typeof CreateSalesSchema>) => {
    if (!stripe || !elements || !Intent) {
      return null
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      Intent.secret!,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      },
    )

    if (error) {
      return toast("Error", {
        description: "Oops! something went wrong, try again later",
      })
    }
  }

  const handleGetClientSecret = async (amount: number) => {
    await getStripeClientSecret(amount)
  }

  return {
    isPending,
    register,
    errors,
    isCategory,
    creatingIntent,
    handleCreateGroup,
    handleGetClientSecret,
  }
}
import { StripeElements } from "@/components/gobal/stripe/elements"
import PaymentForm from "./payment-form"

type Props = {
  userId: string
  stripeId?: string
  usdPrice: number | null
}

const Payment = ({ userId, stripeId , usdPrice}: Props) => {
  return (
    <StripeElements>
      <PaymentForm userId={userId}  stripeId={stripeId}  usdPrice={usdPrice}/>
    </StripeElements>
  )
}

export default Payment

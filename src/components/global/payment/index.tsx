import { StripeElements } from "@/components/global/payment/stripe"
import PaymentForm from "./payment-form"

type Props = {
  userId: string
  stripeId?: string
  usdPrice: number | null
  products : any
}

const Payment = ({ userId, stripeId , usdPrice, products}: Props) => {
  return (
    <StripeElements>
      <PaymentForm userId={userId}  stripeId={stripeId}  usdPrice={usdPrice} products={products}/>
    </StripeElements>
  )
}

export default Payment

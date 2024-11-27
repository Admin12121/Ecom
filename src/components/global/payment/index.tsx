import { StripeElements } from "@/components/global/payment/stripe"
import PaymentForm from "./payment-form"

type Props = {
  user: string
  total_amt: number | null
  discount?: number
  products : any
  redeemData: any
}

const Payment = ({ user, total_amt, discount, products, redeemData}: Props) => {
  return (
    <StripeElements>
      <PaymentForm user={user} discount={discount} total_amt={total_amt}  products={products} redeemData={redeemData}/>
    </StripeElements>
  )
}

export default Payment

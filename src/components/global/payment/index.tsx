import { StripeElements } from "@/components/global/payment/stripe";
import PaymentForm from "./payment-form";

type Props = {
  user: string;
  total_amt: number | null;
  discount?: number;
  products: any;
  redeemData: any;
  shipping: string;
  source: boolean;
};

const Payment = ({
  user,
  total_amt,
  discount,
  products,
  redeemData,
  shipping,
  source,
}: Props) => {
  const data = {
    user,
    total_amt,
    discount,
    products,
    redeemData,
    shipping,
    source,
  };

  return (
    <StripeElements>
      <PaymentForm data={data} />
    </StripeElements>
  );
};

export default Payment;

import { StripeElements } from "@/components/global/payment/stripe";
import PaymentForm from "./payment-form";

type Props = {
  user: string;
  total_amt: number | null;
  discount?: number;
  products: any;
  redeemData: any;
  shipping: string;
};

const Payment = ({
  user,
  total_amt,
  discount,
  products,
  redeemData,
  shipping,
}: Props) => {
  const data = {
    user,
    total_amt,
    discount,
    products,
    redeemData,
    shipping,
  };

  return (
    <StripeElements>
      <PaymentForm
        data={data}
      />
    </StripeElements>
  );
};

export default Payment;

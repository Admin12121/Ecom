"use client";

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { usePayments } from "@/hooks/payment"
import { ErrorMessage } from "@hookform/error-message"
import { CardElement } from "@stripe/react-stripe-js"

type Props = {
  data: {
    user: string;
    total_amt: number | null;
    products: any;
    discount?: number;
    redeemData: any;
    shipping: string;
  };
};


const PaymentForm = ({ data}: Props) => {
  const { user, total_amt, discount, products, redeemData, shipping } = data;
  const {
    handlePaymentSubmission,
    isPending,
    isLoading,
    register,
    errors,
    creatingIntent,
  } = usePayments(user, total_amt, discount, products, redeemData, shipping);

  return (
    <Loader loading={creatingIntent}>
        <form className="pt-5 relative z-50 w-full" onSubmit={handlePaymentSubmission}>
          <div className=" mb-2">
            <ErrorMessage
              errors={errors}
              name={"email"}
              render={({ message }) => (
                <p className="text-red-400">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          </div>
          <div className=" mt-3">
            <FormGenerator
              register={register}
              name="email"
              errors={errors}
              inputType="input"
              type="email"
              placeholder="Email"
              disabled={true}
            />
          </div>
          <div className=" my-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#B4B0AE",
                    "::placeholder": {
                      color: "#B4B0AE",
                    },
                  },
                },
              }}
              className="dark:bg-themeBlack border-[1px] dark:border-themeGray outline-none rounded-lg p-3 "
            />
          </div>
          <div className=" flex flex-col gap-3">
            <Button
              variant="custom"
              type="submit"
              className="dark:bg-themeBlack border-none"
              disabled={isPending || creatingIntent || isLoading}
            >
              <Loader loading={isPending || isLoading}>Place order</Loader>
            </Button>
          </div>
        </form>
    </Loader>
  );
};

export default PaymentForm;

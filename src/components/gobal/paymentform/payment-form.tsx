"use client";

import { FormGenerator } from "@/components/gobal/form-generator";
import { Loader } from "@/components/gobal/loader";
import { Button } from "@/components/ui/button";
import { usePayments } from "@/hooks/payment";
import { ErrorMessage } from "@hookform/error-message";
import { CardElement  } from "@stripe/react-stripe-js";
type Props = {
  userId: string;
  stripeId?: string;
  usdPrice: number | null;
  products: any;
};

const PaymentForm = ({ userId, stripeId, usdPrice , products}: Props) => {
  const {
    handlePaymentSubmission,
    isPending,
    register,
    errors,
    // formState: { errors as formError}
  } = usePayments(userId, usdPrice, stripeId, products);
  

  return (
    <Loader loading={isPending}>
        <form className="pt-5 relative z-50 w-full" onSubmit={handlePaymentSubmission}>
          <div className="px-7 mb-2">
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
          <div className="px-7 flex gap-5 w-full items-center justify-between">
            <FormGenerator
              register={register}
              name="redeemCode"
              errors={errors}
              inputType="input"
              type="text"
              placeholder="Redeem Code"
              className="w-full"
            />
            <Button
              variant="outline"
              type="button"
              className="bg-themeBlack border-themeGray rounded-lg"
              onClick={() => {
                register("redeem_amt").onChange({ target: { value: 5 } });
              }}
            >
              Apply
            </Button>
          </div>
          <div className="px-7 mt-3">
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
          <div className="px-7 my-3">
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
              className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
            />
          </div>
          <div className="px-7 flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-sm text-zinc-500">Item Total</p>
              <p className="text-md text-zinc-300">
                {usdPrice ? `$${usdPrice.toFixed(2)}` : "N/A"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-zinc-500">Delivery Fee</p>
              <p className="text-md text-zinc-300">$0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-zinc-500">Voucher Discount</p>
              <p className="text-md text-zinc-300">$5.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p className="text-md text-zinc-300">Total</p>
              <p className="text-md text-zinc-300">
                {usdPrice ? `$${(usdPrice - 5).toFixed(2)}` : "N/A"}
              </p>
            </div>
            <Button
              variant="outline"
              type="submit"
              className="bg-themeBlack border-themeGray rounded-xl"
            >
              {/* Proceed to Pay */}
              <Loader loading={isPending}>Proceed to Pay</Loader>
            </Button>
          </div>
        </form>
    </Loader>
  );
};

export default PaymentForm;

"use client";

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { usePayments } from "@/hooks/payment"
import { ErrorMessage } from "@hookform/error-message"
import { CardElement } from "@stripe/react-stripe-js"
import { useVerifyRedeemCodeMutation } from "@/lib/store/Service/User_Auth_Api"
import { useState, useEffect } from "react";
import SpinnerLocal from "@/components/ui/spinner";

type Props = {
  userId: string;
  stripeId?: string;
  usdPrice: number | null;
  products: any;
};

const PaymentForm = ({ userId, stripeId, usdPrice , products}: Props) => {

  const [redeemCode, {isLoading}]  = useVerifyRedeemCodeMutation()
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [grand_total, setGrandTotal] = useState<number>(0);

  const {
    handlePaymentSubmission,
    isPending,
    register,
    errors,
    creatingIntent,
    setValue,
    watch,
  } = usePayments(userId, usdPrice,grand_total, stripeId, products);

  useEffect(() => {
    if (userId && usdPrice && products) {
      setValue("transactionuid", Date.now() * 1000000 + Math.floor(Math.random() * 1000000));
      setValue("email", userId);
      setValue("sub_total", parseFloat(usdPrice.toFixed(2)));
      setValue("total_amt", parseFloat(usdPrice.toFixed(2)));
      setValue("grand_total", parseFloat(usdPrice.toFixed(2)));
      setValue("shipping", 0);
      setGrandTotal(parseFloat(usdPrice!.toFixed(2)))
    }
  }, [userId, usdPrice, products, setValue]);

  const redeemCodeValue = watch("Code");
  
  const handleApplyCode = async () => {
    if(redeemCodeValue){
      const code =  redeemCodeValue
      const res = await redeemCode({code})
      if(res.data){
        const { type, discount, minimum } = res.data;
        if (usdPrice && usdPrice >= minimum) {
          let discountValue = 0;
          if (type === "amount") {
            discountValue = discount;
          } else if (type === "percentage") {
            discountValue = (usdPrice * discount);
          }
          setDiscount(discountValue);
          setValue("redeem_amt", parseFloat((discountValue).toFixed(2)));
          setValue("total_amt", parseFloat((usdPrice - discountValue).toFixed(2)));
          setValue("grand_total", parseFloat((usdPrice - discountValue).toFixed(2)));
          setGrandTotal(parseFloat((usdPrice - discountValue).toFixed(2)))
          setRedeemError(null);
        } else {
          setRedeemError(`Minimum amount should be $${(minimum / 100).toFixed(2)}`);
        }
      } else {
        setDiscount(0);
        setValue("redeem_amt", 0);
        setValue("total_amt", usdPrice!);
        setValue("grand_total", usdPrice!);
        setGrandTotal(usdPrice!)
        setRedeemError("Invalid code");
      }
    }
  };

  return (
    <Loader loading={creatingIntent}>
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
              name="Code"
              errors={errors}
              inputType="input"
              type="text"
              placeholder="Redeem Code"
              className={`w-full ${discount ? "border-1 rounded-lg border-green-500" : ""}`}
            />
            <Button
              variant="outline"
              type="button"
              className="bg-themeBlack border-themeGray rounded-lg"
              onClick={() => {
                handleApplyCode();
              }}
            >
              {isLoading ? <SpinnerLocal size="sm" color="default"/> : "Apply"}
            </Button>
          </div>
          {redeemError && (
            <div className="px-7 mt-2 text-red-400">
              {redeemError}
            </div>
          )}
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
              <p className="text-md text-zinc-300">${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p className="text-md text-zinc-300">Total</p>
              <p className="text-md text-zinc-300">
                {usdPrice ? `$${(usdPrice - discount).toFixed(2)}` : "N/A"}
              </p>
            </div>
            <Button
              variant="outline"
              type="submit"
              className="bg-themeBlack border-themeGray rounded-xl"
              disabled={isPending || creatingIntent}
            >
              <Loader loading={isPending}>Proceed to Pay</Loader>
            </Button>
          </div>
        </form>
    </Loader>
  );
};

export default PaymentForm;

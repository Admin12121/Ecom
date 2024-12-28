"use client";
import React, { useEffect, useState } from "react";
import { MultiStepLoader as Loader } from "@/components/global/spin-loader";
import { useEsewahookMutation } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from 'next/navigation';
import { delay } from "@/lib/utils";

type StepState = {
  text: string;
  state: boolean;
  verified?: string;
};

const Response = () => {
  const router = useRouter();
  const { accessToken } = useAuthUser();
  const { transitionuid } = useParams(); 
  const searchParams = useSearchParams();
  const [webhook] = useEsewahookMutation();
  const [responseData, setResponseData] = useState<any>(null);
  const [steps, setSteps] = useState<StepState[]>([
    { text: "Verifying payment", state: false },
  ]);

  const handlePaymentVerification = async () => {
    try {
      const data = searchParams.get("data");
      await delay(1000);
      const response = await fetch("/api/verify-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        await delay(1000);
        const result = await response.json();
        setSteps([
          { text: "Payment successful", state: true },
        ]);
        await delay(1000);
        setSteps([
          { text: "Payment successful", state: true },
          { text: "Placing order", state: false },
        ]);
        await delay(1000);
        const actualData = {transactionuid: transitionuid , status: result.transaction_status}
        const res = await webhook({ actualData, token: accessToken });
        if (res) {
          setSteps([
            { text: "Payment successful", state: true },
            { text: "Order placed successfully", state: true },
          ]);
          await delay(1000);
          setSteps([
            { text: "Payment successful", state: true },
            { text: "Order placed successfully", state: true },
            { text: "Redirecting to Order Details", state: false },
          ]);
          await delay(1000);
          router.push(`/orders/${transitionuid}`);
        }
      } else {
        setSteps([
          { text: "Verifying payment", state: true, verified: "alert" },
          { text: "Error", state: true, verified: "error" },
        ]);
      }
    } catch (error) {
      setSteps([
        { text: "Verifying payment", state: true, verified: "alert" },
        {
          text: "Server Temperory Not availabe",
          state: true,
          verified: "error",
        },
      ]);
    }
  };

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decodedData = atob(data);
        const parsedData = JSON.parse(decodedData);
        console.log(parsedData)
        if (transitionuid === parsedData.transaction_uuid) {
          setResponseData(parsedData);
        } else {
          setSteps([{ text: "Error", state: true, verified: "error" }]);
        }
      } catch (error) {
        setSteps([
          { text: "Failed to Verify payment", state: true, verified: "error" },
        ]);
        console.error("Failed to decode or parse data:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (responseData) {
      handlePaymentVerification();
    }
  }, [responseData]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader steps={steps} />
    </div>
  );
};

export default Response;

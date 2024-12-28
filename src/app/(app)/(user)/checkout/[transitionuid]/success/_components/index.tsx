"use client";
import React, { useEffect, useState } from "react";
import { MultiStepLoader as Loader } from "@/components/global/spin-loader";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import { delay } from "@/lib/utils";

type StepState = {
  text: string;
  state: boolean;
  verified?: string;
};


const Response = () => {
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState<any>(null);
  const [steps, setSteps] = useState<StepState[]>([
    { text: "Verifying payment", state: false},
  ]);

  const handlePaymentVerification = async () => {
    try {
      await delay(1000);
      const response = await fetch("/api/verify-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: responseData }),
      });
      if (response.ok) {
        await delay(1000);
        const result = await response.json();
        setSteps([{ text: "Verifying payment", state: true },{ text: "Payment successful", state: true }]);
      } else {
        setSteps([{ text: "Verifying payment", state: true, verified:"alert" },{ text: "Error", state: true, verified:"error" }]);
      }
    } catch (error) {
      setSteps([{ text: "Verifying payment", state: true , verified:"alert"},{ text: "Server Temperory Not availabe", state: true , verified:"error"}]);
    }
  };

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decodedData = atob(data);
        const parsedData = JSON.parse(decodedData);
        const secretKey = "8gBm/:&EnhH.1/q";
        const dataString = `transaction_code=${parsedData.transaction_code},status=${parsedData.status},total_amount=${parsedData.total_amount},transaction_uuid=${parsedData.transaction_uuid},product_code=${parsedData.product_code},signed_field_names=${parsedData.signed_field_names}`;
        const hash = CryptoJS.HmacSHA256(dataString, secretKey);
        const signature = CryptoJS.enc.Base64.stringify(hash);
        if (signature === parsedData.signature) {
          setResponseData(parsedData);
        }else{
          setSteps([{ text: "Error", state: true, verified:"error" }]);  
        }
      } catch (error) {
        setSteps([{ text: "Failed to Verify payment", state: true, verified:"error"}]);
        console.error("Failed to decode or parse data:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (responseData) {
      handlePaymentVerification();
    }
  }, [responseData]);

  // useEffect(() => {
  //   updateState();
  // }, []);

  // const updateState = async () => {

  //   await delay(1000);
  //   setSteps([
  //     { text: "Verifying payment", state: true },
  //     { text: "Payment successful", state: true },
  //   ]);
  //   await delay(1000);
  //   setSteps([
  //     { text: "Verifying payment", state: true },
  //     { text: "Payment successful", state: true },
  //     { text: "Placing order", state: false },
  //   ]);
  //   await delay(1000);
  //   setSteps([
  //     { text: "Verifying payment", state: true },
  //     { text: "Payment successful", state: true },
  //     { text: "Placing order", state: true },
  //     { text: "Order placed successfully", state: true },
  //   ]);
  //   await delay(1000);
  //   setSteps([
  //     { text: "Verifying payment", state: true },
  //     { text: "Payment successful", state: true },
  //     { text: "Placing order", state: true },
  //     { text: "Order placed successfully", state: true },
  //     { text: "Redirecting to Order Details", state: false },
  //   ]);
  // };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader steps={steps} />
    </div>
  );
};

export default Response;

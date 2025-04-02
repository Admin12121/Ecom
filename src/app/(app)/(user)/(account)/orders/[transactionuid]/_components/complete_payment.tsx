import Icons from "@/components/navbar/cart/icons";
import { Button } from "@/components/ui/button";
import { decriptData, encryptData } from "@/hooks/dec-data";
import { useAuthUser } from "@/hooks/use-auth-user";
import { delay } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const Complete_payment = ({
  total_amt,
  transaction_uid,
  status,
}: {
  total_amt: number;
  transaction_uid: string;
  status: string;
}) => {
  const { accessToken: token } = useAuthUser();
  const paymentDetails = {
    amount: total_amt ? total_amt.toString() : "",
    tax_amount: "0",
    total_amount: total_amt ? total_amt.toString() : "",
    transaction_uuid: `${transaction_uid}_${Date.now()}`,
    product_code: "EPAYTEST",
    success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/checkout/${transaction_uid}/success`,
    failure_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/checkout/${transaction_uid}/failure `,
  };

  const handlePayment = async () => {
    const toastId = toast.loading("Veryfing Products...", {
      position: "top-center",
    });
    await delay(500);
    const payload = { paymentDetails };
    const data = encryptData(payload, token!);
    try {
      const response = await fetch("/api/re-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        toast.success("Products Veryfied", {
          id: toastId,
          position: "top-center",
        });
        await delay(500);
        toast.loading("Processing Payment", {
          id: toastId,
          position: "top-center",
        });

        const formData = await response.json();
        const data = decriptData(formData, token!);
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.entries(data).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });
        const formWindow = window.open("", "_blank");
        if (formWindow) {
          formWindow.document.body.appendChild(form);
          form.submit();
        } else {
          toast.error("Please allow popups for this website");
        }
      } else {
        console.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button className="relative bottom-1" onClick={handlePayment}>
      Pay now
      {status == "Esewa" ? (
        <Icons icons={["esewa"]} className="ml-1" />
      ) : (
        <Icons icons={["visa"]} className="ml-1" />
      )}
    </Button>
  );
};

export default Complete_payment;

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { encryptData, decriptData } from "@/hooks/dec-data";

type Props = {
  params: string;
  token: string;
  user: string;
  total_amt: number | null;
  discount?: number;
  products: any;
  redeemData: any;
  shipping: string;
};

const Esewa = ({
  params,
  token,
  user,
  total_amt,
  discount,
  products,
  redeemData,
  shipping,
}: Props) => {
  const [isLoading, setLoading] = React.useState(false);
  const paymentDetails = {
    amount: total_amt ? total_amt.toString() : "",
    tax_amount: "0",
    total_amount: total_amt ? total_amt.toString() : "",
    transaction_uuid: uuidv4(),
    product_code: 'EPAYTEST',
    success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/checkout/${params}/success`,
    failure_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/checkout/${params}/failure `,
  }

  const handlePayment = async () => {
    setLoading(true);
    const data = encryptData(paymentDetails, token);
    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({data}),
      });

      if (response.ok) {
        const formData = await response.json();
        const data = decriptData(formData, token);
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

        document.body.appendChild(form);
        form.submit();
      } else {
        console.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button
      variant="custom"
      type="submit"
      className="dark:bg-themeBlack border-none w-full"
      onClick={handlePayment}
    >
      Pay with Esewa
    </Button>
  );
};

export default Esewa;

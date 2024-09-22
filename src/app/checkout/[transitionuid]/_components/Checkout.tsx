"use client";
import React, { useEffect, useState } from "react";
import { decrypt } from "@/lib/transition";
import { useRouter } from "next/navigation";
import Payment from "@/components/gobal/paymentform";
import {
  useProductsByIdsQuery,
  useGetLoggedUserQuery,
} from "@/lib/store/Service/User_Auth_Api";
import Voucher from "./voucher";
import BackdropGradient from "@/components/gobal/backdrop-gradient";
import GlassCard from "@/components/gobal/glass-card";
import GradientText from "@/components/gobal/gradient-text";

const Checkout = ({ params }: { params: { transitionuid: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const { data: userData, isLoading: userDataisLoading } =
    useGetLoggedUserQuery({});
  const uid = params.transitionuid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedData = await decrypt(uid, router);
        setData(decryptedData);
      } catch (error) {
        console.error("Failed to decrypt data:", error);
      }
    };
    fetchData();
  }, [params.transitionuid, router]);

  const productIds = data ? JSON.parse(data).map((item: any) => item.id) : [];

  const {
    data: ProductData,
    isLoading,
    refetch,
  } = useProductsByIdsQuery(
    { ids: productIds.join(",") },
    { skip: productIds.length === 0 }
  );

  useEffect(() => {
    if (ProductData) {
      let totalNpr = 0;
      ProductData.results.forEach((product: any) => {
        if (product.variants) {
          if (Array.isArray(product.variants)) {
            product.variants.forEach((variant: any) => {
              const price = parseFloat(variant.price);
              const pcs = variant.pcs || 1; // Default to 1 if pcs is not defined
              if (!isNaN(price)) {
                totalNpr += price * pcs;
              }
            });
          } else {
            const price = parseFloat(product.variants.price);
            const pcs = product.pcs || 1; // Default to 1 if pcs is not defined
            if (!isNaN(price)) {
              totalNpr += price * pcs;
            }
          }
        }
      });
      const conversionRate = 0.00747943156;
      setUsdPrice(totalNpr * conversionRate);
    }
  }, [ProductData]);

  return (
    <>
      <div className="flex items-center">
        <BackdropGradient className="w-8/12 h-2/6 opacity-50">
          <h5 className="text-2xl font-bold text-themeTextWhite">Grouple.</h5>
          <GradientText element="H2" className="text-4xl font-semibold py-1">
            Create Your Group
          </GradientText>
          <p className="text-themeTextGray">
            Free for 14 days, then $99/month. Cancel anytime.All features.
            Unlimited everything. No hidden fees.
          </p>
          {ProductData &&
            data &&
            ProductData.results.map((product: any) => {
              const parsedData = JSON.parse(data);
              const productData = parsedData.find(
                (item: any) => item.id === product.id
              );
              return (
                <Voucher
                  key={product.id}
                  product={product}
                  variantId={productData.variantId}
                  pcs={productData.pcs}
                />
              );
            })}
        </BackdropGradient>
      </div>
      <div>
        <BackdropGradient
          className="w-6/12 h-3/6 opacity-40"
          container="lg:items-center"
        >
          <GlassCard className="xs:w-full lg:w-10/12 xl:w-8/12 mt-16 py-7 ">
            <div className="px-7 flex flex-col">
              <h5 className="font-bold text-base text-themeTextWhite">
                Payment Method
              </h5>
              <p className="text-themeTextGray leading-tight">
                Free for 14 days, then $99/month. Cancel anytime.All features.
                Unlimited everything. No hidden fees.
              </p>
            </div>
            {userData && (
              <Payment
                userId={userData.email}
                stripeId={""}
                usdPrice={usdPrice}
              />
            )}
          </GlassCard>
        </BackdropGradient>
      </div>
    </>
  );
};

export default Checkout;

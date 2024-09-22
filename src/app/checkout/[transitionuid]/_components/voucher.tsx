"use client";

import * as React from "react";
import Image from "next/image";
import useAuth from "@/context/AuthContext";
import GlassCard from "@/components/gobal/glass-card";

interface VariantObject {
  id: number;
  product_stripe_id: string | null;
  size: string | null;
  price: string;
  discount: string;
  stock: number;
  product: number;
}

const Voucher = ({ product , variantId, pcs}: { product: any , variantId:any, pcs : any}) => {
  const [variantsData, setVariantsData] = React.useState<VariantObject[] | VariantObject | null>(null);
  
  const { convertPrice, isLoggedIn } = useAuth();

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    variantId: number
  ): any => {
    if (Array.isArray(variantsData)) {
      const variant = variantsData.find((variant) => variant.id === variantId);
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };

  const variantPrice = getVariantData(product.variants, "price", variantId);
  const { convertedPrice : convertedvariantPrice } = convertPrice(variantPrice);
  const totalPrice = variantPrice ? parseFloat(variantPrice) * pcs : 0;
  const { convertedPrice, symbol } = convertPrice(totalPrice);

  return (
    <div className="flex items-center justify-center w-full">
        <GlassCard className=" w-full flex flex-row gap-5 p-2 rounded-lg">
          <Image
            src={product.images[0].image}
            alt="product"
            width={100}
            height={80}
            className="rounded-md object-contain p-1 px-3 bg-zinc-950"
          />
          <span className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{product.product_name}</p>
            <p className="text-sm text-zinc-400">
              {product.categoryname} / {product.subcategoryname}
            </p>
            <span className="flex flex-col justify-between">
              <span className="flex gap-3">
                <p>{pcs}</p> * <p className="text-sm text-zinc-400">{symbol} {convertedvariantPrice}</p>  
              </span>
              <p>{symbol} {convertedPrice}</p>
            </span>
          </span>
        </GlassCard>
    </div>
  );
};

export default Voucher;

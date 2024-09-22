"use client";

import * as React from "react";
import Image from "next/image";
import useAuth from "@/context/AuthContext";

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
  const [variantsData, setVariantsData] = React.useState<
    VariantObject[] | VariantObject | null
  >(null);
  const { convertPrice, isLoggedIn } = useAuth();
  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      const variant = variantsData.find((variant) => variant.id === index);
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };

  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price", variantId)
  );
  return (
    <div className="flex items-center justify-center w-full">
        <span className=" w-full flex flex-row gap-2 dark:bg-zinc-800 p-2 rounded-lg">
          <Image
            src={product.images[0].image}
            alt="product"
            width={80}
            height={80}
            className="rounded-md object-cover p-1 px-3 bg-zinc-950"
          />
          <span className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{product.product_name}</p>
            <p className="text-sm text-zinc-400">
              {product.categoryname} / {product.subcategoryname}
            </p>
            <p className="text-sm text-zinc-400">{symbol} {convertedPrice}</p>
          </span>
        </span>
    </div>
  );
};

export default Voucher;

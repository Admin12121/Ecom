import React, { useState, useEffect } from "react";
import { ProductCard, ProductSkeleton } from "@/components/global/product-card";
import {
  useProductsViewQuery,
  useTrendingProductsViewQuery,
} from "@/lib/store/Service/User_Auth_Api";
import { Product } from "@/types/product";

const FeatureProduct = ({
  title,
  className,
  skip,
}: {
  title: string;
  className?: string;
  skip?: any;
}) => {
    const { data, isLoading } = useTrendingProductsViewQuery({skip:!skip});
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        if (data) {
        setProducts(data);
        }
    }, [data]);
  return (
    <main className="flex flex-col gap-2">
      {title && <div className="w-full flex items-center mt-2">
        <h2 className="text-2xl">{title}</h2>
      </div>}
      <div className="flex flex-wrap gap-2 items-center justify-center w-full">
        <ProductSkeleton loading={isLoading}>
        {products &&
          products.map((product: any, index: any) => (
            <div
              className={`slider-slide flex items-center w-full justify-center p-2 transition duration-500 ease-in-out`}
              key={index}
            >
              <ProductCard
                data={product}
                width={"w-full"}
              />
            </div>
            ))}
        </ProductSkeleton>
      </div>
    </main>
  );
};

export default FeatureProduct;

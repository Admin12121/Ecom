"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  useProductsViewQuery,
  useRecommendedProductsViewQuery,
} from "@/lib/store/Service/User_Auth_Api";
import Image from "./image";
import Spinner from "@/components/ui/spinner";
import { authUser } from "@/hooks/use-auth-user";
// import Reviewcards from "./components/reviewcards";

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });
const ProductNotFound = dynamic(() => import("./not-found"), { ssr: false });
const FeatureProduct = dynamic(
  () => import("@/components/global/feature-product"),
  { ssr: false }
);

interface Image {
  image: string;
}

interface VariantObject {
  id: number;
  product_stripe_id: string | null;
  size: string | null;
  price: string;
  discount: string;
  stock: number;
  product: number;
}

interface Product {
  id: number;
  categoryname: string;
  subcategoryname: string;
  reviews: any[];
  comments: any[];
  rating: number;
  total_ratings: number;
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: Image[];
}

const ProductObject = ({ productslug }: { productslug: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { data, isLoading, error } = useProductsViewQuery({ productslug });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  if (error) return <ProductNotFound />;
  if (isLoading || !product) return <LoadingSection />;

  return (
    <>
      <ProductSection product={product} />
      <ReviewsSection />
      <RecommendedProducts product_id={product!.id} />
    </>
  );
};

const LoadingSection = () => (
  <section className="w-full h-[100dvh] flex flex-col items-center justify-center">
    <Spinner />
  </section>
);

const ProductSection = ({ product }: { product: Product }) => (
  <section className="min-w-[100dvw] justify-center items-center flex">
    <div className="post-section !pb-2 text-gray-900 grid container mmd:grid-cols-6  gap-4 p-2 md:p-5 pt-0 max-w-[95rem]">
      <div className="PostCon col-span-7 mmd:col-span-4">
        <div className="flex flex-col">
          <div className="postWrapper flex mmd:flex-wrap max-mmd:flex-col gap-3">
            {product && product.images && <Image images={product.images} />}
          </div>
        </div>
      </div>
      <div className="sidebarWraper w-full col-span-7 mmd:col-span-2">
        <Sidebar products={product} />
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
  <section className="w-full h-full py-10 flex overflow-hidden flex-col items-center justify-center">
    <h1 className="text-5xl font-bold text-center w-[350px] md:w-[450px]">
      What people say about Nassau
    </h1>
    <p>Don&apos;t just take our word for it.</p>
    <div className="flex flex-wrap gap-4 pt-10 items-center justify-center">
      {/* <Reviewcards /> */}
    </div>
  </section>
);

export const RecommendedProducts = ({ product_id }: { product_id: number }) => {
  const { accessToken } = authUser();
  const { data, isLoading } = useRecommendedProductsViewQuery(
    {
      product_id,
      token: accessToken,
    },
    { skip: !accessToken }
  );
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  return (
    <FeatureProduct
      title="You may also like"
      products={products}
      loading={isLoading}
    />
  );
};

export default ProductObject;

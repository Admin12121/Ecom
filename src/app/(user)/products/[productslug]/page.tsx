"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  useProductsViewQuery,
  useRecommendedProductsViewQuery,
} from "@/lib/store/Service/User_Auth_Api";
import Header from "../../../../components/User/Collections/Header/Header";
import Sidebar from "./components/Sidebar";
import Image from "./components/Image";
import DemoSlider from "./components/Slider";
import Reviewcards from "./components/reviewcards";
import ProductNotFound from "@/components/404/404";
import FeatureNine from "./components/feature";

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
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: Image[];
}

const Product = () => {
  const params = useParams<{ productslug: string }>();
  const productslug = params.productslug;
  const [product, setProduct] = useState<Product | null>(null);
  const { data, isLoading, error } = useProductsViewQuery({ productslug });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
        <Header id={productslug} />
        {error ? (
          <ProductNotFound />
        ) : isLoading && !product ? (
          <section className="w-full h-[100vh] flex flex-col items-center justify-center">
            <Spinner color="secondary" />
          </section>
        ) : (
          <>
            {!product ? (
              <section className="w-full h-[100vh] flex flex-col items-center justify-center">
                <Spinner color="secondary" />
              </section>
            ) : (
              <section className="min-w-[100vw] justify-center items-center flex">
                <div className="post-section !pb-2 text-gray-900 grid container mmd:grid-cols-6  gap-4 p-5 pt-0 max-w-[95rem]">
                  <div className="PostCon col-span-7 mmd:col-span-4">
                    <div className="flex flex-col">
                      <div className="postWrapper py-6 flex mmd:flex-wrap max-mmd:flex-col gap-3">
                        {product && product.images && (
                          <Image images={product.images} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sidebarWraper w-full col-span-7 mmd:col-span-2">
                    {product && <Sidebar products={product} />}
                  </div>                  
                </div>
              </section>
            )}
            <section className="w-full h-full py-10 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold text-center w-[450px]">
                What people say about Nassau
              </h1>
              <p>Don&apos;t just take our word for it.</p>
              <div className="flex flex-wrap gap-4 pt-10 items-center justify-center">
                <Reviewcards />
              </div>
            </section>
            {product ? (
              <RecommendedProducts product_id={product!.id} />
            ) : (
              <section className="w-full h-[50vh] flex flex-col items-center justify-center">
                <Spinner color="secondary" />
              </section>
            )}
          </>
        )}
      </ReactLenis>
    </>
  );
};

const RecommendedProducts = ({ product_id }: { product_id: number }) => {
  const { data, isLoading, error } = useRecommendedProductsViewQuery({
    product_id,
  });
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  return (
    <>
    {isLoading ? <span className="flex items-center justify-center w-full h-[50vh]"><Spinner/></span> :
      <FeatureNine products={products}/>}
    </>
  );
};

export default Product;


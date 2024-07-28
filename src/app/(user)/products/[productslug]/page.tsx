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
import Header from "../../collections/Header/Header";
import Sidebar from "./components/Sidebar";
import Image from "./components/Image";
import DemoSlider from "./components/Slider";
import Reviewcards from "./components/reviewcards";
import ProductNotFound from "@/components/404/404";

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
              <section className="post-section !pb-2 text-gray-900 grid container mmd:grid-cols-6 min-w-[100vw] gap-4 p-5 pt-0">
                <div className="PostCon col-span-7 mmd:col-span-4">
                  <div className="flex flex-col">
                    <div className="postWrapper py-6 flex mmd:flex-wrap max-mmd:flex-col gap-3">
                      {product && product.images && (
                        <Image images={product.images} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="sidebarWraper mb-[4rem] w-full col-span-7 mmd:col-span-2">
                  {product && <Sidebar products={product} />}
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, data.length - cardsPerView)
    );
  };

  return (
    <div className="slider-container relative w-full overflow-hidden">
      <div className="px-5 w-full flex items-center">
        <h2 className="text-2xl">You may also like</h2>
      </div>
      <div
        className="slider-wrapper flex transition-transform ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
        }}
      >
        {products.map((product, index) => (
          <div
            className="slider-slide flex items-center justify-center p-4"
            key={index}
          >
            <DemoSlider data={product} />
          </div>
        ))}
      </div>
      <button
        className={`absolute top-0 h-[30px] w-[30px] ${
          currentIndex > 0 ? "bg-[#26262b]" : "bg-[#0a0a0a] text-zinc-700"
        } flex items-center justify-center p-2 rounded-lg right-[60px]`}
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      <button
        className={`absolute top-0 h-[30px] w-[30px] ${
          currentIndex < products.length - cardsPerView
            ? "bg-[#26262b]"
            : "bg-[#0a0a0a] text-zinc-700"
        } flex items-center justify-center p-2 rounded-lg right-[20px]`}
        onClick={handleNextClick}
      >
        &gt;
      </button>
    </div>
  );
};

export default Product;

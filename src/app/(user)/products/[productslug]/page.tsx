"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Image from "./components/Image";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "../../collections/Header/Header";
import DemoSlider from "./components/Slider";
import dataSlider from "./components/data.json";
import Reviewcards from "./components/reviewcards";
import { useParams } from "next/navigation";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { Spinner } from "@nextui-org/react";
import ProductNotFound from "@/components/404/404";

const radata = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];
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
  reviews: any[]; // Update to appropriate type if needed
  comments: any[]; // Update to appropriate type if needed
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: Image[];
}

export default function Product() {
  const params = useParams<{ productslug: string }>();
  const productslug = params.productslug;
  const [products, SetProducts] = useState<Product>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4; // Number of cards visible at a time
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, data.length + 2 - cardsPerView)
    );
  };
  const { data, isLoading, refetch , error} = useProductsViewQuery({ productslug });

  useEffect(() => {
    if (data) {
      SetProducts(data);
    }
  }, [data]);

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
        <Header id={productslug} />
        {error ? <ProductNotFound/> :  isLoading ? (
          <section className="w-full h-[100vh] flex flex-col items-center justify-center">
            <Spinner color="secondary"/>
          </section>
        ) : (
          <>
            <section className="post-section !pb-2 text-gray-900 grid container mmd:grid-cols-6 min-w-[100vw] gap-4 p-5 pt-0">
              <div className="PostCon col-span-7 mmd:col-span-4">
                <div className="flex flex-col">
                  <div className="postWrapper py-6 flex mmd:flex-wrap max-mmd:flex-col gap-3">
                    {products && products?.images && (
                      <Image images={products.images} />
                    )}
                  </div>
                </div>
              </div>
              <div className="sidebarWraper mb-[4rem] w-full col-span-7 mmd:col-span-2">
                {products && <Sidebar products={products}/>}
              </div>
            </section>
            <section className="w-full h-full py-10 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold text-center w-[450px]">
                What people say about Nassau
              </h1>
              <p>Don&apos;t just take our word for it.</p>
              <span className="flex flex-wrap gap-4 pt-10 items-center justify-center">
                <Reviewcards />
              </span>
            </section>
            <div className="slider-container relative w-full overflow-hidden">
              <span className="px-5 w-full flex items-center">
                <h1 className="text-2xl">You may also like</h1>
              </span>
              <div
                className="slider-wrapper flex transition-transform ease-in-out duration-500"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / cardsPerView)
                  }%)`,
                }}
              >
                {radata.map((item, index) => (
                  <div
                    className="slider-slide flex items-center justify-center p-4"
                    key={index}
                  >
                    <DemoSlider data={dataSlider} />
                  </div>
                ))}
              </div>
              <button
                className={`absolute top-0 h-[30px] w-[30px]   ${
                  currentIndex > 0
                    ? "bg-[#26262b]"
                    : "bg-[#0a0a0a] text-zinc-700"
                } flex items-center justify-center p-2 rounded-lg right-[60px] `}
                onClick={handlePrevClick}
              >
                &lt;
              </button>
              <button
                className={`absolute top-0 h-[30px] w-[30px]  ${
                  currentIndex < radata.length + 2 - cardsPerView
                    ? "bg-[#26262b]"
                    : "bg-[#0a0a0a] text-zinc-700"
                } flex items-center justify-center p-2 rounded-lg right-[20px]`}
                onClick={handleNextClick}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </ReactLenis>
    </>
  );
}

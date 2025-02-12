"use client";
import React, { useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { RecommendedProducts } from "@/app/(app)/(user)/collections/_components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BadgePercent } from "lucide-react";
import {
  ProductCard,
  ProductSkeleton,
  Skeleton,
} from "@/components/global/product-card";
import { useProductsViewQuery } from "@/lib/store/Service/api";
import { Product } from "@/types/product";

interface Slider {
  image: string;
  href: string;
}
interface events {
  title: string;
  description: string;
  color: string;
}
interface LandingPageProps {
  slider: Slider[];
  events: events[];
}

const LandingPage = ({ siteConfig }: { siteConfig: LandingPageProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useProductsViewQuery({page_size : 8});
  useEffect(() => {
    if (data) {
      setProducts(data.results);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center p-3 md:p-5 gap-3">
      <div className="w-full h-[45dvh] md:h-[60dvh]  flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="w-full md:w-[75%] h-full rounded-3xl relative">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={{ delay: 10000 }}
            loop={true}
            effect="fade"
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            style={{ margin: "0px" }}
            className="w-full h-[30dvh] md:h-full rounded-md"
          >
            {siteConfig.slider &&
              siteConfig.slider.map((data: Slider, index: number) => (
                <SwiperSlide key={index}>
                  <Data1 image={data.image} href={data.href} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="w-full md:w-[25%] h-full gap-3 flex flex-row md:flex-col">
          {siteConfig.events.length === 0 ? (
            <span
              className={cn(
                "w-full h-full bg-orange-500 rounded-md",
                siteConfig.events[0].color
              )}
            >
              <BadgePercent className="mt-1 ml-1" />
              {siteConfig.events[0] && (
                <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50">
                  <h3 className="text-white font-medium">
                    {siteConfig.events[0].title}
                  </h3>
                  {siteConfig.events[0].description && (
                    <p className="text-white/80 text-sm">
                      {siteConfig.events[0].description}
                    </p>
                  )}
                </div>
              )}
            </span>
          ) : (
            siteConfig.events.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={cn(
                  "w-full rounded-md overflow-hidden relative",
                  siteConfig.events.length === 1 ? "h-full" : "md:h-1/2"
                )}
              >
                <div className="absolute inset-0 bg-orange-500">
                  <BadgePercent className="mt-1 ml-1" />
                  {event.title && (
                    <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50">
                      <h3 className="text-white font-medium">{event.title}</h3>
                      {event.description && (
                        <p className="text-white/80 text-sm">
                          {event.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <section className="w-full h-full flex flex-col items-center py-5 gap-8 min-h-[630px]">
        <span className="text-center">
          <h1 className="text-4xl">Crafting Spiritual Journeys Since [1994]</h1>
          <p>Invoke Divinity in Your Space</p>
        </span>
          <ProductSkeleton className="w-full" loading={loading && products?.length > 0}>
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none",
                  loading && "pointer-events-none opacity-50 blur-sm"
                )}
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
                  >
                    <ProductCard data={product} base={Math.random() >= 0.5} />
                  </div>
                ))}
                {loading &&
                  Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={index} />
                  ))}
              </div>
          </ProductSkeleton>
      </section>
      <section className="w-full h-full flex flex-col items-center py-5 gap-3 min-h-[630px]">
        <span className="text-center">
          <h1 className="text-4xl">Drop of Best Collections</h1>
          <p>A flood of compliments</p>
        </span>
        <RecommendedProducts
          title=" "
          className="!px-0 mx-0 !py-0 mt-5 lg:mt-0"
          base="w-full !py-0"
        />
      </section>
      <section className="w-full h-full flex flex-col items-center lg:py-5 gap-3 lg:pb-5 lg:min-h-[630px]">
        <span className="text-center">
          <h1 className="text-4xl">Patan-Lalitpur</h1>
          <p>Visit us in Patan-Lalitpur, Nepal</p>
        </span>
        <div className="relative">
          <Image
            alt="store"
            src={"/store.jpg"}
            priority
            quality={100}
            width={700}
            height={400}
            sizes="100vw"
            className="w-dvw object-cover lg:!h-[600px] rounded-xl opacity-90"
          />
          <Button className="absolute left-2 bottom-2 backdrop-blur-sm dark:bg-white/50 bg-neutral-900/50">
            Visit us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

const Data1 = ({ image, href }: Slider) => {
  return (
    <Link
      href={href || ""}
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
    >
      <Image
        src={image || ""}
        sizes="100vw"
        quality={100}
        fill
        alt="href"
        className="w-full h-[85vh] object-cover"
      />
    </Link>
  );
};

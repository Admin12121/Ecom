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
import LogoAnimation, {
  AnimatedNumber,
} from "@/components/global/logo_animation";
import { Product } from "@/types/product";

interface ComponentSettings {
  visible: boolean;
  title: string;
  subtitle: string;
}

interface Components {
  products: ComponentSettings;
  trendingProducts: ComponentSettings;
  recentProducts: ComponentSettings;
  recommendedProducts: ComponentSettings;
  store: ComponentSettings;
}

interface SliderItem {
  image: string;
  href: string;
}

interface EventItem {
  title: string;
  description: string;
  color: string;
}

interface Messages {
  message: string;
  date: string;
}

interface SiteConfig {
  components: Components;
  slider: SliderItem[];
  events: EventItem[];
  messages: Messages;
}

const LandingPage = ({
  siteConfig,
  userCookie,
}: {
  siteConfig: SiteConfig;
  userCookie: boolean;
}) => {
  const { data, isLoading: loading } = useProductsViewQuery({ page_size: 8 });
  const products: Product[] = data?.results || [];
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(!userCookie);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      const increment = start < 70 ? 5 : 1;
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowAnimation(false);
            document.cookie = "showAnimation=false; path=/";
          }, 700);
        }, 500);
      } else {
        setProgress(start);
      }
    }, 30);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center p-3 md:p-5 gap-3">
      {showAnimation && (
        <div
          className={cn(
            "fixed h-dvh z-50 inset-0 flex justify-center items-center transition-opacity duration-500 backdrop-blur-3xl bg-neutral-950/90",
            fadeOut ? "opacity-0 blur-lg" : "opacity-100"
          )}
        >
          <LogoAnimation className="h-[85px] font-normal flex">
            Nepal Heritage Handicraft
            <AnimatedNumber
              className="w-36 flex justify-end"
              springOptions={{ bounce: 0, duration: 1000 }}
              value={progress}
            />
            %
          </LogoAnimation>
        </div>
      )}
      <div
        className={cn(
          "w-full h-[45dvh] md:h-[50dvh]  flex flex-col md:flex-row items-center justify-center gap-3 transition-all duration-500"
        )}
      >
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
              siteConfig.slider.map((data: SliderItem, index: number) => (
                <SwiperSlide key={index}>
                  <Link
                    href={data.href || ""}
                    className="w-full h-full flex items-center justify-center overflow-hidden relative"
                  >
                    <Image
                      src={data.image || ""}
                      sizes="100vw"
                      quality={100}
                      fill
                      alt="href"
                      className="w-full h-[85vh] object-cover"
                    />
                  </Link>
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
      {siteConfig.components.products.visible && (
        <section className="w-full h-full flex flex-col items-center py-5 gap-8 min-h-[630px] transition-all duration-500">
          <span className="text-center">
            <h1 className="text-4xl">{siteConfig.components.products.title}</h1>
            <p>{siteConfig.components.products.subtitle}</p>
          </span>
          <ProductSkeleton
            className="w-full"
            loading={loading && products?.length > 0}
          >
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
              <div className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq h-full">
                <Link
                  href="/collections"
                  className="relative w-full flex gap-5 h-full"
                >
                  <span
                    className={cn(
                      "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
                      "bg-neutral-200/50 hover:bg-white/50 dark:bg-neutral-950/50 dark:hover:bg-neutral-950 transition-all duration-300 cursor-pointer",
                      "flex flex-col gap-1 justify-center items-center backdrop-blur-2xl"
                    )}
                  >
                    <h1>Shop Everyday</h1>
                  </span>
                </Link>
              </div>
              {loading &&
                Array.from({ length: 4 }, (_, index) => (
                  <Skeleton key={index} />
                ))}
            </div>
          </ProductSkeleton>
        </section>
      )}
      {siteConfig.components.recommendedProducts.visible && (
        <section className="w-full h-full flex flex-col items-center py-5 gap-3 min-h-[630px]">
          <span className="text-center">
            <h1 className="text-4xl">
              {siteConfig.components.recommendedProducts.title}
            </h1>
            <p>{siteConfig.components.recommendedProducts.subtitle}</p>
          </span>
          <RecommendedProducts
            title=" "
            className="!px-0 mx-0 !py-0 mt-5 lg:mt-0"
            base="w-full !py-0"
          />
        </section>
      )}
      {siteConfig.components.store.visible && (
        <section className="w-full h-full flex flex-col items-center lg:py-5 gap-3 lg:pb-5 lg:min-h-[630px]">
          <span className="text-center">
            <h1 className="text-4xl">{siteConfig.components.store.title}</h1>
            <p>{siteConfig.components.store.subtitle}</p>
          </span>
          <div className="relative lg:!h-[600px]">
            <Image
              alt="store"
              src={"/store.jpg"}
              priority
              quality={100}
              width={700}
              height={400}
              sizes="100vw"
              className="w-dvw object-cover relative z-10 lg:!h-[600px] rounded-xl opacity-90"
            />
            <div className="absolute flex -z-[1px] top-0 w-full h-full animate-pulse bg-neutral-200 dark:bg-neutral-950/80 rounded-xl opacity-90"></div>
            <Button className="absolute left-2 bottom-2 backdrop-blur-sm dark:bg-white/50 bg-neutral-900/50">
              Visit us
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};
export default LandingPage;

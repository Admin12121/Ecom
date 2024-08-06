"use client";
import { Button } from "@nextui-org/react";
import { CardBox } from "./Card/card";
import { GlobeDemo } from "./Globe/globe";
import { InfiniteMovingCardsDemo } from "./Testimonial/testimonial";
import { useRouter } from "next/navigation";
import Store from "./Store";
import Parallex from "./Prallex/Parallex";
import LandingPage1 from "./LandingPages/LandingPage1";



export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <div className="relative h-full min-h-[100vh]">
        <div className="absolute flex-col inset-0 h-full w-full items-center dark:bg-black flex bg-white ">
          {/* <Parallex /> */}
          <LandingPage1 />
        </div>
      </div>
      <div className="relative min-h-[100vh]  flex-col flex items-center justify-center pt-5">
        <div className="w-full px-40 max-sm:px-5  h-96 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl">Welcome to our Store</h1>
          <p className="text-gray-500 text-lg">
            We take much joy and happiness in bringing wonderfully hand-curated
            Buddhist statues to Vajrayana practitioners. Buddhist statues with
            accurate iconography and details from the trans-Himalayan culture
            that has been dominant for more than 1400 years.
          </p>
          <p className="text-gray-500 text-lg">
            Explore our Handmade Statue Collection Categories.
          </p>
        </div>
        <div className="w-full flex-row flex p-8 items-center justify-center flex-wrap gap-x-10 gap-y-32">
          <CardBox image="/product.png" clasName="bg-neutral-950" />
          <CardBox image="/product1.png" />
          <CardBox image="/product.png" clasName="bg-neutral-950" />
          <CardBox image="/product1.png" />
        </div>
        <div className="flex">
          <Button onPress={() => router.push(`/collections`)}>
            Explore more
          </Button>
        </div>
      </div>
      <GlobeDemo />
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCardsDemo direction="right" />
        <InfiniteMovingCardsDemo direction="left" />
      </div>

      <section className="w-full flex flex-col items-center justify-center gap-10 py-5">
        <span className="w-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-center ">
            Patan Darbar Square
          </h1>
          <p className="text-2xl">Visit us in Patan , Nepal</p>
        </span>
        <Store />
      </section>
    </>
  );
}

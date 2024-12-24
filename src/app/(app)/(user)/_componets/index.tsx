"use client";
import React from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

const data = [
  {
    image: "/temp.png",
  },
  {
    image: "/store.jpg",
  },
];

const LandingPage1 = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center p-3 md:p-5 gap-3">
      <div className="w-full h-[35dvh] md:h-full  flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="w-full md:w-[75%] h-full rounded-3xl relative">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={{ delay: 10000 }}
            loop={true}
            effect="fade"
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            style={{ margin: "0px" }}
            className="w-full h-[20dvh] md:h-full rounded-md"
          >
            {data &&
              data.map((data: any, index: number) => (
                <SwiperSlide key={index}>
                  <Data1 image={data.image} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="w-full md:w-[25%] h-full gap-3 flex flex-row md:flex-col">
          <span className="w-full md:h-1/2 bg-orange-500 rounded-md"></span>
          <span className="w-full md:h-1/2 bg-orange-500 rounded-md"></span>
        </div>
      </div>
      <section className="w-full h-[65dvh] md:h-full flex flex-col items-center justify-center gap-3">

      </section>
    </div>
  );
};

export default LandingPage1;

const Data1 = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <Image
        src={image || ""}
        sizes="100vw"
        quality={100}
        fill
        alt="NextUI Album Cover"
        className="w-full h-[85vh] object-cover"
      />
    </div>
  );
};

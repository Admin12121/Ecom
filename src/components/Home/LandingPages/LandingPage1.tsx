import React from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Image, Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";

const data = [
  {
    image: "/Data1.jpg",
  },
  {
    image: "/Data2.jpg",
  },
  {
    image: "/Data3.jpg",
  },
  {
    image: "/Data4.jpg",
  },
];

const LandingPage1 = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-10">
        <div className="w-full h-full  rounded-3xl relative">
          {/* <Data1 /> */}
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={{ delay: 10000 }}
            loop={true}
            effect="fade"
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            style={{ margin: "0px" }}
          >
            {data &&
              data.map((data: any, index: number) => (
                <SwiperSlide key={index}>
                  <Data1 image={data.image}/>                   
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LandingPage1;

const Data1 = ({image}:{image:string}) => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
        <Image
          src={image}
          alt="NextUI Album Cover"
          className="w-[100vw] h-[85vh] object-cover"
        />
        <span className="absolute top-0 left-0 w-full h-full z-50 p-5 md:p-10">
          <h1 className="text-5xl font-bold absolute top-1/3 -translate-y-1/2  md:w-[40vw] text-neutral-300">
            We are digital meets World wide
          </h1>
          <p className="px-10 text-xl absolute top-1/2 -translate-y-1/2 text-neutral-300">
            Get Exclusive discount on your first Order
          </p>
          <p className="hidden mmd:block right-0 -translate-x-10 text-xl absolute bottom-0 -translate-y-[20vh] text-neutral-300">
            Best Collection of all Over the world
          </p>
          <span className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-2">
            <span className="flex items-center justify-center">
              <Button size="lg" className="rounded-3xl px-12 bg-white text-black">
                Start Shop
              </Button>
              <Button size="lg" isIconOnly radius="full" className="bg-white text-black">
                <GoArrowUpRight />
              </Button>
            </span>
            <p className="text-center">Top Collections</p>
          </span>
        </span>
      </div>
    </>
  );
};

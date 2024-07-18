"use client"; // <===== REQUIRED

import React from "react";
import { CiStar } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Image, Button } from "@nextui-org/react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
  return (
    <section className="w-full flex gap-5">
      <span className="relative w-[350px]flex flex-col h-[500px] m-0 bg-neutral-950 rounded-lg">
        <span className="absolute z-10 w-[320px] top-3 left-3 flex justify-between items-center h-5 ">
          <span className="w-[50px] h-full flex bg-zinc-300 rounded-md text-xs items-center justify-center text-black gap-1">4.5 <FaStar size={10}/> </span>
          <span className="h-full flex text-xs items-center justify-center"><IoIosHeartEmpty size={18} color="#fff"/></span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          // autoplay={{ delay: 5000 }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className="w-[350px] h-[400px] rounded-lg"
        >
          {data.map(({ id, image }) => (
            <SwiperSlide key={id}>
              <div className="h-full w-full left-0 top-0 bg-neutral-950 flex items-center justify-center">
                <Image
                  src={image}
                  isBlurred
                  className=" w-full cursor-pointer h-[350px]  object-contain"
                  alt="Image 1"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className=" w-full h-[100px] flex flex-col rounded-lg p-3 justify-between">
            <div className="flex gap-3 items-center">
              <div className="flex flex-col cursor-pointer">
                <p className="text-sm">Buddha Statue</p>
                <p className="text-xs text-slate-500">Buddha Statue</p>
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-sm">$ 12500</p>
              <Button               
              color="default"
              variant="shadow"
              radius="sm"
              size="sm"
              className=" h-[30px] flex justify-center items-center text-sm"><HiOutlineShoppingBag size={14}/>Add</Button>
            </div>
        </span>
      </span>
    </section>
  );
};

export default DemoSlider;

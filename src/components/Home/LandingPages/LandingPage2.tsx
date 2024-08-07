import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
const LandingPage2 = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center px-10 pb-10">
        <div className="w-full h-[85vh]  rounded-3xl relative overflow-hidden">
          <Image
            src={"/Data2.jpg"}
            alt="image"
            fill
            className="object-cover rounded-3xl"
          />
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent">
            <Button
              className="absolute left-3 top-3 pl-5 pr-1 flex items-center justify-center"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Discover more
              <GoArrowUpRight
                size="15"
                className="w-6 h-6 bg-white rounded-full p-1"
                color="black"
              />
            </Button>
            <Button
              className="absolute right-3 top-3 px-5 bg-white text-black"
              radius="lg"
              size="sm"
            >
              Exclusive offers on all products
            </Button>
            <span className="absolute bottom-0 left-0 w-full h-[250px] flex items-center justify-end pb-2 flex-col">
              <h1 className="absolute bottom-0 translate-y-12 text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-transparent text-[10vw] font-bold">
                Exclusive offers
              </h1>
              <span className="flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-3xl px-12 bg-white text-black"
                >
                  Start Shop
                </Button>
                <Button
                  size="lg"
                  isIconOnly
                  radius="full"
                  className="bg-white text-black"
                >
                  <GoArrowUpRight />
                </Button>
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default LandingPage2;

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";

const LandingPage3 = () => {
  return (
    <div className="w-full h-full flex items-center justify-center px-10 pb-10">
      <div className="w-full h-[85vh] p-10 rounded-3xl relative flex items-center justify-center transform-style-preserve-3d">
        <Image
          src="/product2.png"
          alt="image"
          fill
          priority 
          className="object-contain rounded-3xl !top-[5%] !left-1/2 !-translate-x-full !w-[45vw] md:!w-[350px] blur-[1px]"
        />
        <Image
          src="/product.png"
          alt="image"
          fill
          priority 
          className="object-contain rounded-3xl z-10"
        />
        <Image
          src="/product1.png"
          alt="image"
          fill
          priority 
          className="object-contain rounded-3xl !top-[5%] !w-[45vw] md:!w-[350px] !left-1/2 blur-[1px]"
        />
      </div>
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
        <span className="absolute bottom-20 left-0 w-full h-[250px] z-50 flex items-center justify-end pb-2 flex-col">
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
  );
};

export default LandingPage3;



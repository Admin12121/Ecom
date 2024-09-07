import Image from "next/image";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useState, useEffect } from "react";

const LandingPage3 = () => {
  const [currentClasses, setCurrentClasses] = useState([
    "image-front",
    "image-back-left",
    "image-back-right"
  ]);

  const images = [
    "/product2.png",
    "/product.png",
    "/product1.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClasses((prevClasses) => {
        const newClasses = [...prevClasses];
        newClasses.unshift(newClasses.pop()!);
        return newClasses;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-10 pb-10">
      <div className="w-full h-[85vh] p-10 rounded-3xl relative flex items-center justify-center transform-style-preserve-3d">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="image"
            fill
            priority
            className={`object-contain rounded-3xl transition-transform duration-1000 ${currentClasses[index]}`}
          />
        ))}
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
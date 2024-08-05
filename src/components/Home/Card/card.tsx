"use client"
import { useRef, useState } from "react";
import NextImage from "next/image";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import {HeartIcon} from './HeartIcon';
import { useCart } from '@/context/CartState';
interface Image {
  image?: string;
  clasName?: string;
}

export const  CardBox:React.FC<Image> = ({image, clasName}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  return (
        <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
         className={`relative flex w-80 flex-col rounded-xl ${clasName ? clasName : "" } text-white shadow-md `}>
        <span className="pointer-events-none absolute rounded-xl -inset-px opacity-0 transition duration-500" style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
        }}></span>
            <div className="relative mx-4 -mt-6 h-56 top-[-100px] rounded-xl bg-blue-gray-500 bg-clip-border ">
                <Image
                    isBlurred
                    as={NextImage}
                    width={400}
                    height={200}
                    src={image}
                    alt="NextUI Album Cover"
                    className="object-contain cursor-pointer h-[350px] top-0"
                    />
            </div>
            <div className="p-6">
              <span className="mb-2 flex justify-between items-center">
                <h5 className=" block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                   Tailwind card
                </h5>
                <Button isIconOnly aria-label="Like" className="w-5 top-[-10px] h-10">
                  <HeartIcon />
                </Button>    
              </span>
              <span className="flex gap-2">
                <Chip radius="sm" color="default">Full Gold Coted</Chip>
                <Chip radius="sm" color="default">Premium</Chip>
              </span>
                <p className="block mt-2 font-sans text-base font-light leading-relaxed text-inherit antialiased text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptatem obcaecati ad natus ex! Corporis,
                </p>
            </div>
            <div className="p-6 pt-0 flex justify-between items-center">
                <span className="cursor-pointer text-gray-300">
                  रू  120000
                </span>

                <Button color="secondary" className="cursor-pointer">
                  Add to Cart
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><g id="Iconly/Light/Buy" stroke="#fff" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><g id="Buy" transform="translate(2.000000, 2.500000)" stroke="#fff" strokeWidth="1.5"><path d="M0.7501,0.7499 L2.8301,1.1099 L3.7931,12.5829 C3.8701,13.5199 4.6531,14.2389 5.5931,14.2359094 L16.5021,14.2359094 C17.3991,14.2379 18.1601,13.5779 18.2871,12.6899 L19.2361,6.1319 C19.3421,5.3989 18.8331,4.7189 18.1011,4.6129 C18.0371,4.6039 3.1641,4.5989 3.1641,4.5989" id="Stroke-1"></path><line x1="12.1251" y1="8.2948" x2="14.8981" y2="8.2948" id="Stroke-3"></line><path d="M5.1544,17.7025 C5.4554,17.7025 5.6984,17.9465 5.6984,18.2465 C5.6984,18.5475 5.4554,18.7915 5.1544,18.7915 C4.8534,18.7915 4.6104,18.5475 4.6104,18.2465 C4.6104,17.9465 4.8534,17.7025 5.1544,17.7025 Z" id="Stroke-5" fill="#000000"></path><path d="M16.4347,17.7025 C16.7357,17.7025 16.9797,17.9465 16.9797,18.2465 C16.9797,18.5475 16.7357,18.7915 16.4347,18.7915 C16.1337,18.7915 15.8907,18.5475 15.8907,18.2465 C15.8907,17.9465 16.1337,17.7025 16.4347,17.7025 Z" id="Stroke-7" fill="#000000"></path></g></g></svg>
                </Button>  
            </div>

        </div>  
    )
}



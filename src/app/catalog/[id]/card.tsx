"use client"
import { useRef, useState } from "react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link  from "next/link";

interface Image {
  id: number;
  image?: string;
  clasName?: string;
 }

export const  CardBox:React.FC<Image> = ({image, id, clasName}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  console.log(clasName)

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
          className={`relative flex min-w-[250px] flex-col rounded-xl h-[255px] ${clasName ? clasName : "" } text-white shadow-md `}>
        <span className="pointer-events-none absolute rounded-xl -inset-px opacity-0 transition duration-500" style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
        }}></span>
            <Link href={`/catalog/${id}`} className="relative mx-4 -mt-6 h-56 top-[-50px] rounded-xl bg-blue-gray-500 bg-clip-border flex justify-center" >
                <Image
                    isBlurred
                    // as={NextImage}
                    width={200}
                    height={100}
                    src={image}
                    alt="NextUI Album Cover"
                    className="object-contain cursor-pointer h-[250px] top-0"
                    />
            </Link>
            <div className="p-6 absolute bottom-0 w-full">
              <span className="mb-2 flex justify-between items-center">
                <h5 className=" block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                   Tailwind card
                </h5>
              </span>
                <span className="cursor-pointer right-0 relative h-[15px] flex flex-col">
                  <p className="flex gap-1">
                        <svg width="20px"  height="20px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="Iconly/Bold/Star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="Star" transform="translate(1.999624, 2.500100)" fill="orange"  fillRule="nonzero">
                                  <path d="M15.9188758,11.82 C15.6598758,12.071 15.5408758,12.434 15.5998758,12.79 L16.4888758,17.71 C16.5638758,18.127 16.3878758,18.549 16.0388758,18.79 C15.6968758,19.04 15.2418758,19.07 14.8688758,18.87 L10.4398758,16.56 C10.2858758,16.478 10.1148758,16.434 9.93987581,16.429 L9.66887581,16.429 C9.57487581,16.443 9.48287581,16.473 9.39887581,16.519 L4.96887581,18.84 C4.74987581,18.95 4.50187581,18.989 4.25887581,18.95 C3.66687581,18.838 3.27187581,18.274 3.36887581,17.679 L4.25887581,12.759 C4.31787581,12.4 4.19887581,12.035 3.93987581,11.78 L0.32887581,8.28 C0.0268758104,7.987 -0.0781241896,7.547 0.0598758104,7.15 C0.19387581,6.754 0.53587581,6.465 0.94887581,6.4 L5.91887581,5.679 C6.29687581,5.64 6.62887581,5.41 6.79887581,5.07 L8.98887581,0.58 C9.04087581,0.48 9.10787581,0.388 9.18887581,0.31 L9.27887581,0.24 C9.32587581,0.188 9.37987581,0.145 9.43987581,0.11 L9.54887581,0.07 L9.71887581,5.32907052e-15 L10.1398758,5.32907052e-15 C10.5158758,0.039 10.8468758,0.264 11.0198758,0.6 L13.2388758,5.07 C13.3988758,5.397 13.7098758,5.624 14.0688758,5.679 L19.0388758,6.4 C19.4588758,6.46 19.8098758,6.75 19.9488758,7.15 C20.0798758,7.551 19.9668758,7.991 19.6588758,8.28 L15.9188758,11.82 Z"></path>
                              </g>
                          </g>
                         </svg>
                        5.0
                  </p>
                  <p className="absolute right-0">रू  120000</p>
                </span>
            </div>

        </div>  
    )
}



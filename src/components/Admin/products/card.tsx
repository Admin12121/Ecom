"use client";
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
interface ImageProps {
  id: number;
  image?: string;
  clasName?: string;
}

const Productcard: React.FC<ImageProps> = ({ image, id, clasName }) => {
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
    <article
    ref={divRef}
    onMouseMove={handleMouseMove}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className={`relative flex w-80 flex-col rounded-xl h-[355px] justify-end ${
      clasName ? clasName : ""
    } text-white shadow-md clone_element`}
  >
      <span
        className="pointer-events-none absolute rounded-xl -inset-px opacity-0 transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
        }}
      ></span>
      <span
        className={`h-[300px] flex w-full rounded-xlobject-cover rounded-2xl transition items-center justify-center shadow-none`}
      >
        <Image
          isBlurred
          src={image}
          alt="Product Image"
          className="object-contain cursor-pointer h-[250px]"
        />
      </span>

      <div className={`p-4 flex flex-col items-center ${ clasName ? "" : "text-default-900" }`}>
        <a href="#">
          <h3 className="text-lg font-light ">
            Finding the Journey
          </h3>
        </a>
        <p className="mt-2 line-clamp-3 text-xl font-semibold">
          $599
        </p>
      </div>
    </article>
  );
};

export default Productcard;

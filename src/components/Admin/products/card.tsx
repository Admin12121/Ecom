"use client";
import { useEffect, useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import { MdOutlineViewInAr } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme as useNextTheme } from 'next-themes';
import useAuth from  "@/context/AuthContext"
import { FormData , Variant} from "@/types/product";
interface ImageProps {
  products: FormData;
  clasName?: string;

}

interface Price {
  convertedPrice: number;
  symbol : string;
}

const Productcard: React.FC<ImageProps> = ({ products, clasName }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [dark ,setDark] =useState<boolean>(false)
  const { resolvedTheme } = useNextTheme();
  const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(null);

  const {convertPrice} = useAuth()

  useEffect(()=>{
    setDark(resolvedTheme === 'dark')
  },[resolvedTheme])


  useEffect(() => {
    if (products.variants) {
      setVariantsData(products.variants);
    }
  }, [products.variants]);

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

  const {product_name, images} = products

  const getVariantData = (
    variantsdata: Variant[] | Variant | null,
    key: keyof Variant,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsdata)) {
      return variantsdata.length > 0 ? variantsdata[index][key] : null;
    } else if (variantsdata) {
      return variantsdata[key];
    }
    return null;
  };

  const { convertedPrice, symbol } = convertPrice(getVariantData(variantsdata, 'price')) //  getVariantData(variants, 'size', 2); // if want to extract data from specific index when variant is in array
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  
  return (
    <article
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${ Array.isArray(products.variants) ? 'article-1' : ''} relative flex w-80 flex-col rounded-xl h-[355px] justify-end admin-view ${ clasName ? clasName : ""} text-white shadow-md clone_element`}
    >
      <div className="multi-button">
        <button className={`${dark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black shadow-md"}`}><MdOutlineViewInAr color={`${dark ? "#fff" : "#000"}`}/></button>
        <button className={`${dark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black shadow-md"}`} ><FiEdit color={`${dark ? "#fff" : "#000"}`}/></button>
        <button className={`${dark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black shadow-md"}`} ><AiOutlineDelete color={`${dark ? "#fff" : "#000"}`}/></button>
        <button className={`${dark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black shadow-md"}`} ></button>
      </div>
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
          src={images[0]?.image}
          alt="Product Image"
          className="object-contain cursor-pointer h-[250px]"
        />
      </span>

      <div
        className={`p-4 flex flex-col items-center ${
          clasName ? "" : "text-default-900"
        }`}
      >
          <h3 className="text-lg font-light ">{truncateText(product_name, 25)}</h3>
        <p className="mt-2 line-clamp-3 text-lg font-semibold">{symbol} {convertedPrice}</p>
      </div>
    </article>
  );
};

export default Productcard;

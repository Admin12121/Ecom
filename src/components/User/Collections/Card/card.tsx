"use client";
import { useRef,useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useCart } from "@/context/CartState";
import { FormData, Variant } from "@/types/product";
import useAuth from  "@/context/AuthContext"
import { encryptproduct } from "@/lib/transition";
import { useRouter } from 'next/navigation'

interface Image {
  product?:FormData;
  clasName?: string;
}

const CardBox: React.FC<Image> = ({
  product,
  clasName,
}) => {
  const { addToCart } = useCart();
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(null);
  const { convertPrice, isLoggedIn } = useAuth()
  const router = useRouter();

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

  useEffect(() => {
    if (product?.variants) {
      setVariantsData(product!.variants);
    }
  }, [product?.variants]);

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
  const { convertedPrice, symbol } = convertPrice(getVariantData(variantsdata, 'price'))
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const variantId = getVariantData(variantsdata, 'id')

  const handleenc = async () => {
    if (isLoggedIn){
      const data = [{
        "id": product?.id,
        "variantId": variantId,
        "pcs": 1,      
      }];
      await encryptproduct(data, router);
    }else{
      router.push(`/login`);
    }
  };
  return (
    <div
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
      <span className="main-content">
        <span
          className="pointer-events-none animation-background absolute rounded-xl -inset-px opacity-0 transition duration-500"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
          }}
        ></span>
        <Link
          href={`/products/${product?.productslug}`}
          className="mx-4 -mt-6 w-[288px] flex justify-center h-[350px] relative rounded-xl bg-blue-gray-500 bg-clip-border "
        >
          <Image
            isBlurred
            width={400}
            height={200}
            src={product?.images[0].image}
            alt="NextUI Album Cover"
            className="object-contain cursor-pointer h-[350px] top-0"
          />
        </Link>
        <div className="p-6">
          <span className="mb-2 flex justify-between items-center">
            <h5 className=" block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {truncateText(product!.product_name, 25)}
            </h5>
          </span>
          <span className="cursor-pointer right-0 relative h-[15px] flex">
            <p className="flex gap-1 text-gray-300">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Iconly/Bold/Star"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Star"
                    transform="translate(1.999624, 2.500100)"
                    fill="orange"
                    fillRule="nonzero"
                  >
                    <path d="M15.9188758,11.82 C15.6598758,12.071 15.5408758,12.434 15.5998758,12.79 L16.4888758,17.71 C16.5638758,18.127 16.3878758,18.549 16.0388758,18.79 C15.6968758,19.04 15.2418758,19.07 14.8688758,18.87 L10.4398758,16.56 C10.2858758,16.478 10.1148758,16.434 9.93987581,16.429 L9.66887581,16.429 C9.57487581,16.443 9.48287581,16.473 9.39887581,16.519 L4.96887581,18.84 C4.74987581,18.95 4.50187581,18.989 4.25887581,18.95 C3.66687581,18.838 3.27187581,18.274 3.36887581,17.679 L4.25887581,12.759 C4.31787581,12.4 4.19887581,12.035 3.93987581,11.78 L0.32887581,8.28 C0.0268758104,7.987 -0.0781241896,7.547 0.0598758104,7.15 C0.19387581,6.754 0.53587581,6.465 0.94887581,6.4 L5.91887581,5.679 C6.29687581,5.64 6.62887581,5.41 6.79887581,5.07 L8.98887581,0.58 C9.04087581,0.48 9.10787581,0.388 9.18887581,0.31 L9.27887581,0.24 C9.32587581,0.188 9.37987581,0.145 9.43987581,0.11 L9.54887581,0.07 L9.71887581,5.32907052e-15 L10.1398758,5.32907052e-15 C10.5158758,0.039 10.8468758,0.264 11.0198758,0.6 L13.2388758,5.07 C13.3988758,5.397 13.7098758,5.624 14.0688758,5.679 L19.0388758,6.4 C19.4588758,6.46 19.8098758,6.75 19.9488758,7.15 C20.0798758,7.551 19.9668758,7.991 19.6588758,8.28 L15.9188758,11.82 Z"></path>
                  </g>
                </g>
              </svg>
              {product?.rating}{`(${product?.total_ratings} review)`}
            </p>
            <p className="absolute right-0 text-gray-300">{symbol} {convertedPrice}</p>
          </span>
        </div>
        <div className="p-6 pt-0 flex justify-between items-center">
          <Button
            color="secondary"
            className="cursor-pointer text-white bg-transparent"
            onClick={(event) => addToCart(product!.id, event, variantId)}
            variant="flat"
          >
            Add to Cart
          </Button>
          <Button color="secondary" className="cursor-pointer " onClick={handleenc}>
            Buy Now
          </Button>
        </div>
      </span>
    </div>
  );
};

export default CardBox;
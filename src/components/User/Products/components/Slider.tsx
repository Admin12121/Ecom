"use client";
import React, { useState, useEffect } from "react";
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
import useAuth from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Image {
  image: string;
}

interface VariantObject {
  id: number;
  product_stripe_id: string | null;
  size: string | null;
  price: string;
  discount: string;
  stock: number;
  product: number;
}

interface Product {
  id: number;
  categoryname: string;
  subcategoryname: string;
  reviews: any[]; // Update to appropriate type if needed
  comments: any[]; // Update to appropriate type if needed
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: Image[];
}

interface DemoSliderProps {
  data: Product;
  width?: string | null;
}

const DemoSlider: React.FC<DemoSliderProps> = ({ data, width }) => {
  const router = useRouter();
  const { convertPrice } = useAuth();
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [variantsData, setVariantsData] = useState<
    VariantObject[] | VariantObject | null
  >(null);

  useEffect(() => {
    if (data?.variants) {
      setVariantsData(data.variants);
    }
  }, [data]);

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      console.log(variantsData);
      // const variant = variantsData.find((variant) => variant.id === index);
      const variant = variantsData[index];
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };
  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price")
  );
  const handleRoute = () => {
    router.push(`/collections?category=${data?.categoryname}`);
  };
  const productslug = data.productslug;
  return (
    <section className="relative w-full flex gap-5">
      <span className={`${width ? `w-full` : "w-[350px]" } relative flex flex-col h-[500px] m-0 bg-neutral-950 rounded-lg `}>
        <span className={`absolute z-10 ${width ? `w-full ` : "w-[350px]" } px-3 top-3 flex justify-between items-center h-5 `}>
          <span className="w-[50px] h-full flex bg-zinc-300 rounded-md text-xs items-center justify-center text-black gap-1">
            4.5 <FaStar size={10} />{" "}
          </span>
          <span className="h-full flex text-xs items-center justify-center">
            <IoIosHeartEmpty size={18} color="#fff" />
          </span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          // autoplay={{ delay: 5000 }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className={`${width ? `w-full` : "w-[350px]" } h-[400px] rounded-lg`}
        >
          {data &&
            data?.images &&
            data.images.map((data: Image, index: number) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full left-0 top-0 bg-neutral-950 flex items-center justify-center">
                  <Link href={`/products/${productslug}`}>
                    <Image
                      src={data.image}
                      isBlurred
                      className=" w-full cursor-pointer h-[350px]  object-contain"
                      alt="Image 1"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <span className=" w-full h-[100px] flex flex-col rounded-lg p-3 justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs text-slate-500" onClick={handleRoute}>
                {data.categoryname}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <p className="text-sm">
              {symbol} {convertedPrice}
            </p>
            <Button
              color="default"
              variant="shadow"
              radius="sm"
              size="sm"
              className=" h-[30px] flex justify-center items-center text-sm"
            >
              <HiOutlineShoppingBag size={14} />
              Add
            </Button>
          </div>
        </span>
      </span>
    </section>
  );
};

export default DemoSlider;

"use client";
import React,{useState} from "react";
import { useParams } from "next/navigation";
import Header from "../../collections/Header/Header";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import Link from 'next/link'
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import Star from "./star";
import { ReactLenis, useLenis } from "lenis/react";
import NextImage from "next/image";
import Review_data from "./Tab";
import { CardBox } from "./card";
import Slider from "react-slick";
import { 
  FacebookShareButton, 
  FacebookIcon, 
  InstapaperShareButton,
  InstagramIcon,
  WhatsappShareButton, 
  WhatsappIcon, 
} from 'next-share'; 
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api";

const radata = [
  {
    id: 1,
    img: "/product1.png",
  },
  {
    id: 2,
    img: "/product.png",
  },
  {
    id: 3,
    img: "/product2.png",
  },
  {
    id: 4,
    img: "/product.png",
  },
  {
    id: 5,
    img: "/product1.png",
  },
  {
    id: 6,
    img: "/product2.png",
  },
  {
    id: 7,
    img: "/product1.png",
  },
  {
    id: 8,
    img: "/product.png",
  },
];

export default function Product() {
  const params = useParams<{ productslug: string }>();
  const productslug = params.productslug;
  const [products, SetProducts] = useState()
  // const filteredData = data.filter((event: any) => event.id.toString() === id);
  const { data, isLoading, refetch } = useProductsViewQuery({productslug});
  console.log(data)
  defineElement(lottie.loadAnimation);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
        <div className="w-[100vw] min-h-[100vh] flex flex-col">
          <Header id='12' />
          <div className="relative flex gap-5 mmd:h-[90vh] p-10 w-[100vw] rounded-xl bg-blue-gray-500 bg-clip-border justify-between max-mmd:flex-col ">
            <div className="flex mmd:w-[60%] flex-col gap-2 max-mmd:items-center">
              <Image
                isBlurred
                as={NextImage}
                width={500}
                height={300}
                // src={filteredData && filteredData[0].img}
                alt="NextUI Album Cover"
                className="object-contain cursor-pointer h-[450px] top-0"
              />
              <span className="w-full flex h-[100px] p-1 gap-2">
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  // src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover"
                  style={{ border: "1px solid #ffffff29" }}
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  // src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover"
                  style={{ border: "1px solid #ffffff29" }}
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  // src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover"
                  style={{ border: "1px solid #ffffff29" }}
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  // src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover"
                  style={{ border: "1px solid #ffffff29" }}
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <span
                  style={{ border: "1px solid #ffffff29" }}
                  className="flex justify-center items-center bg-[#1a1a1a] cursor-pointer h-[100px] w-[100px] rounded-[10px] top-0 "
                >
                  <p className="text-xs cursor-pointer">+ 4 more</p>
                </span>
              </span>
            </div>
            <div className="flex mmd:w-[40%] flex-row h-4/5">
              <Card className="  w-full bg-transparent border-none">
                <CardHeader className="flex gap-3 justify-between">
                  <div className="flex gap-3 items-center">
                    <Image
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                      width={40}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">E-com</p>
                    </div>
                  </div>
                  <div className="text-foreground/50 flex gap-2 items-center">
                    <span className="flex items-center">
                    <lord-icon
                        trigger="hover"
                        src="https://cdn.lordicon.com/ercyvufy.json"
                        colors="primary:#ffffff"
                        style={{
                          width: "24px",
                          cursor: "pointer",
                          height: "24px",
                        }}
                      ></lord-icon>
                    </span>
                    <FacebookShareButton
                      url={'https://github.com/next-share'}
                      quote={'next-share is a social share buttons for your next React apps.'}
                      hashtag={'#nextshare'}
                      blankTarget={true}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={'https://github.com/next-share'}
                      title={'next-share is a social share buttons for your next React apps.'}
                      separator=":: "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                </CardHeader>
                <CardBody className="p-4 gap-5 flex-initial ">
                  <span className="flex flex-col gap-5">
                    <h1 className="" style={{ fontSize: "30px" }}>
                      Make beautiful websites
                    </h1>
                    <span className="flex gap-1">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <p style={{ fontSize: "14px" }}>42 review</p>
                    </span>
                  </span>
                  <div className="varient w-full flex flex-col gap-3">
                    <h2>Size :</h2>
                    <span className="flex gap-2 ">
                      <Button color="default" variant="shadow">
                        38.5cm x 30cm
                      </Button>
                      <Button color="default" isDisabled  variant="shadow">
                        15.2 x 11.8 Inches
                      </Button>
                    </span>
                  </div>
                  <span className="w-full flex gap-5 items-center">
                    <h2 className="text-2xl">Price :</h2>
                  <span className="text-2xl">$100</span>
                  <span className="text-2xl text-zinc-700"><del>$150</del></span>
                  </span>
                    <Chip variant="dot" radius="sm" size="lg" color="success">In stock</Chip>
                </CardBody>
                <CardFooter className="gap-5">
                  <Button
                    color="default"
                    variant="shadow"
                    className="w-full h-[50px]"
                    startContent={
                      <lord-icon
                        trigger="hover"
                        src="https://cdn.lordicon.com/mfmkufkr.json"
                        colors="primary:#ffffff"
                        style={{
                          width: "24px",
                          cursor: "pointer",
                          height: "24px",
                        }}
                      ></lord-icon>
                    }
                  >
                    Add to Card
                  </Button>
                  <Button
                    color="secondary"
                    variant="shadow"
                    className="w-full h-[50px]"
                    startContent={
                      <lord-icon
                        trigger="hover"
                        src="https://cdn.lordicon.com/evyuuwna.json"
                        colors="primary:#ffffff"
                        style={{
                          width: "24px",
                          cursor: "pointer",
                          height: "24px",
                        }}
                      ></lord-icon>
                    }
                  >
                    Buy Now
                  </Button>
                  <Button
                    isIconOnly
                    className="h-[50px] w-[50px]"
                    color="default"
                    aria-label="Like"
                  >
                    <lord-icon
                      trigger="hover"
                      src="https://cdn.lordicon.com/xyboiuok.json"
                      colors="primary:#ffffff"
                      style={{
                        width: "30px",
                        cursor: "pointer",
                        height: "30px",
                      }}
                    ></lord-icon>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="min-h-[50vh] mmd:max-w-[50%] p-10">
            <Review_data />
          </div>
          <div className="flex gap-4 h-[60vh] w-full items-center p-10 flex-col">
            <span className="flex w-full justify-between">
              <h1>You may Also Like</h1>
              <Link href="/collections" color="foreground">View All</Link>
            </span>
            <Slider {...settings}>
              {radata.map(({ img, id }: { img: string; id: number }, index:number) => (
                <>
                  <div key={index}>
                    <CardBox
                      id={id}
                      clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}
                      image={img}
                    />
                  </div>
                </>
              ))}
            </Slider>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

"use client";
import React from "react";
import { useParams } from "next/navigation";
import Header from "../Header/Header";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import Star from "./star";
import { ReactLenis, useLenis } from "lenis/react";
import NextImage from "next/image";
import Review_data from "./Tab";
import { CardBox } from "./card";
import Slider from "react-slick";
const data = [
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
  const params = useParams<{ id: string }>();
  const id = params.id;
  const filteredData = data.filter((event: any) => event.id.toString() === id);
  function setProductViewTransition(id: any) {
    document.documentElement.style.setProperty(
      "--view-transition-name",
      `product-${id}`
    );
    document.documentElement.style.setProperty("--product-id", id);
  }

  setProductViewTransition(filteredData[0].id);
  defineElement(lottie.loadAnimation);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows:false,
    responsive:[
      {
        breakpoint :1540,
        settings:{
          slidesToShow: 5,
        },
      },
    ]
  };

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
        <div className="w-[100vw] min-h-[100vh] flex flex-col">
          <Header id={id} />
          <div className="relative flex gap-5 h-[90vh] p-10 w-[100vw] rounded-xl bg-blue-gray-500 bg-clip-border justify-between">
            <div className="flex flex-col gap-2">
              <Image
                isBlurred
                as={NextImage}
                width={500}
                height={300}
                src={filteredData && filteredData[0].img}
                alt="NextUI Album Cover"
                className="object-contain cursor-pointer h-[450px] top-0"
              />
              <span className="w-full flex h-[100px] p-1 gap-2">
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover" 
                  style={{border:"1px solid #ffffff29"}} 
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover" 
                  style={{border:"1px solid #ffffff29"}} 
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover" 
                  style={{border:"1px solid #ffffff29"}} 
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <Image
                  isBlurred
                  as={NextImage}
                  width={100}
                  height={100}
                  src={filteredData && filteredData[0].img}
                  alt="NextUI Album Cover"
                  style={{border:"1px solid #ffffff29"}} 
                  className="object-contain bg-[#1a1a1aa8] cursor-pointer h-[100px] top-0 "
                />
                <span style={{border:"1px solid #ffffff29"}}  className="flex justify-center items-center bg-[#1a1a1a] cursor-pointer h-[100px] w-[100px] rounded-[10px] top-0 ">
                    <p className="text-xs cursor-pointer">+ 4 more</p>
                </span>
              </span>
            </div>
            <div className="flex flex-row h-4/5">
              <Card className=" mmd:min-w-[600px] max-w-[700px] bg-transparent border-none">
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
                  <div className="text-foreground/50">
                    <h1>product-name</h1>
                  </div>
                </CardHeader>
                <CardBody className="p-4 gap-5">
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
                  <span className="text-5xl">$100</span>
                </CardBody>
                <CardFooter className="gap-5">
                  <Button
                    color="default"
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
          <div className="min-h-[50vh] max-w-[50%] p-10">
            <Review_data/>
          </div>
          <div className="flex gap-4 h-[60vh] w-full items-center p-10">
            <Slider {...settings}>
              {data.map(({img, id}:{img:string, id: number},index)=>(
                <>
                <div key={index}> 
                  <CardBox id={id} clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}  image={img}/>
                </div>
              </>))}
            </Slider>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

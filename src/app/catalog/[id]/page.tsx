"use client";
import React from "react";
import { useParams } from "next/navigation";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import Header from "../Header/Header";

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

export default function product() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const filteredData = data.filter((event: any) => event.id.toString() === id);
  function setProductViewTransition(id:any) {
    document.documentElement.style.setProperty('--view-transition-name', `product-${id}`);
    document.documentElement.style.setProperty('--product-id', id);
  }
  
  setProductViewTransition(filteredData[0].id);
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col">
      <Header id={id}/>
            <div className="relative h-[100vh] p-5 w-[100vw] rounded-xl bg-blue-gray-500 bg-clip-border " >
                <Image
                isBlurred
                // as={NextImage}
                width={500}
                height={300}
                src={filteredData && filteredData[0].img}
                alt="NextUI Album Cover"
                className="object-contain cursor-pointer h-[450px] top-0"
                />
            </div>
      </div>
    </>
  );
}
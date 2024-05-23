"use client"
import React, { useState , useEffect} from 'react';
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export default function  ImageSider () {
  const slides = [
    {
      url: '/img.jpg',
    },
    {
      url: '/img2.jpg',
    },
    {
      url: '/img.jpg',
    },
    {
      url: '/img1.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, 4000);
      
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, isHovered]);

  return (
    <div className='max-w-[1300px] h-[720px] sm:h-[400px] w-full m-auto pt-16 px-4 relative group'>
      <div className='w-full flex items-center justify-center h-full rounded-2xl bg-center bg-cover duration-500' onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <Image
            isBlurred
            as={NextImage}
            width={1400}
            height={500}
            src={`${slides[currentIndex].url}`}
            alt="NextUI Album Cover"
            className="w-[90vw!important] h-[50vh] sm:h-[80vh] object-cover"
            />
      </div>
      <div className='hidden sm:block z-50 group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <svg stroke="currentColor" onClick={prevSlide} fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"></path></svg>
      </div>
      <div className='hidden sm:block z-50  group-hover:block  absolute top-[55%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <svg stroke="currentColor" onClick={nextSlide} fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671"></path></svg>
      </div>
    </div>
  );
}

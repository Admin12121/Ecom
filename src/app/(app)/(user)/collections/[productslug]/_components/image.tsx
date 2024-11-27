import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Images {
  image: string;
}

const DemoSlider = ({
  images,
  discount,
}: {
  images: Images[];
  discount?: string;
}) => {
  return (
    <section className="w-full flex items-center justify-center ">
      <span className="relative w-[95dvw] flex flex-col h-[500px] m-0 dark:bg-neutral-950 rounded-lg">
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className="w-full h-[500px] rounded-lg"
        >
          {images.map(({ image }: { image: string }) => (
            <SwiperSlide key={Math.random()}>
              <div className="h-full w-full left-0 top-0 bg-neutral-950 flex items-center justify-center">
                <Image
                  src={image}
                  className=" w-full cursor-pointer h-[350px]  object-contain"
                  alt="Image 1"
                  width={800}
                  height={800}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </span>
    </section>
  );
};

export default function Page({ images }: { images: Images[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <DemoSlider images={images} />
      ) : (
        images.map(({ image }: { image: string }, index) => (
          <span
            key={index}
            className="relative mmd:w-[49%] bg-white dark:bg-neutral-950 flex items-center justify-center rounded-xl p-3"
          >
            {index == 0 && (
              <span className="absolute bg-neutral-100 dark:bg-secondary-500 text-secondary-foreground top-[10px] left-[10px] h-[20px] w-[60px] flex  rounded-md text-xs items-center justify-center gap-1 font-semibold">
                50% Off
              </span>
            )}
            <Image
              className="w-full h-[500px] object-contain"
              src={image}
              alt={`image ${index + 1}`}
              width={800}
              height={800}
            />
          </span>
        ))
      )}
    </>
  );
}

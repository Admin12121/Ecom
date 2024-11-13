import * as React from "react";

import { Section, Container } from "@/components/costum/craft";
import { ProductCard } from "@/components/global/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/costum/carousel";


const FeatureNine = ({ products }: { products: any }) => {
  return (
    <Section>
      <Container>
        <div className="px-5 w-full flex items-center absolute mt-2">
          <h2 className="text-2xl">You may also like</h2>
        </div>
        <Carousel className="mt-6 w-full">
          <CarouselContent className="-ml-1 mt-5">
            {products.map((product: any, index: any) => (
              <div
                className={`slider-slide flex items-center justify-center p-4 ${index === 0 ? 'w-[350px] md:w-[600px]' : ''} transition duration-500 ease-in-out`}
                key={index}
              >
                <ProductCard data={product} width={index === 0 ? 'w-[500px]' : 'w-[390px]'}/>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-0 h-[30px] w-[30px] flex items-center justify-center p-2 rounded-lg right-[60px] left-auto" />
          <CarouselNext className="absolute top-0 h-[30px] w-[30px] flex items-center justify-center p-2 rounded-lg right-[20px]" />
        </Carousel>
      </Container>
    </Section>
  );
};

export default FeatureNine;

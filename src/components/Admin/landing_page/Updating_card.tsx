"use client";
import React from "react";
import { Carousel, Card } from "./Carousel_card/apple-cards-carousel";

interface ImageData {
    image_id: string;
    image: string;
    links: {id: number, link: string}[];
    titles: {id: number, title: string}[];
    link_no: number;
    title_no: number;
  }
  
  interface TitleFormProps {
    slug: string;
    initialData: ImageData[];
    refetch: any;
  }

export function AppleCardsCarouselDemo({ slug, initialData, refetch }: TitleFormProps) {

  return (
    <div className="w-full h-full py-20">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
        {initialData.map((card, index) => (
                <Card slug={slug} key={index} card={card} index={index} layout={true} />
            ))}
      </div>
    </div>
  );
}

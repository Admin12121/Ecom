"use client";
import React from "react";
import { Card } from "./Carousel_card/apple-cards-carousel";

interface ImageData {
    id: number;
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
    no_image: number;
  }

export function AppleCardsCarouselDemo({ slug, initialData, refetch, no_image }: TitleFormProps) {
  const gridColsClass = no_image === 1 ? "grid-cols-1" : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3";

  return (
    <div className="w-full h-full py-20">
            <div className={`grid ${gridColsClass} gap-2`}>
        {initialData.map((card, index) => (
                <Card slug={slug} refetch={refetch} key={index} card={card} index={index} layout={true} />
            ))}
      </div>
    </div>
  );
}

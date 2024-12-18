import React from "react";
import { ReviewsImage } from "@/types/product";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export interface Review {
  id: number;
  user: number;
  rating: number;
  title: string;
  content: string;
  recommended: boolean;
  delivery: boolean;
  review_images: ReviewsImage[];
  created_at: string;
}

const ReviewCard = ({ reviewData }: { reviewData: Review[] }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
      {reviewData.map((review: Review) => (
        <Card
          className="mb-2 break-inside-avoid flex flex-col gap-1 p-1 !bg-transparent w-full min-w-[300px]"
          key={Math.random()}
        >
          <CardHeader className="flex flex-col px-2 bg-white dark:bg-neutral-900 shadow  rounded-lg">
            <span className="flex items-center justify-between">
              <span>
                {" "}
                {[...Array(review.rating)].map((_, index) => (
                  <span key={index}>★</span>
                ))}{" "}
              </span>{" "}
              <p className="text-xs">
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                })}
              </p>
            </span>
            <span className="flex flex-col pb-2">
              <h1 className="text-sm font-normal">{review.title}</h1>
              <p className="text-xs font-light">{review.content}</p>
            </span>
          </CardHeader>
          {review?.review_images[0]?.image && (
            <Image
              src={review.review_images[0].image}
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              alt={review.title}
              className="w-full !h-[390px] object-cover rounded-lg overflow-hidden bg-neutral-800"
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default ReviewCard;

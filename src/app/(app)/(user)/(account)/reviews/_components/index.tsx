"use client";
import React, { useDeferredValue } from "react";
import { useGetUserReviewQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Card, CardHeader } from "@/components/ui/card";
import { ReviewsImage } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

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
  product_image: string;
  product_name: string;
  category_name: string;
  productslug: string;
}

const Reviews = () => {
  const { accessToken } = useAuthUser();
  const { data, isLoading } = useGetUserReviewQuery(
    { token: accessToken },
    { skip: !accessToken }
  );



  return (
    <div className="">
      <ReviewsCard loading={isLoading}>
        {data &&
          data?.results.map((review: Review) => (
            <Card className="mb-4 break-inside-avoid flex flex-col gap-1 p-1" key={Math.random()}>
              <Link href={`/collections/${review.productslug}`} className=" flex flex-row gap-2 bg-white dark:bg-neutral-800 p-1 rounded-lg">
                <Image
                  src={review.product_image}
                  alt="product"
                  width={70}
                  height={70}
                  className="rounded-md object-cover p-1 px-3 bg-zinc-950"
                />
                <span className="flex flex-col">
                  <p className="text-sm">{review.product_name}</p>
                  <p className="text-xs text-zinc-400">
                    {review.category_name}
                  </p>
                </span>
              </Link>
              <div className="bg-white dark:bg-neutral-900 shadow rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between px-1">
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
                </CardHeader>
                {review?.review_images[0]?.image && (
                  <span className="flex px-1">
                    <Image
                      src={review.review_images[0].image}
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt={review.title}
                      className="w-full h-full object-contain rounded-lg bg-neutral-800"
                    />
                  </span>
                )}
                <span className="flex flex-col p-2">
                  <h1 className="text-sm font-normal">{review.title}</h1>
                  <p className="text-xs font-light">{review.content}</p>
                </span>
              </div>
            </Card>
          ))}
      </ReviewsCard>
    </div>
  );
};

export const Skeleton = () => {
  return (
    <section className="w-[350px] p-1 h-full flex flex-col gap-1 rounded-lg">
      <div className="w-full flex flex-col gap-1 animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[390px] rounded-lg p-1">
        <span className="w-full flex flex-row justify-between">
          <span className="animate-pulse w-32 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
          <span className="animate-pulse w-16 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
        <span className="animate-pulse w-full h-full rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        <span className="animate-pulse w-full h-28 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
      </div>
    </section>
  );
};

const ReviewsCard = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  const load = useDeferredValue(loading);
  if (load)
    return (
      <div className="flex flex-wrap ">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">{children}</div>
  );
};

export default Reviews;

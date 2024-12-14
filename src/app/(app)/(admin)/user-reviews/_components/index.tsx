"use client";
import React, { useState, useDeferredValue, useEffect } from "react";
import { useGetUserReviewQuery } from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Card, CardHeader } from "@/components/ui/card";
import { ReviewsImage } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Kbd from "@/components/ui/kbd";

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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [star, setStar] = useState("0");
  const [filter, setFilter] = useState("relevant");
  const deferredSearch = useDeferredValue(search);
  const { data, isLoading } = useGetUserReviewQuery(
    {
      token: accessToken,
      page: page,
      page_size: pageSize,
      star,
      filter,
      search: deferredSearch,
    },
    { skip: !accessToken }
  );
  const [reviewData, setReviewData] = useState<Review[] | null>(null);
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setReviewData(data.results);
      } else {
        setReviewData((prevData) => [...(prevData || []), ...data.results]);
      }
    }
  }, [data]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="h-screen space-y-3 px-3">
      <div className="flex justify-between w-full md:items-center md:flex-row flex-col">
        <h1>Reviews</h1>
        <span className="flex gap-2 md:flex-row flex-col">
          <div
            className={`relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg`}
          >
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className=" dark:bg-neutral-800 pl-8 border-0 focus:outline-none focus-visible:ring-0"
            />
            <Kbd
              keys={["command"]}
              className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
            ></Kbd>
          </div>
          <Select
            defaultValue="0"
            onValueChange={(value: string) => setStar(value)}
          >
            <SelectTrigger className="md:w-40 dark:bg-[#171717]">
              <SelectValue placeholder="Select a Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Read all</SelectItem>
                {["1", "2", "3", "4", "5"].map((num, index) => (
                  <SelectItem key={index + 1} value={num}>
                    {"★".repeat(Number(num))}
                    {"★".repeat(5 - Number(num)).replace(/./g, "")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            defaultValue="recent"
            onValueChange={(value: string) => setFilter(value)}
          >
            <SelectTrigger className="md:w-40 dark:bg-[#171717]">
              <SelectValue placeholder="Select a Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="relevent">Oldest</SelectItem>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="rating">By Rating</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
      </div>
      <ReviewsCard loading={isLoading}>
        {reviewData && reviewData.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
            {reviewData.map((review: Review) => (
              <Card
                className="mb-2 break-inside-avoid flex flex-col gap-1 p-1"
                key={Math.random()}
              >
                <Link
                  href={`/collections/${review.productslug}`}
                  className=" flex flex-row gap-2 bg-white dark:bg-neutral-800 p-1 rounded-lg"
                >
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
          </div>
        ) : (
          <span className="space-y-2 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl">Reviews</h1>
            <p>Your account has no reviews. Yet.</p>
            <Button>Shop Now</Button>
          </span>
        )}
      </ReviewsCard>
      {data?.next && <div className="flex justify-center">
        <Button onClick={handleShowMore}>Show More</Button>
      </div>}
    </div>
  );
};

export const Skeleton = () => {
  return (
    <section className="w-full p-1 h-full flex flex-col gap-1 rounded-lg">
      <div className="w-full flex flex-col gap-1 animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[390px] rounded-lg p-1">
        <span className="w-full flex flex-row gap-1">
          <span className="animate-pulse w-20 h-20 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  return <>{children}</>;
};

export default Reviews;

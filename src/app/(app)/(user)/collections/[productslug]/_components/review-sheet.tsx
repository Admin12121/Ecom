"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetReviewQuery } from "@/lib/store/Service/api";
import { Reviews } from "@/types/product";
import { Card, CardHeader } from "@/components/ui/card";
import { CircleCheck, Star } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import WriteReview from "./write-review";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ReviewSheetProps {
  slug: string;
  rating: number;
  product: any;
}

export function ReviewSheet({ slug, rating, product }: ReviewSheetProps) {
  const [page, setPage] = useState(1);
  const [star, setStar] = useState("0");
  const [filter, setFilter] = useState("relevant");
  const { data, isLoading } = useGetReviewQuery(
    { product_slug: slug, page: page, star, filter },
    { skip: !slug }
  );
  const [reviewData, setReviewData] = useState<Reviews[] | null>(null);

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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          color="default"
          variant="custom"
          className="w-full h-[40px] text-base"
        >
          Show all
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 w-[97dvw] mr-[1.5dvw] md:min-w-[500px] h-[98dvh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 py-3 px-0">
        <SheetHeader className="px-2 py-4">
          <SheetTitle className="text-sm font-medium">
            Reviews ({data?.count})
          </SheetTitle>
        </SheetHeader>
        <main className="space-y-2">
          <span className="flex gap-2 px-2">
            <Card className="w-full p-3 rounded-lg flex flex-row justify-between items-center bg-neutral-100 dark:bg-[#1b1b1c]">
              <p className="text-sm">Overall Rating</p>
              <p className=" text-sm flex gap-1 items-center justify-center">
                {rating} <Star stroke="transparent" fill="orange" />
              </p>
            </Card>
          </span>
          <div className="h-[76dvh] overflow-y-auto px-2">
            <span className="flex w-full gap-2 my-3">
              <Select
                defaultValue="0"
                onValueChange={(value: string) => setStar(value)}
              >
                <SelectTrigger className="dark:bg-[#171717]">
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
                defaultValue="relevent"
                onValueChange={(value: string) => setFilter(value)}
              >
                <SelectTrigger className="dark:bg-[#171717]">
                  <SelectValue placeholder="Select a Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="relevent">Most relevent</SelectItem>
                    <SelectItem value="recent">Most recent</SelectItem>
                    <SelectItem value="rating">By Rating</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </span>
            <ReviewsCard isLoading={isLoading}>
              {reviewData &&
                reviewData.map((review: Reviews) => (
                  <Card
                    className="flex flex-col p-1 bg-white dark:bg-neutral-900"
                    key={Math.random()}
                  >
                    <CardHeader className="flex flex-row items-center justify-between px-1">
                      <span>
                        {" "}
                        {[...Array(review.rating)].map((_, index) => (
                          <span key={index}>★</span>
                        ))}{" "}
                      </span>{" "}
                      <p className="text-xs">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric", day: "numeric" }
                        )}
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
                      <p className="text-sm font-light">{review.content}</p>
                      <span className="flex flex-col gap-1 mt-1 text-zinc-400">
                        <Separator />
                        {review.recommended ? (
                          <span className="flex flex-row justify-between">
                            <p className="text-sm font-normal">Recommended</p>
                            <p className="text-sm font-normal">
                              I&apos;ll recommend to everyone!
                            </p>
                          </span>
                        ) : (
                          ""
                        )}
                        {review.delivery ? (
                          <span className="flex flex-row justify-between">
                            <p className="text-sm font-normal">Delivery</p>
                            <p className="text-sm font-normal">Yes</p>
                          </span>
                        ) : (
                          ""
                        )}
                        <Separator />
                        {review.user ? (
                          <span className="flex flex-row justify-between">
                            <p className="text-sm font-normal">{review.user}.</p>
                            <p className="text-sm font-normal flex gap-1 items-center"><CircleCheck className="w-4 h-4"/> Verified Buyer</p>
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </span>
                  </Card>
                ))}
              <span className="flex flex-col justify-center items-center h-20">
                <h1 className="text-sm">
                  showing {reviewData?.length} reviews of {data?.count} reviews
                </h1>
                {data?.next && (
                  <Button
                    className="bg-foreground text-background mt-2"
                    size="sm"
                    onClick={handleShowMore}
                  >
                    Show More
                  </Button>
                )}
              </span>
            </ReviewsCard>
          </div>
        </main>
        <SheetFooter className="p-2 relative bottom-0">
          <SheetClose asChild>
            <WriteReview product={product} />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const ReviewsCard = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  return <div className="flex flex-col gap-3">{children}</div>;
};

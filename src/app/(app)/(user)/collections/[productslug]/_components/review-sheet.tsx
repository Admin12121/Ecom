"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetReviewQuery } from "@/lib/store/Service/api";
import { Reviews, ReviewsImage } from "@/types/product";
import { Card, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Spinner from "@/components/ui/spinner";

interface ReviewSheetProps {
  slug: string;
  rating: number;
}

export function ReviewSheet({ slug, rating }: ReviewSheetProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [star, setStar] = useState("0");
  const [filter, setFilter] = useState("relevant");
  const { data, isLoading } = useGetReviewQuery(
    { product_slug: slug, page: page, page_size: pageSize, star, filter },
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
      <SheetContent className="border-0 w-[97dvw] mr-[1.5dvw] md:min-w-[500px] h-[98dvh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 p-3">
        <SheetHeader className="px-6 py-4">
          <SheetTitle className="text-sm font-medium">
            Reviews ({data?.count})
          </SheetTitle>
        </SheetHeader>
        <main className="px-2 space-y-2">
          <span className="flex gap-2 px-2">
            <Card className="w-full p-3 px-3 rounded-lg flex flex-row justify-between items-center bg-neutral-100 dark:bg-[#27272a]">
              <p className="text-sm">Overall Rating</p>
              <p className=" text-sm flex gap-1 items-center justify-center">
                {rating} <Star stroke="transparent" fill="orange" />
              </p>
            </Card>
          </span>
          <div className="max-h-[580px] overflow-y-auto px-2">
            <ReviewsCard isLoading={isLoading}>
              {reviewData &&
                reviewData.map((review: Reviews) => (
                  <Card
                    className="flex flex-col p-2 dark:bg-zinc-800"
                    key={Math.random()}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <span>
                        {" "}
                        {[...Array(review.rating)].map((_, index) => (
                          <span key={index}>★</span>
                        ))}{" "}
                      </span>{" "}
                      <span>
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric", day: "numeric" }
                        )}
                      </span>
                    </CardHeader>
                    {review?.review_images[0]?.image && (
                      <span className="relative p-2 pt-0">
                        <Image
                          src={review.review_images[0].image}
                          width={100}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                          alt={review.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </span>
                    )}
                    <span className="flex flex-col p-2">
                      <h1 className="font-semibold">{review.title}</h1>
                      <p className="text-sm">{review.content}</p>
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
        <SheetFooter className="p-2">
          <SheetClose asChild>
            <Button className="bg-foreground w-full text-background" size="sm">
              Write a Review
            </Button>
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

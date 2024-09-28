"use client";
import React, { useState, useEffect } from "react";
import SpinnerLocal from "@/components/ui/spinner";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface ReviewImage {
  id: number;
  image: string;
  review: number;
}

interface ReviewResult {
  id: number;
  user: number;
  rating: number;
  title: string;
  content: string;
  recommended: boolean;
  delivery: boolean;
  review_images: ReviewImage[];
  created_at: string;
}

interface ReviewData {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReviewResult[];
}

const ReviewTable = ({
  setFilter,
  data,
  setSearch,
  isLoading,
  dataperpage,
  refetch,
  page,
  setPage,
  filter,
  setStar,
  star
}: {
  star:any
  filter: string;
  setFilter: any;
  setStar:any
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
  data: ReviewData;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  dataperpage: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [reviewData, setReviewData] = useState<ReviewResult[] | null>(null);
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setReviewData(data.results);
      } else {
        setReviewData(prevData => [...(prevData || []), ...data.results]);
      }
    }
  }, [data]);

  const handleShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <SpinnerLocal />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
                          <span className="flex gap-2 w-full">
                  <Select
                    defaultSelectedKeys={["0"]}
                    size="md"
                    radius="sm"
                    variant="bordered"
                    placeholder="Select"
                    className="max-w-xs"
                    onChange={(e) => setStar(e.target.value)}
                  >
                    <SelectItem key="0" value="Read all"> Read all </SelectItem>
                    <SelectItem key="1" value="★"> ★ </SelectItem>
                    <SelectItem key="2" value="★★"> ★★ </SelectItem>
                    <SelectItem key="3" value="★★★"> ★★★ </SelectItem>
                    <SelectItem key="4" value="★★★★"> ★★★★ </SelectItem>
                    <SelectItem key="5" value="★★★★★"> ★★★★★ </SelectItem>
                  </Select>
                  <Select
                    defaultSelectedKeys={["relevant"]}
                    size="md"
                    radius="sm"
                    variant="bordered"
                    placeholder="Select"
                    className="max-w-xs"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <SelectItem key="relevant" value="relevant"> Most relevant </SelectItem>
                    <SelectItem key="recent" value="recent"> Most recent </SelectItem>
                    <SelectItem key="rating" value="rating"> By rating </SelectItem>
                  </Select>
                </span>
          <div className="columns-1 sm:columns-1 md:columns-2 xl:columns-3 2xl:columns-3 4xl:columns-4 gap-2">
            {reviewData &&
              reviewData.map((review: ReviewResult) => (
                <Card
                  className="flex p-2 mb-2 dark:bg-zinc-800 max-h-96 overflow-hidden"
                  key={review.id}
                >
                  <CardHeader className="flex items-center justify-between pb-1">
                    <span>
                      {" "}
                      {[...Array(review.rating)].map((_, index) => (
                        <span key={index}>★</span>
                      ))}{" "}
                    </span>{" "}
                    <span>
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </CardHeader>
                  {review?.review_images[0]?.image && (
                    <span className="relative p-2 pt-0 w-full h-60">
                      <Image
                        src={review.review_images[0].image}
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                        alt={review.title}
                        className="w-full max-h-60 object-contain rounded-lg"
                      />
                    </span>
                  )}
                  <span className="flex flex-col p-2 overflow-hidden overflow-y-auto">
                    <h1 className="font-semibold">{review.title}</h1>
                    <p className="text-sm">{review.content}</p>
                  </span>
                </Card>
              ))}
          </div>
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
        </div>
      )}
    </div>
  );
};

export default ReviewTable;

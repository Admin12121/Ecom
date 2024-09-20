"use client"
import React, { useState, useEffect } from "react";
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
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useGetReviewQuery } from "@/lib/store/Service/User_Auth_Api";
import SpinnerLocal from "@/components/ui/spinner";

interface ReviewImage {
  id: number;
  image: string;
  review: number;
}

interface ReviewResult {
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


const Review = ({ isOpen, onOpenChange, onClose, slug, onSheetOpen, rating }: any) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [star, setStar] = useState('0');
  const [filter, setFilter] = useState("relevant");
  const {data, isLoading} = useGetReviewQuery({product_slug:slug, page: page, page_size: pageSize, star, filter},{skip: !slug});
  const [reviewData, setReviewData] = useState<ReviewResult[] | null>(null);

  useEffect(() => {
    if (data?.results) {
      setReviewData(prevData => [...(prevData || []), ...data.results]);
    }
  }, [data]);

  const handleShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      backdrop="blur"
      className="rounded-lg fixed md:right-0 w-[98vw] md:w-full h-[98vh] !my-[1vh] !mx-[1vw]  md:!my-0 md:!mx-2 max-md:!max-w-[100vw] bg-[#121212]"
      classNames={{
        closeButton: "rounded-lg border-1 border-default-300",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 500,
            y: 0,
            opacity: 0.5,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">
              <p className="text-sm font-medium">Reviews ({data?.count})</p>
            </ModalHeader>
            <ModalBody className="px-2 gap-3 overflow-hidden overflow-y-auto  ">
              <span className="flex gap-2 px-2">
                <Card className="w-full p-3 px-3 rounded-lg flex flex-row justify-between items-center bg-zinc-800">
                  <p className="text-sm">Overall Rating</p>
                  <p className=" text-sm flex gap-1 items-center justify-center">
                    {rating} <FaStar fill="orange" />
                  </p>
                </Card>
              </span>
              <span className="flex gap-5 px-2 w-full flex-col">
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
                {isLoading ?
                 
                 <div className="w-full h-full flex items-center justify-center">
                  <SpinnerLocal/>
                 </div>
                : 
                <>
                {reviewData && reviewData.map((review: ReviewResult) => (
                  <Card className="flex p-2 dark:bg-zinc-800">
                    <CardHeader className="flex items-center justify-between pb-1">
                      <span> {[...Array(review.rating)].map((_, index) => (
                        <span key={index}>★</span>
                      ))} </span> <span>{new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</span>
                    </CardHeader>
                    {review?.review_images[0]?.image && <span className="relative p-2 pt-0">
                       <Image
                        src={review.review_images[0].image}
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                        alt={review.title}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </span>}
                    <span className="flex flex-col p-2">
                      <h1 className="font-semibold">{review.title}</h1>
                      <p className="text-sm">
                        {review.content}
                      </p>
                    </span>
                  </Card>
                ))}
                
                  <span className="flex flex-col justify-center items-center h-20">
                    <h1 className="text-sm">showing {reviewData?.length} reviews of {data?.count} reviews</h1>
                    {data?.next && ( <Button
                        className="bg-foreground text-background mt-2"
                        size="sm"
                        onClick={handleShowMore}
                      >
                        Show More
                      </Button>)}
                  </span>
                
                </>
                }

              </span>
            </ModalBody>
            <ModalFooter className="py-2 w-full px-2">
                  <Button
                    className="bg-foreground w-full text-background"
                    size="sm" 
                    onClick={() => { onClose(); onSheetOpen()}}
                  >
                    Write a Review

                  </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Review;

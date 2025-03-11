"use client";
import React, { useState, useDeferredValue, useEffect } from "react";
import {
  useGetUserReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} from "@/lib/store/Service/api";
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
import { BadgeCheck, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Kbd from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export interface Review {
  id: number;
  user: number;
  rating: number;
  title: string;
  content: string;
  recommended: boolean;
  delivery: boolean;
  favoutare: boolean;
  review_images: ReviewsImage[];
  created_at: string;
  product_image: string;
  product_name: string;
  category_name: string;
  productslug: string;
  verified: boolean;
}

const Reviews = () => {
  const { accessToken } = useAuthUser();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [star, setStar] = useState("0");
  const [filter, setFilter] = useState("relevant");
  const deferredSearch = useDeferredValue(search);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [open, setOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);
  const { data, isLoading, refetch } = useGetUserReviewQuery(
    {
      token: accessToken,
      page: page,
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

  const HandleUpdateReview = async ({
    id,
    data,
  }: {
    id: number;
    data: any;
  }) => {
    const response = await updateReview({
      token: accessToken,
      id: id,
      FormData: data,
    });
    if (response.data) {
      toast.success("Review updated successfully");
      refetch();
    } else {
      toast.error("Failed to update review");
    }
  };

  const handleDeleteReview = async (id: number, remark: string) => {
    const response = await deleteReview({
      token: accessToken,
      id: id,
      remark: remark,
    });
    toast.success("Review deleted successfully");
    setOpen(false);
    setReviewIdToDelete(null);
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
                className={cn(
                  "mb-2 break-inside-avoid flex flex-col gap-1 p-1 relative",
                  review.favoutare && "bg-custom-gradient"
                )}
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
                    <p className="text-sm relative">
                      {review.product_name}
                      {review.verified && (
                        <BadgeCheck
                          className="absolute -right-5 top-0 fill-sky-500"
                          size={15}
                        />
                      )}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {review.category_name}
                    </p>
                  </span>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shadow-none absolute top-2 right-2"
                      aria-label="Open edit menu"
                    >
                      <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        HandleUpdateReview({
                          id: review.id,
                          data: { verified: !review.verified },
                        })
                      }
                    >
                      {review.verified ? "Unverify" : "Verify"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        HandleUpdateReview({
                          id: review.id,
                          data: { favoutare: !review.favoutare },
                        })
                      }
                    >
                      {review.favoutare
                        ? "Remove from Favourate"
                        : "Add to Favourate"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() =>{ setOpen(true); setReviewIdToDelete(review.id);}}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="bg-white dark:bg-neutral-900 shadow rounded-lg">
                  <CardHeader className="flex flex-row items-center justify-between px-1">
                    <span>
                      {" "}
                      {[...Array(review.rating)].map((_, index) => (
                        <span key={index}>★</span>
                      ))}{" "}
                    </span>{" "}
                    <span className="flex gap-2">
                      <p className="text-xs">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </span>
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
            <p>No any Reviews Found 😔!</p>
          </span>
        )}
      </ReviewsCard>
      {data?.next && (
        <div className="flex justify-center">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
      <DeleteReview
        open={open}
        setOpen={setOpen}
        reviewId={reviewIdToDelete}
        onDelete={handleDeleteReview}
      />
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

const DeleteReviewSchema = z.object({
  remark: z.string().min(1, "Remark is required"),
});

const DeleteReview = ({
  open,
  setOpen,
  reviewId,
  onDelete,
}: {
  open: boolean;
  setOpen: any;
  reviewId: number | null;
  onDelete: (id: number, remark: string) => void;
}) => {

  const form = useForm<z.infer<typeof DeleteReviewSchema>>({
    resolver: zodResolver(DeleteReviewSchema),
    defaultValues: {
      remark: "",
    },
  });

  const onSubmit = (data: z.infer<typeof DeleteReviewSchema>) => {
    toast.success(
      `Deleting review with id ${reviewId}, remark: ${data.remark}`
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[450px]">
        <div className="mb-2 flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Delete Review</DialogTitle>
            <DialogDescription className="sm:text-center">
              Are you sure you want to delete this review?
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-normal">Remark</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        // disabled={isLoading}
                        className="!bg-muted"
                        placeholder="remark"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Delete
            </Button>
          </form>
        </Form>
        <p className="text-muted-foreground text-center text-xs">
          This action cannot be undone. This will permanently delete the review
          from the database.
        </p>
      </DialogContent>
    </Dialog>
  );
};

import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { usePostReviewMutation } from "@/lib/store/Service/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuthUser } from "@/hooks/use-auth-user";
import { delay } from "@/lib/utils";

const reviewSchema = z.object({
  score: z.string().nonempty("Score is required"),
  title: z.string().nonempty("Title is required"),
  review: z.string().nonempty("Review is required"),
  recommended: z.boolean().optional(),
  delivery: z.boolean().optional(),
});

const validateFile = (file: File) => {
  const validTypes = ["image/png"];
  const maxSize = 5 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};

const WriteReview = ({ product, link }: any) => {
  const { accessToken } = useAuthUser();
  const [postReview, { isLoading }] = usePostReviewMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [categoryData, setCategoryData] = React.useState<{
    image: File | null;
    imagePreview: string | null;
  }>({
    image: null,
    imagePreview: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      score: "5",
      title: "",
      review: "",
      recommended: true,
      delivery: true,
    },
  });

  const recommendedValue = watch("recommended");
  const deliveryValue = watch("delivery");

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Posting Review...", {
      position: "top-center",
    });
    await delay(500);
    const actualData = new FormData();
    actualData.append("rating", data.score);
    actualData.append("title", data.title);
    actualData.append("content", data.review);
    actualData.append("recommended", data.recommended);
    actualData.append("delivery", data.delivery);
    actualData.append("product_slug", product.productslug);

    if (categoryData.image) {
      actualData.append("image", categoryData.image!);
    }
    const response = await postReview({ actualData, token: accessToken });
    if (response.data) {
      toast.success("Review Posted Successfully", {
        id: toastId,
        position: "top-center",
      });
    } else {
      toast.error("Something went wrong", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  const handleCategoryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setCategoryData({
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      toast.error(
        "Invalid File Format. Please upload a PNG image with a maximum size of 10MB."
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {link ? (
          <p className="text-xs text-neutral-400 cursor-pointer">
            Write a Review
          </p>
        ) : (
          <Button className="bg-foreground w-full text-background" size="sm">
            Write a Review
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="border-0 w-[97dvw] mr-[1.5dvw] md:min-w-[500px] h-[98dvh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 p-2 overflow-y-auto px-3">
        <SheetHeader className="text-start">
          <SheetTitle className="text-sm font-medium">
            Write a Review
          </SheetTitle>
          <main className="flex flex-col gap-5">
            <span className=" flex flex-row gap-2 mt-2 bg-white dark:bg-neutral-900 p-1 rounded-lg">
              <Image
                src={product.images[0].image}
                alt="product"
                width={80}
                height={80}
                className="rounded-md object-cover p-1 px-3 bg-zinc-950"
              />
              <span className="flex flex-col">
                <p className="text-sm">{product.product_name}</p>
                <p className="text-xs text-zinc-400">
                  {product.categoryname}
                </p>
              </span>
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5"
            >
              <span className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <Label htmlFor="score" className="text-sm">
                  Score
                </Label>
                <Select
                  defaultValue="5"
                  onValueChange={(value: string) => setValue("score", value)}
                >
                  <SelectTrigger className="dark:bg-[#171717]">
                    <SelectValue placeholder="Select a Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["1", "2", "3", "4", "5"].map((num, index) => (
                        <SelectItem key={index + 1} value={num}>
                          {"★".repeat(Number(num))}
                          {"★".repeat(5 - Number(num)).replace(/./g, "")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.score && (
                  <p className="text-red-500 text-xs">
                    {errors.score.message as string}
                  </p>
                )}
              </span>
              <span className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <Label htmlFor="score" className="text-sm">
                  Title
                </Label>
                <Input
                  className="dark:bg-[#171717]"
                  {...register("title")}
                  type="text"
                  placeholder="Choose a Title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">
                    {errors.title.message as string}
                  </p>
                )}
              </span>

              <span className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <Label htmlFor="score" className="text-sm">
                  Review
                </Label>
                <Textarea
                  className="dark:bg-[#171717]"
                  {...register("review")}
                  placeholder="Write a Review"
                />
                {errors.review && (
                  <p className="text-red-500 text-xs">
                    {errors.review.message as string}
                  </p>
                )}
              </span>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="image"
                  className="text-neutral-600 dark:text-neutral-300 text-sm flex items-center gap-1"
                >
                  Image{" "}
                  <p className="text-xs text-neutral-500">{` (Max 2MB)`}</p>
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/png"
                  onChange={handleCategoryImageChange}
                  ref={fileInputRef}
                />
                <Button
                  type="button"
                  className="w-full h-40 flex justify-center items-center bg-default-100 p-0 dark:bg-[#171717]"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {categoryData.image ? (
                    <Image
                      src={categoryData.imagePreview!}
                      className="h-40 w-full object-contain"
                      alt="Uploaded"
                      width={200}
                      height={200}
                    />
                  ) : (
                    "Click or Drop here"
                  )}
                </Button>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs font-light">
                  Please upload a clear image of the product. if you want to
                  share your experience with the other for better understanding.
                </p>
              </div>

              <span className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <label
                  htmlFor="recommended"
                  className="text-sm text-neutral-600 dark:text-neutral-300"
                >
                  Recommended
                </label>
                <span className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setValue("recommended", true)}
                    variant={recommendedValue ? "active" : "default"}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setValue("recommended", false)}
                    variant={!recommendedValue ? "active" : "default"}
                  >
                    No
                  </Button>
                </span>
                {errors.recommended && (
                  <p>{errors.recommended.message as string}</p>
                )}
              </span>

              <span className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <label
                  htmlFor="recommended"
                  className="text-sm text-neutral-600 dark:text-neutral-300"
                >
                  Did your order arrive within the time mentioned?
                </label>
                <span className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setValue("delivery", true)}
                    variant={deliveryValue ? "active" : "default"}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setValue("delivery", false)}
                    variant={!deliveryValue ? "active" : "default"}
                  >
                    No
                  </Button>
                </span>
                {errors.delivery && <p>{errors.delivery.message as string}</p>}
              </span>
              <Button
                size="sm"
                className="bg-foreground w-full text-background"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Post Review
              </Button>
            </form>
          </main>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default WriteReview;

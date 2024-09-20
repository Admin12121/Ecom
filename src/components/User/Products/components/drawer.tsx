import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { usePostReviewMutation } from "@/lib/store/Service/User_Auth_Api";

const reviewSchema = z.object({
  score: z.string().nonempty("Score is required"),
  title: z.string().nonempty("Title is required"),
  review: z.string().nonempty("Review is required"),
  recommended: z.boolean().optional(),
  delivery: z.boolean().optional(),
});

const validateFile = (file: File) => {
  const validTypes = ["image/png"];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};

const WriteReview = ({ product, price, open, onOpenChange }: any) => {
  const [postReview, {isLoading}] = usePostReviewMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [categoryData, setCategoryData] = React.useState<{
    image: File | null;
    imagePreview: string;
  }>({
    image: null,
    imagePreview: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const recommendedValue = watch("recommended");
  const deliveryValue = watch("delivery");

  const onSubmit = async (data: any) => {
    const NewFormData = new FormData();
    NewFormData.append("rating", data.score);
    NewFormData.append("title", data.title);
    NewFormData.append("content", data.review);
    NewFormData.append("recommended", data.recommended);
    NewFormData.append("delivery", data.delivery);
    NewFormData.append("product_slug", product.productslug);
    if (categoryData.image) {
      NewFormData.append("image", categoryData.image!);
    }
    const response = await postReview(NewFormData);
    if (response.data) {
      toast.success("Review Posted Successfully");
      onOpenChange();
    }else{
      toast.error("Something went wrong");
    }

  };

  const handleCategoryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setCategoryData((prevData) => ({
          ...prevData,
          image: file,
        }));
        const reader = new FileReader();
        reader.onload = (e) => {
          setCategoryData((prevData) => ({
            ...prevData,
            imagePreview: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          "Invalid File Format. Please upload a PNG image with a maximum size of 10MB."
        );
      }
    }
  };

  return (
    <Modal
      isOpen={open}
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
            <ModalHeader className="p-4">
              <p className="text-sm font-medium">Write a Review</p>
            </ModalHeader>
            <ModalBody className="p-3 gap-3 overflow-hidden overflow-y-auto  ">
              <span className=" flex flex-row gap-2 dark:bg-zinc-800 p-2 rounded-lg">
                <Image
                  src={product.images[0].image}
                  alt="product"
                  width={80}
                  height={80}
                  className="rounded-md object-cover p-1 px-3 bg-zinc-950"
                />
                <span className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    {product.product_name}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {product.categoryname} / {product.subcategoryname}
                  </p>
                  <p className="text-sm text-zinc-400">{price}</p>
                </span>
              </span>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mt-5 flex flex-col gap-5"
              >
                <span className="flex flex-col gap-1 text-zinc-400">
                  <label htmlFor="score" className="text-sm">
                    Score
                  </label>
                  <Select
                    size="md"
                    radius="sm"
                    variant="bordered"
                    placeholder="Score"
                    className="w-full"
                    defaultSelectedKeys={["5"]}
                    {...register("score")}
                  >
                    <SelectItem key="1" value="★">
                      ★
                    </SelectItem>
                    <SelectItem key="2" value="★★">
                      ★★
                    </SelectItem>
                    <SelectItem key="3" value="★★★">
                      ★★★
                    </SelectItem>
                    <SelectItem key="4" value="★★★★">
                      ★★★★
                    </SelectItem>
                    <SelectItem key="5" value="★★★★★">
                      ★★★★★
                    </SelectItem>
                  </Select>
                  {errors.score && <p className="text-red-500 text-xs">{errors.score.message as string}</p>}
                </span>
                <span className="flex flex-col gap-1 text-zinc-400">
                  <Input
                    {...register("title")}
                    type="text"
                    label="Title"
                    radius="sm"
                    placeholder="Choose a Title"
                    classNames={{
                      label: "!text-zinc-400 !text-sm",
                    }}
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title.message as string}</p>}
                </span>

                <span className="flex flex-col gap-1 text-zinc-400">
                  <Textarea
                    {...register("review")}
                    label="Review"
                    variant="bordered"
                    radius="sm"
                    placeholder="Write a Review"
                    labelPlacement="outside"
                    disableAnimation
                    disableAutosize
                    description="Make sure you describe what you like and didn't like about the product you feel other users should know about."
                    classNames={{
                      base: "w-full",
                      input: "resize-y min-h-[80px]",
                      label: "!text-zinc-400 !text-sm",
                    }}
                  />
                  {errors.review && <p className="text-red-500 text-xs">{errors.review.message as string}</p>}
                </span>

                <div className="flex flex-col gap-1">
                  <label htmlFor="image" className="text-zinc-400 text-sm">
                    Image
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/png"
                    onChange={handleCategoryImageChange}
                    ref={fileInputRef}
                  />
                  <Button
                    className="w-full h-40 flex justify-center items-center bg-default-100 p-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {categoryData.image ? (
                      <Image
                        src={categoryData.imagePreview!}
                        className="h-40 w-full object-contain"
                        alt="Uploaded"
                      />
                    ) : (
                      "Click or Drop here"
                    )}
                  </Button>
                  <p className="text-zinc-500 text-xs">
                    Please upload a clear image of the product. if you want to
                    share your experience with the other for better
                    understanding.
                  </p>
                  {errors.image && <p>{errors.image.message as string}</p>}
                </div>

                <span className="flex flex-col gap-1 text-zinc-400">
                  <label htmlFor="recommended" className="text-sm text-zinc-400">
                    Recommended
                  </label>
                  <span className="flex gap-2">
                    <Button
                      size="sm"
                      radius="sm"
                      onClick={() => setValue("recommended", true)}
                      color={recommendedValue === true ? "secondary" : "default"}
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      radius="sm"
                      onClick={() => setValue("recommended", false)}
                      color={recommendedValue === false ? "secondary" : "default"}
                    >
                      No
                    </Button>
                  </span>
                  {errors.recommended && (
                    <p>{errors.recommended.message as string}</p>
                  )}
                </span>

                <span className="flex flex-col gap-1 text-zinc-400">
                  <label htmlFor="recommended" className="text-sm text-zinc-400">
                    Did your order arrive within the time mentioned?
                  </label>
                  <span className="flex gap-2">
                    <Button
                      size="sm"
                      radius="sm"
                      onClick={() => setValue("delivery", true)}
                      color={deliveryValue === true ? "secondary" : "default"}
                      >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      radius="sm"
                      onClick={() => setValue("delivery", false)}
                      color={deliveryValue === false ? "secondary" : "default"}
                      >
                      No
                    </Button>
                  </span>
                  {errors.delivery && (
                    <p>{errors.delivery.message as string}</p>
                  )}
                </span>
                    <Button size="sm" className="bg-foreground w-full text-background" type="submit" isLoading={isLoading} disabled={isLoading}>
                      Post Review
                    </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WriteReview;

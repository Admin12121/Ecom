"use client";

import React, { useState, useRef, DragEvent, useEffect, useMemo } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";

import {
  useCategoryViewQuery,
  useProductsRegistrationMutation,
} from "@/lib/store/Service/api";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { toast } from "sonner";
import { Trash as DeleteIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import GlobalInput from "@/components/global/input";
import AddCategory from "./addCategory";
import AddSubCategory from "./addSubCategory";
import { useAuthUser } from "@/hooks/use-auth-user";

interface GetCategory {
  id: string;
  name: string;
  categoryslug: string;
  subcategories: GetSubCategory[];
}

interface GetSubCategory {
  id: string;
  name: string;
  category: number;
}

const schema = z
  .object({
    productName: z
      .string({
        required_error: "Product name is required",
      })
      .nonempty("Product name cannot be empty"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .nonempty("Description cannot be empty"),
    isMultiVariant: z.boolean({
      required_error: "Product Type is required",
    }),
    category: z.number({
      required_error: "Category is required",
    }),
    subCategory: z.number({
      required_error: "Sub Category is required",
    }),
    basePrice: z.number().optional().nullable(),
    stock: z.number().optional().nullable(),
    discount: z.number().optional().nullable(),
    variants: z.array(
      z.object({
        size: z
          .string({
            required_error: "Size is required",
          })
          .nonempty("Size cannot be empty"),
        price: z
          .number({
            required_error: "Price is required",
          })
          .positive("Price must be a positive number"),
        stock: z
          .number({
            required_error: "Stock is required",
          })
          .int()
          .positive("Stock must be a positive integer"),
        discount: z
          .number()
          .min(1, "Discount must be greater than 0")
          .max(100, "Discount must be at most 100")
          .optional()
          .nullable(),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.isMultiVariant) {
      if (!data.variants || data.variants.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["variants"],
          message: "Variants are required when the product is multi-variant",
        });
      }
    } else {
      if (data.basePrice === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basePrice"],
          message:
            "Base price is required when the product is not multi-variant",
        });
      }
      if (data.stock === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stock"],
          message: "Stock is required when the product is not multi-variant",
        });
      }
    }
  });

const AddProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [isMultiVariant, setIsMultiVariant] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, refetch } = useCategoryViewQuery({});

  const getcategory = useMemo(() => (data as GetCategory[]) || [], [data]);

  const [getsubcategory, setGetSubCategory] = useState<GetSubCategory[]>([]);
  const [addProduct] = useProductsRegistrationMutation();

  const { accessToken } = useAuthUser();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      discount: 0,
      variants: [{ discount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    setValue("isMultiVariant", isMultiVariant);
    if (isMultiVariant) {
      setValue("basePrice", null);
      setValue("stock", null);
      setValue("discount", null);
    } else {
      setValue("variants", []);
    }
  }, [isMultiVariant, setValue]);

  const toggleVariantType = (isMulti: boolean) => {
    setIsMultiVariant(isMulti);
    if (isMulti) {
      if (fields.length === 0) {
        append({ size: "", price: 0, stock: 0, discount: 1 });
      }
    } else {
      remove(Array.from({ length: fields.length }, (_, i) => i));
    }
  };

  const handleBlur = (name: any) => {
    trigger(name);
  };

  const validateFile = (file: File): boolean => {
    const isValidSize = file.size <= 50 * 1024 * 1024;
    const isValidType = file.type === "image/png";
    return isValidSize && isValidType;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setIsDragging(false);
    setDraggingIndex(null);

    const files = e.dataTransfer.files;
    handleFiles(files, index);
  };

  const handleFiles = (files: FileList, index: number) => {
    const newImages = [...images];
    const newProductImages = [...productImages];
    const maxImages = 5;
    let newIndex = index;

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        if (newImages.length < maxImages) {
          setLoadingIndex(newIndex);
          newProductImages.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            newImages[newIndex] = e.target?.result as string;
            newIndex++;
            setImages([...newImages]);
            setLoadingIndex(null);
          };
          reader.readAsDataURL(file);
        }
      } else {
        toast.success(
          "Invalid File Format. Please upload a PNG image with a maximum size of 10MB."
        );
      }
    });
    setProductImages(newProductImages);
    setTimeout(() => {
      setLoadingIndex(null);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files, draggingIndex || 0);
    }
  };

  const removeAllImages = () => {
    setImages([]);
    setProductImages([]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newProductImages = productImages.filter((_, i) => i !== index);
    setImages(newImages);
    setProductImages(newProductImages);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggingIndex(index);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };

  const handleImageUpload = (index: number) => {
    setDraggingIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data: FormValues) => {
    const cleanedData = { ...data };

    if (data.isMultiVariant) {
      delete cleanedData.basePrice;
      delete cleanedData.stock;
      delete cleanedData.discount;
    } else {
      delete cleanedData.variants;
    }

    if (images.length < 2) {
      toast.error("At least 2 images are required");
      return;
    }

    const toastId = toast.loading("Preparing data...", {
      position: "top-center",
    });
    const formData = new FormData();
    formData.append("product_name", cleanedData.productName);
    formData.append("description", cleanedData.description);
    formData.append("is_multi_variant", cleanedData.isMultiVariant.toString());
    formData.append("category", cleanedData.category.toString());
    formData.append("subcategory", cleanedData.subCategory.toString());

    if (!cleanedData.isMultiVariant) {
      formData.append("price", cleanedData.basePrice!.toString());
      formData.append("size", "0");
      formData.append("stock", cleanedData.stock!.toString());
      formData.append("discount", cleanedData.discount!.toString());
    } else {
      cleanedData.variants?.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][price]`, variant.price.toString());
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
        if (variant.discount !== undefined) {
          formData.append(
            `variants[${index}][discount]`,
            variant.discount.toString()
          );
        }
      });
    }

    try {
      setTimeout(() => {
        toast.loading("Uploading Product Details...", {
          id: toastId,
          position: "top-center",
        });
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, 500));

      productImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      toast.loading("Uploading Product Details...", {
        id: toastId,
        position: "top-center",
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.loading("Compressing Images...", {
        id: toastId,
        position: "top-center",
      });
      const res = await addProduct({ formData, token: accessToken });

      if (res.data) {
        reset();
        setImages([]);
        setProductImages([]);
        toast.success("Product saved successfully!", {
          id: toastId,
          position: "top-center",
        });
      } else if (res.error) {
        toast.error("Failed to save product", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error("Error saving product", {
        id: toastId,
        position: "top-center",
      });
      console.log(error);
    }
  };

  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = getcategory.find(
        (cat) => String(cat.id) === String(selectedCategory)
      );
      setGetSubCategory(selectedCat ? selectedCat.subcategories : []);
    } else {
      setGetSubCategory([]);
    }
  }, [selectedCategory, getcategory]);

  return (
    <form
      className="flex flex-col gap-5 px-2 md:px-5 pb-5 w-full h-[90dvh]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button className="absolute right-2 top-2" type="submit">
        Save Product
      </Button>
      <span className="flex w-full gap-5 max-lg:flex-col ">
        <Card className="bg-default-100 w-[70%] max-lg:w-full p-3 flex flex-col gap-3">
          <CardHeader>
            <h1>General information</h1>
          </CardHeader>
          <CardContent className="flex gap-5 w-full flex-col">
            <GlobalInput
              label="Product Name"
              placeholder="buddha statue"
              className="bg-white dark:bg-neutral-900"
              error={errors.productName?.message}
              type="text"
              {...register("productName", {
                onBlur: () => handleBlur("productName"),
              })}
            />
            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                className="bg-white dark:bg-neutral-900 min-h-[200px] max-h-[200px]"
                {...register("description", {
                  onBlur: () => handleBlur("description"),
                })}
                placeholder="Enter your description"
              />
            </div>
            <span className="flex gap-2 flex-col">
              <h1>Product Type</h1>
              <span className="flex gap-3">
                <Button
                  variant={isMultiVariant ? "secondary" : "active"}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleVariantType(false);
                  }}
                >
                  Single Variant
                </Button>
                <Button
                  variant={!isMultiVariant ? "secondary" : "active"}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleVariantType(true);
                  }}
                >
                  Multi Variant
                </Button>
              </span>
            </span>
          </CardContent>
        </Card>
        <Card className="bg-default-100 w-[30%] min-w-[380px] max-lg:w-full flex flex-col gap-3">
          <CardHeader>
            <span className="flex w-full justify-between px-1">
              <h1>Images</h1>
              {images.length >= 1 && (
                <span
                  className="cursor-pointer"
                  onClick={() => removeAllImages()}
                >
                  Remove All
                </span>
              )}
            </span>
          </CardHeader>
          <CardContent className="flex gap-5 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png"
              onChange={handleInputChange}
              multiple
            />
            <div className="flex w-full gap-5 flex-col h-full custom-md:flex-row">
              <Button
                variant="secondary"
                className={`bg-white w-full h-80 flex justify-center items-center p-0 custom-md:w-[50%] dark:bg-neutral-900 hover:dark:!bg-neutral-800 ${
                  isDragging && draggingIndex === 0 ? "dragging" : ""
                }`}
                onDrop={(e: any) => handleDrop(e, 0)}
                onDragOver={(e: any) => handleDragOver(e, 0)}
                onDragLeave={handleDragLeave}
                onClick={() => handleImageUpload(0)}
              >
                {loadingIndex === 0 ? (
                  <Spinner color="secondary" />
                ) : images[0] ? (
                  <Image
                    src={images[0]}
                    className="h-80 w-full max-lg:h-full max-lg:w-full object-contain"
                    alt="Uploaded"
                    width={800}
                    height={800}
                  />
                ) : (
                  "Click or Drop here"
                )}
              </Button>
              <div className="flex items-center justify-center gap-3 custom-md:w-[50%] flex-wrap">
                {[1, 2, 3, 4].map((index) => (
                  <Button
                    variant="secondary"
                    key={index}
                    className={`bg-white w-20 h-20 items-center justify-center custom-md:w-[48%] custom-md:h-[48%] p-0 dark:bg-neutral-900 hover:dark:!bg-zinc-800 ${
                      isDragging && draggingIndex === index ? "dragging" : ""
                    }`}
                    onDrop={(e: any) => handleDrop(e, index)}
                    onDragOver={(e: any) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onClick={() => handleImageUpload(index)}
                  >
                    {loadingIndex === index ? (
                      <Spinner color="secondary" />
                    ) : images[index] ? (
                      <>
                        <Image
                          className="object-contain h-20 w-20 max-lg:h-full max-lg:w-full"
                          src={images[index]}
                          alt={`Uploaded ${index}`}
                          width={800}
                          height={800}
                        />
                        <Button
                          className="absolute top-1 right-1 h-8 w-8 p-0"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      "+"
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </span>
      <span className="flex w-full gap-5 max-lg:flex-col pb-5">
        <Card className="bg-default-100 w-[70%] max-lg:w-full flex flex-col gap-3">
          <CardHeader>
            <h1>Pricing And Stock</h1>
          </CardHeader>
          <CardContent className="flex gap-5 w-full max-xxl:w-full flex-col">
            {!isMultiVariant ? (
              <span className="flex gap-5 w-full flex-col md:flex-row">
                <GlobalInput
                  label="Price"
                  placeholder="रु 12"
                  className="bg-white dark:bg-neutral-900 w-full "
                  base="w-full"
                  error={errors.basePrice?.message}
                  type="text"
                  {...register("basePrice", {
                    valueAsNumber: true,
                    onBlur: () => handleBlur("basePrice"),
                  })}
                />
                <GlobalInput
                  label="Stock"
                  placeholder="stock"
                  className="bg-white dark:bg-neutral-900 w-full "
                  base="w-full"
                  error={errors.stock?.message}
                  type="text"
                  {...register("stock", {
                    valueAsNumber: true,
                    onBlur: () => handleBlur("stock"),
                  })}
                />
                <GlobalInput
                  label="Discount"
                  placeholder="discount"
                  className="bg-white dark:bg-neutral-900 w-full "
                  base="w-full"
                  error={errors.discount?.message}
                  type="text"
                  {...register("discount", {
                    valueAsNumber: true,
                  })}
                />
              </span>
            ) : (
              <span className="flex gap-5 flex-col">
                {fields.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="flex gap-5 flex-col md:flex-row"
                  >
                    <GlobalInput
                      label="Size"
                      placeholder="Size"
                      className="bg-white dark:bg-neutral-900 w-full"
                      error={errors.variants?.[index]?.size?.message}
                      {...register(`variants.${index}.size`, {
                        onBlur: () => handleBlur(`variants[${index}].size`),
                      })}
                    />
                    <GlobalInput
                      label="Price"
                      placeholder="Price"
                      className="bg-white dark:bg-neutral-900 w-full"
                      error={errors.variants?.[index]?.price?.message}
                      {...register(`variants.${index}.price`, {
                        valueAsNumber: true,
                        onBlur: () => handleBlur(`variants[${index}].price`),
                      })}
                    />
                    <GlobalInput
                      label="Stock"
                      placeholder="Stock"
                      className="bg-white dark:bg-neutral-900 w-full"
                      error={errors.variants?.[index]?.stock?.message}
                      {...register(`variants.${index}.stock`, {
                        valueAsNumber: true,
                        onBlur: () => handleBlur(`variants[${index}].stock`),
                      })}
                    />
                    <GlobalInput
                      label="Discount"
                      placeholder="Discount"
                      className="bg-white dark:bg-neutral-900 w-full"
                      error={errors.variants?.[index]?.discount?.message}
                      {...register(`variants.${index}.discount`, {
                        valueAsNumber: true,
                      })}
                    />
                    <span
                      className={`flex items-end justify-end ${
                        errors.variants?.[index] ? "self-center" : "mb-1"
                      }`}
                    >
                      <Button
                        variant="destructive"
                        className="w-full md:w-auto p-2"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </Button>
                    </span>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    append({ size: "", price: 0, stock: 0, discount: 0 });
                  }}
                >
                  Add Variant
                </Button>
              </span>
            )}
          </CardContent>
        </Card>
        <Card className="bg-default-100 w-[30%] min-w-[380px] max-lg:w-full flex flex-col gap-3">
          <CardContent className="flex flex-col gap-3">
            {accessToken && (
              <AddCategory
                refetch={refetch}
                token={accessToken}
                setValue={setValue}
                selectedCategory={selectedCategory}
                getcategory={getcategory}
                errors={errors}
              />
            )}
            {accessToken && (
              <AddSubCategory
                refetch={refetch}
                getcategory={getcategory}
                token={accessToken}
                setValue={setValue}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                getsubcategory={getsubcategory}
                errors={errors}
              />
            )}
          </CardContent>
        </Card>
      </span>
    </form>
  );
};

export default AddProduct;

"use client";

import React, { useState, useRef, DragEvent, useEffect, useMemo } from "react";
import Image from "next/image";
import { useForm, useFieldArray, Form } from "react-hook-form";

import {
  useCategoryViewQuery,
  useProductsViewQuery,
  useProductsUpdateMutation,
} from "@/lib/store/Service/api";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { Trash as DeleteIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import GlobalInput from "@/components/global/input";
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
  
  const schema = z.object({
    id: z.string().nonempty("Product ID is required"),
    productName: z.string().nonempty("Product name is required"),
    description: z.string().nonempty("Description is required"),
    isMultiVariant: z.boolean(),
    category: z.number(),
    subCategory: z.number(),
    basePrice: z.number().optional().nullable(),
    stock: z.number().int().nonnegative().optional().nullable(),
    discount: z.number().optional().nullable(),
    variants: z.array(
      z.object({
        id: z.string().nonempty("Variant ID is required"),
        size: z.string().nonempty("Size is required"),
        price: z.number().positive("Price must be positive"),
        stock: z.number().int().nonnegative("Stock must be non-negative"),
        discount: z.number().min(1).max(100).optional().nullable(),
      })
    ),
  }).superRefine((data, ctx) => {
    if (data.isMultiVariant && (!data.variants || data.variants.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["variants"],
        message: "Variants are required when the product is multi-variant",
      });
    } else if (!data.isMultiVariant) {
      if (data.basePrice === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basePrice"],
          message: "Base price is required when the product is not multi-variant",
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
  
  interface FormValues {
    id: string;
    productName: string;
    description: string;
    isMultiVariant: boolean;
    category: number;
    subCategory: number;
    basePrice?: number | null;
    stock?: number | null;
    discount?: number | null;
    variants?: Array<{
      id?: string;
      size: string;
      price: number;
      stock: number;
      discount?: number;
    }>;
  }
  
const ProductPage = ({ productslug }: { productslug: string }) => {
    const [images, setImages] = useState<string[]>([]);
    const [productImages, setProductImages] = useState<File[]>([]);
    const [isMultiVariant, setIsMultiVariant] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data } = useCategoryViewQuery({});
    const { data: productData, isLoading: ProductDataLoading, refetch } = useProductsViewQuery({ productslug }, { skip: !productslug });
    const [updateProduct, { isLoading: updateProductLoading }] = useProductsUpdateMutation();
    const getcategory = useMemo(() => (data as GetCategory[]) || [], [data]);
    const [getsubcategory, setGetSubCategory] = useState<GetSubCategory[]>([]);
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
    console.log(errors)
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
      if (isMulti && fields.length === 0) {
        append({ size: "", price: 0, stock: 0, discount: 1 });
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
      handleFiles(e.dataTransfer.files, index);
    };
  
    const handleFiles = (files: FileList, index: number) => {
      const newImages = [...images];
      const newProductImages = [...productImages];
      const maxImages = 5;
      let newIndex = index;
  
      Array.from(files).forEach((file) => {
        if (validateFile(file) && newImages.length < maxImages) {
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
        } else {
          toast.success("Invalid File Format. Please upload a PNG image with a maximum size of 10MB.");
        }
      });
      setProductImages(newProductImages);
      setTimeout(() => setLoadingIndex(null), 2000);
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
      setImages(images.filter((_, i) => i !== index));
      setProductImages(productImages.filter((_, i) => i !== index));
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
      fileInputRef.current?.click();
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
  
      const toastId = toast.loading("Preparing data...", { position: "top-center" });
      const formData = new FormData();
      formData.append("product_name", cleanedData.productName);
      formData.append("description", cleanedData.description);
      formData.append("is_multi_variant", cleanedData.isMultiVariant.toString());
      formData.append("category", cleanedData.category.toString());
      formData.append("subcategory", cleanedData.subCategory.toString());
  
      if (!cleanedData.isMultiVariant) {
        formData.append("id", cleanedData.id);
        formData.append("price", cleanedData.basePrice!.toString());
        formData.append("size", "0");
        formData.append("stock", cleanedData.stock!.toString());
        formData.append("discount", cleanedData.discount!.toString());
      } else {
        cleanedData.variants?.forEach((variant, index) => {
          formData.append(`variants[${index}][id]`, variant.id || "");
          formData.append(`variants[${index}][size]`, variant.size || "");
          formData.append(`variants[${index}][price]`, variant.price?.toString() || "0");
          formData.append(`variants[${index}][stock]`, variant.stock?.toString() || "0");
          if (variant.discount !== undefined) {
            formData.append(`variants[${index}][discount]`, variant.discount.toString());
          }
        });
      }
  
      try {
        setTimeout(() => {
          toast.loading("Uploading Product Details...", { id: toastId, position: "top-center" });
        }, 500);
  
        await new Promise((resolve) => setTimeout(resolve, 500));
  
        toast.loading("Uploading Product Details...", { id: toastId, position: "top-center" });
  
        await new Promise((resolve) => setTimeout(resolve, 500));
  
        toast.loading("Compressing Images...", { id: toastId, position: "top-center" });
        const res = await updateProduct({ formData, token: accessToken, id: productData?.id });
          if (res.data) {
            refetch();
            toast.success("Product updated successfully!", { id: toastId, position: "top-center" });
          } else if (res.error) {
            toast.error("Failed to update product", { id: toastId, position: "top-center" });
          }
      } catch (error: any) {
        toast.error("Error updating product", { id: toastId, position: "top-center" });
      }
    };
  
    const selectedCategory = watch("category");
    const selectedSubCategory = watch("subCategory");
  
    useEffect(() => {
      if (selectedCategory) {
        const selectedCat = getcategory.find((cat) => String(cat.id) === String(selectedCategory));
        setGetSubCategory(selectedCat ? selectedCat.subcategories : []);
        setValue("subCategory", productData.subcategory);
      } else {
        setGetSubCategory([]);
      }
    }, [selectedCategory, getcategory]);
  
    useEffect(() => {
      if (productData) {
        setImages(productData.images.map((img: any) => img.image));
        if (Array.isArray(productData.variants)) {
          setIsMultiVariant(true);
          reset({ variants: [] });
          productData.variants.forEach((variant: any) => {
            append({
              id: String(variant.id),
              size: variant.size,
              price: parseFloat(variant.price),
              stock: variant.stock,
              discount: parseFloat(variant.discount),
            });
          });
        } else {
          setIsMultiVariant(false);
          setValue("basePrice", parseFloat(productData.variants.price));
          setValue("stock", productData.variants.stock);
          setValue("discount", parseFloat(productData.variants.discount));
        }
        setValue("id", String(productData.id));
        setValue("productName", productData.product_name);
        setValue("description", productData.description);
        setValue("category", productData.category);
        setValue("subCategory", productData.subcategory);
      }
    }, [productData]);
  
    return (
      <form className="flex flex-col gap-5 px-2 md:px-5 pb-5 w-full h-[90dvh]" onSubmit={handleSubmit(onSubmit)}>
        <Button className="absolute right-2 top-2" type="submit">
          Update Product
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
                    type="button"
                    variant={isMultiVariant ? "secondary" : "active"}
                    // onClick={() => toggleVariantType(false)}
                  >
                    Single Variant
                  </Button>
                  <Button
                    type="button"
                    variant={!isMultiVariant ? "secondary" : "active"}
                    // onClick={() => toggleVariantType(true)}
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
                  <span className="cursor-pointer" onClick={removeAllImages}>
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
                  type="button"
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
                      type="button"
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
                    <div key={variant.id} className="flex gap-5 flex-col md:flex-row">
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
                      <span className={`flex items-end justify-end ${errors.variants?.[index] ? "self-center" : "mb-1"}`}>
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
              <span className="flex w-full gap-3 justify-center flex-col">
                <span className="flex w-full gap-3 items-end justify-center">
                  <span className="flex-col w-full space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={(selectedCategory || "").toString()}
                      onValueChange={(value: any) => {
                        setValue("category", Number(value));
                      }}
                    >
                      <SelectTrigger className="dark:bg-[#171717]">
                        <SelectValue placeholder="Select a Category">
                          {!selectedCategory
                            ? "Select a Category"
                            : getcategory.find((cat) => cat.id.toString() == selectedCategory.toString())?.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {getcategory.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </span>
                </span>
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
              </span>
              <span className="flex w-full gap-3 justify-center flex-col">
                <span className="flex w-full gap-3 items-end justify-center">
                  <span className="flex-col w-full space-y-2">
                    <Label>Sub Category</Label>
                    <Select
                      value={(selectedSubCategory || "").toString()}
                      onValueChange={(value: any) => {
                        setValue("subCategory", Number(value));
                      }}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger className="dark:bg-[#171717]">
                        <SelectValue placeholder="Select a Sub Category">
                          {!selectedSubCategory
                            ? "Select a Sub Category"
                            : getsubcategory.find((cat) => cat.id.toString() == selectedSubCategory.toString())?.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {getsubcategory.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </span>
                </span>
                {errors.subCategory && <p className="text-red-500">{errors.subCategory.message}</p>}
              </span>
            </CardContent>
          </Card>
        </span>
      </form>
    );
  };
  
  export default ProductPage;
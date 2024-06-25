"use client";
interface ImageUploaderProps {}
import React, { useState, useMemo, useRef, DragEvent } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Select, SelectItem, Image, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  size: yup
    .number()
    .required("Size is required")
    .positive("Must be a positive number"),
  basePrice: yup
    .number()
    .required("Base pricing is required")
    .positive("Must be a positive number"),
  stock: yup
    .number()
    .required("Stock is required")
    .integer("Must be an integer")
    .positive("Must be a positive number"),
  discount: yup
    .number()
    .optional()
    .min(0, "Must be at least 0")
    .max(100, "Must be at most 100"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"),
});

const AddProduct = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const router = useRouter();
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
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
    const maxImages = 5;
    let newIndex = index;

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        if (newImages.length < maxImages) {
          setLoadingIndex(newIndex);
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

    setTimeout(() => {
      setLoadingIndex(null);
    }, 2000); // Simulate a 2-second upload time
  };

  const removeAllImages = () => {
    setImages([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files, draggingIndex || 0);
    }
  };
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
    toast.success("Product saved successfully!");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 px-5 pb-5 h-[90vh] scroll">
          <span className="flex items-center justify-between">
            <Breadcrumbs>
              <BreadcrumbItem onClick={() => router.push("/admin/products")}>
                Products
              </BreadcrumbItem>
              <BreadcrumbItem>Add Products</BreadcrumbItem>
            </Breadcrumbs>
            <Button color="secondary" type="submit">
              Save Product
            </Button>
          </span>
          <span className="flex w-full gap-5 max-lg:flex-col ">
            <Card className="w-[70%] max-lg:w-full">
              <CardHeader>
                <h1>General information</h1>
              </CardHeader>
              <CardBody className="flex gap-5 w-full">
                <Input
                  {...register("productName")}
                  type="text"
                  label="New Product"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                  errorMessage={errors?.productName?.message}
                />
                <Textarea
                  {...register("description")}
                  label="Description"
                  labelPlacement="outside"
                  minRows={8}
                  placeholder="Enter your description"
                  errorMessage={errors?.description?.message}
                />
                <span className="">
                  <h1>Size </h1>
                  <span className="flex gap-3">
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                  </span>
                </span>
              </CardBody>
            </Card>
            <Card className="w-[30%] min-w-[380px] max-lg:w-full">
              <CardBody className="gap-5 flex flex-col">
                <span className="gap-5 flex flex-col">
                  <span className="flex justify-between ">
                    <h1>Upload Image</h1>
                    {images.length > 0 && (
                      <span
                        onClick={removeAllImages}
                        className="hover:text-slate-500 transition ease-in-out cursor-pointer"
                      >
                        Remove All Images
                      </span>
                    )}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleInputChange}
                  />
                  <div className="flex flex-col gap-5 h-full custom-md:flex-row">
                    <Button
                      className={`w-full h-80 flex justify-center items-center bg-default-100 p-0 custom-md:w-[50%] ${
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
                          isBlurred
                          src={images[0]}
                          className="h-80 w-full max-lg:h-full max-lg:w-full"
                          alt="Uploaded"
                        />
                      ) : (
                        "Click or Drop here"
                      )}
                    </Button>
                    <div className="flex items-center justify-center gap-3 custom-md:w-[50%] flex-wrap">
                      {[1, 2, 3, 4].map((index) => (
                        <Button
                          key={index}
                          className={`w-20 h-20 items-center justify-center bg-default-100 custom-md:w-[48%] custom-md:h-[48%] p-0${
                            isDragging && draggingIndex === index
                              ? "dragging"
                              : ""
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
                                isBlurred
                                className="object-contain h-20 w-20 max-lg:h-full max-lg:w-full"
                                src={images[index]}
                                alt={`Uploaded ${index}`}
                              />
                              <Button
                                className="absolute top-0 right-0 h-full"
                                onClick={() => removeImage(index)}
                              >
                                {/* &#x2716;  */}
                              </Button>
                            </>
                          ) : (
                            "+"
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </span>
              </CardBody>
            </Card>
          </span>
          <span className="flex w-full gap-5 max-lg:flex-col pb-5">
            <Card className="w-[70%] max-lg:w-full">
              <CardHeader>
                <h1>Pricing And Stock</h1>
              </CardHeader>
              <CardBody className="flex gap-5 w-full max-xxl:w-full">
                <span className="flex gap-5">
                  <Input
                    type="text"
                    label="Base Pricing"
                    placeholder="buddha statue"
                    labelPlacement="outside"
                    size="lg"
                    radius="sm"
                  />
                  <Input
                    type="text"
                    label="Stock"
                    placeholder="buddha statue"
                    labelPlacement="outside"
                    size="lg"
                    radius="sm"
                  />
                </span>
                <span className="flex gap-5">
                  <Input
                    type="text"
                    label="Discount"
                    placeholder="buddha statue"
                    labelPlacement="outside"
                    size="lg"
                    radius="sm"
                  />
                  <Input
                    type="text"
                    label="New Product"
                    placeholder="buddha statue"
                    labelPlacement="outside"
                    size="lg"
                    radius="sm"
                  />
                </span>
              </CardBody>
            </Card>
            <Card className="w-[30%] min-w-[380px] max-lg:w-full">
              <CardHeader>
                <h1>Cateory</h1>
              </CardHeader>
              <CardBody className="flex gap-5 items-start">
                <span className="flex w-full gap-3 items-end justify-center">
                  <Select
                    labelPlacement="outside"
                    label="Product Category"
                    placeholder="Select an Category"
                    className="max-w-xs"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Button color="secondary">Add </Button>
                </span>

                <span className="flex w-full gap-3 items-end justify-center">
                  <Select
                    labelPlacement="outside"
                    label="Product Sub Category"
                    placeholder="Select an Category"
                    className="max-w-xs"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                  <Button color="secondary">Add</Button>
                </span>
              </CardBody>
            </Card>
          </span>
        </div>
      </form>
    </>
  );
};

const animals = [
  { key: "brass", label: "Brass" },
  { key: "silver", label: "Silver" },
  { key: "halfgold", label: "Half Gold" },
  { key: "fullgold", label: "Full gold" },
];

export default AddProduct;

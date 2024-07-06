"use client";
import React, { useState, useRef, DragEvent, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Select, SelectItem, Image, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, useFieldArray, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@/components/Admin/icons/deleteIcon";
import {useCategoryViewQuery, useAddCategoryMutation, useAddsubCategoryMutation} from "@/lib/store/Service/User_Auth_Api"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import axios from "axios";
import DynamicForm from "@/context/FormHandler"

const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  isMultiVariant: yup.boolean().required("Product Type is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"),
  basePrice: yup.number().when("isMultiVariant", {
    is: false,
    then: (schema) =>
      schema
        .required("Base price is required")
        .typeError("Price must be a number")
        .positive("Price must be a positive number"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  stock: yup.number().when("isMultiVariant", {
    is: false,
    then: (schema) =>
      schema
        .required("Stock is required")
        .typeError("Stock must be a number")
        .integer("Stock must be an integer")
        .positive("Stock must be a positive number"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  discount: yup.number().when("isMultiVariant", {
    is: false,
    then: (schema) =>
      schema
        .required("Discount is required")
        .typeError("Discount must be a number")
        .min(0, "Discount must be at least 0")
        .max(100, "Discount must be at most 100"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  variants: yup.array().when("isMultiVariant", {
    is: true,
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            size: yup.string().required("Size is required"),
            price: yup
              .number()
              .typeError("Price must be a number")
              .required("Price is required")
              .positive("Price must be a positive number"),
            stock: yup
              .number()
              .typeError("Stock must be a number")
              .required("Stock is required")
              .integer("Stock must be an integer")
              .positive("Stock must be a positive number"),
            discount: yup
              .number()
              .typeError("Discount must be a number")
              .optional()
              .min(1, "Discount must be greater than 0")
              .max(100, "Discount must be at most 100"),
          })
        )
        .min(1, "At least one variant is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface FormValues {
  productName: string;
  description: string;
  isMultiVariant: boolean;
  category: string;
  subCategory: string;
  basePrice?: number | null | undefined;
  stock?: number | null | undefined;
  discount?: number | null | undefined;
  variants?: Array<{
    size: string;
    price: number;
    stock: number;
    discount?: number;
  }>; 
}

interface Category {
  category: string;
}

interface subCategory {
  category: number;
  subcategory : string;
}

interface GetCategory {
  id: number;
  name: string;
  categoryslug: string;
  subcategories: GetSubCategory[];  
}

interface GetSubCategory {
  id: number;
  name: string;
  category: number;
}

const AddProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<File[]>([])  
  const [isMultiVariant, setIsMultiVariant] = useState<boolean>(false);
  const [subcategorymodel, setsubCategorymodal] = useState<boolean>(false);  
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading , refetch } = useCategoryViewQuery({});
  const { isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();

  const [getcategory, setGetCategory] = useState<GetCategory[]>([])
  const [getsubcategory, setGetSubCategory] = useState<GetSubCategory[]>([])

  const { formData: categoryData, setFormData: setCategoryData, errors: categoryErrors, handleInputChange: handleCategoryChange } = DynamicForm<Category>({
    category: "",
  });
 
  const { formData: subCategoryData, setFormData: setSubCategoryData, errors: subCategoryErrors, handleInputChange: handleSubCategoryChange } = DynamicForm<subCategory>({
    category: 0,
    subcategory: "",
  });

  const [addcategory, isloading] = useAddCategoryMutation();
  const [addsubcategory] = useAddsubCategoryMutation();
  useEffect(()=>{
    if(data){
      setGetCategory(data)
    }
  },[data, refetch])

  const validateFile = (file: File): boolean => {
    const isValidSize = file.size <= 10 * 1024 * 1024;
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
    }, 2000); // Simulate a 2-second upload time
  };


  const removeAllImages = () => {
    setImages([]);
    setProductImages([]);    
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
    const newProductImages = productImages.filter((_, i) => i !== index);    
    setImages(newImages);
    setProductImages(newProductImages);    
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
    control,
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
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

  const selectedCategory = watch("category");

  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = getcategory.find(cat => cat.id.toString() === selectedCategory);
      setGetSubCategory(selectedCat ? selectedCat.subcategories : []);
    } else {
      setGetSubCategory([]);
    }
  }, [selectedCategory, getcategory]);  

  const onSubmit = async (data: FormValues) => {
    // Clean up the data before submission
    const cleanedData = { ...data };

    if (data.isMultiVariant) {
      // Remove single variant fields if isMultiVariant is true
      delete cleanedData.basePrice;
      delete cleanedData.stock;
      delete cleanedData.discount;
    } else {
      // Remove variants array if isMultiVariant is false
      delete cleanedData.variants;
    }

    if (images.length < 2) {
      toast.error("At least 2 images are required");
      return;
    }
  // Prepare form data
    const formData = new FormData();
    formData.append('productName', cleanedData.productName);
    formData.append('description', cleanedData.description);
    formData.append('isMultiVariant', cleanedData.isMultiVariant.toString());
    formData.append('category', cleanedData.category);
    formData.append('subCategory', cleanedData.subCategory);

    if (!cleanedData.isMultiVariant) {
      formData.append('basePrice', cleanedData.basePrice!.toString());
      formData.append('stock', cleanedData.stock!.toString());
      formData.append('discount', cleanedData.discount!.toString());
    } else {
      cleanedData.variants?.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][price]`, variant.price.toString());
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
        if (variant.discount !== undefined) {
          formData.append(`variants[${index}][discount]`, variant.discount.toString());
        }
      });
    }

    productImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    try{
      const res = await axios.post("http://127.0.0.1:8000/api/products/products/", formData);
      console.log("Success : ", res?.data);
    }catch(error:any){
      console.log("Error", error.message);
    }

    toast.success("Product saved successfully!");
  };


  const SubmitCategory = async ( e: React.FormEvent<HTMLFormElement> ) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryData.category);
    try{
      const res = await addcategory(formData);
      if (res.data){
        onClose()
        toast.success("Category Added")
      }else{
        if (res.error) {
          const errorData = res.error as FetchBaseQueryError; 
          if (errorData.data && typeof errorData.data === 'object' && 'name' in errorData.data) {
            const message = (errorData.data as any).name[0];
            toast.error(message || "Something went wrong");
          } 
        } 
      }
    }catch(error:any){
      console.log(error)
    }
  }

  const SubmitSubCategory = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", subCategoryData.category.toString());
    formData.append("name", subCategoryData.subcategory);
  
    try {
      const res = await addsubcategory(formData);
      if (res.data) {
        setsubCategorymodal(!subcategorymodel);
        toast.success("Subcategory Added");
      } else {
        if (res.error) {
          const errorData = res.error as FetchBaseQueryError;
          if (errorData.data && typeof errorData.data === 'object') {
            const errors = errorData.data as Record<string, string[]>;
            const errorMessages = Object.values(errors).flat();
            errorMessages.forEach((message) => {
              toast.error(message);
            });
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }


  const handleBlur = (name: any) => {
    trigger(name);
  };

  // Function to restrict input to numeric values
  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const toggleVariantType = (isMulti: boolean) => {
    setIsMultiVariant(isMulti);
    if (isMulti) {
      if (fields.length === 0) {
        append({ size: "", price: 0, stock: 0, discount: 1 });
      }
    } else {
      // Clear variants if switching to single variant
      remove(Array.from({ length: fields.length }, (_, i) => i));
    }
  };

  console.log(getsubcategory.length !== 0)

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
                  type="text"
                  label="New Product"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                  isInvalid={!!errors.productName}
                  isRequired
                  {...register("productName", {
                    onBlur: () => handleBlur("productName"),
                  })}
                  errorMessage={errors.productName?.message}
                />
                <Textarea
                  {...register("description", {
                    onBlur: () => handleBlur("description"),
                  })}
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                  label="Description"
                  labelPlacement="outside"
                  minRows={8}
                  placeholder="Enter your description"
                />
                <span className="flex gap-2 flex-col">
                  <h1>Product Type</h1>
                  <span className="flex gap-3">
                    <Button
                      color={!isMultiVariant ? "secondary" : "default"}
                      onClick={() => toggleVariantType(false)}
                    >
                      Single Variant
                    </Button>
                    <Button
                      color={isMultiVariant ? "secondary" : "default"}
                      onClick={() => toggleVariantType(true)}
                    >
                      Multi Variant
                    </Button>
                  </span>
                </span>
              </CardBody>
            </Card>
            <Card className="w-[30%] min-w-[380px] max-lg:w-full">
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
              <CardBody className="flex gap-5 flex-wrap">
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
                            ></Button>
                          </>
                        ) : (
                          "+"
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </span>
          <span className="flex w-full gap-5 max-lg:flex-col pb-5">
            <Card className="w-[70%] max-lg:w-full">
              <CardHeader>
                <h1>Pricing And Stock</h1>
              </CardHeader>
              <CardBody className="flex gap-5 w-full max-xxl:w-full flex-col">
                {!isMultiVariant ? (
                  <>
                    <span className="flex gap-5">
                      <Input
                        {...register("basePrice", {
                          onBlur: () => handleBlur("basePrice"),
                        })}
                        type="text"
                        label="Base Pricing"
                        placeholder="रु 12"
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        onKeyPress={handleNumericInput}
                        isInvalid={!!errors.basePrice}
                        errorMessage={errors.basePrice?.message}
                      />
                      <Input
                        {...register("stock", {
                          onBlur: () => handleBlur("stock"),
                        })}
                        type="text"
                        label="Stock"
                        placeholder="stock"
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        onKeyPress={handleNumericInput}
                        isInvalid={!!errors.stock}
                        errorMessage={errors.stock?.message}
                      />
                    </span>
                    <span className="flex gap-5">
                      <Input
                        type="text"
                        {...register("discount", {
                          onBlur: () => handleBlur("discount"),
                        })}
                        label="Discount"
                        placeholder="12 %"
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        onKeyPress={handleNumericInput}
                        isInvalid={!!errors.discount}
                        errorMessage={errors.discount?.message}
                      />
                    </span>
                  </>
                ) : (
                  <span className="flex gap-5 flex-col">
                    {fields.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="flex gap-5 flex-col md:flex-row"
                      >
                        <Input
                          {...register(`variants.${index}.size`, {
                            onBlur: () => handleBlur(`variants[${index}].size`),
                          })}
                          type="text"
                          label="Size"
                          placeholder="Size"
                          labelPlacement="outside"
                          size="lg"
                          radius="sm"
                          // className="w-[20%]"
                          onKeyPress={handleNumericInput}
                          isInvalid={!!errors.variants?.[index]?.size}
                          errorMessage={errors.variants?.[index]?.size?.message}
                        />
                        <Input
                          {...register(`variants.${index}.price`, {
                            onBlur: () =>
                              handleBlur(`variants[${index}].price`),
                          })}
                          type="text"
                          label="Price"
                          placeholder="Price"
                          labelPlacement="outside"
                          size="lg"
                          radius="sm"
                          // className="w-[20%]"
                          onKeyPress={handleNumericInput}
                          isInvalid={!!errors.variants?.[index]?.price}
                          errorMessage={
                            errors.variants?.[index]?.price?.message
                          }
                        />
                        <Input
                          {...register(`variants.${index}.stock`, {
                            onBlur: () =>
                              handleBlur(`variants[${index}].stock`),
                          })}
                          type="text"
                          label="Stock"
                          placeholder="Stock"
                          labelPlacement="outside"
                          size="lg"
                          radius="sm"
                          // className="w-[20%]"
                          onKeyPress={handleNumericInput}
                          isInvalid={!!errors.variants?.[index]?.stock}
                          errorMessage={
                            errors.variants?.[index]?.stock?.message
                          }
                        />
                        <Input
                          {...register(`variants.${index}.discount`, {
                            onBlur: () =>
                              handleBlur(`variants[${index}].discount`),
                          })}
                          type="text"
                          label="Discount"
                          placeholder="Discount"
                          labelPlacement="outside"
                          size="lg"
                          radius="sm"
                          // className="w-[20%]"
                          onKeyPress={handleNumericInput}
                          isInvalid={!!errors.variants?.[index]?.discount}
                          errorMessage={
                            errors.variants?.[index]?.discount?.message
                          }
                        />
                        <span
                          className={`flex items-end justify-end ${
                            errors.variants?.[index] ? "self-center" : "mb-1"
                          }`}
                        >
                          <Button
                            isIconOnly
                            color="danger"
                            className="w-full md:w-auto"
                            onClick={() => remove(index)}
                            isDisabled={fields.length === 1}
                          >
                            <DeleteIcon />
                          </Button>
                        </span>
                      </div>
                    ))}
                    <Button
                      color="secondary"
                      onClick={() =>
                        append({ size: "", price: 0, stock: 0, discount: 0 })
                      }
                    >
                      Add Variant
                    </Button>
                  </span>
                )}
              </CardBody>
            </Card>
            <Card className="w-[30%] min-w-[380px] max-lg:w-full">
              <CardHeader>
                <h1>Category</h1>
              </CardHeader>
              <CardBody className="flex gap-5 items-start">
                <span className="flex w-full gap-3 justify-center flex-col">
                  <span className="flex w-full gap-3 items-end justify-center">
                    <Select
                      labelPlacement="outside"
                      label="Product Category"
                      placeholder="Select an Category"
                      className="max-w-xs"
                      {...register("category")}
                    >
                      {getcategory.map(({id, name}) => (
                        <SelectItem key={id}>{name}</SelectItem>
                      ))}
                    </Select>
                    <Button color="secondary" onPress={onOpen}>
                      Add{" "}
                    </Button>
                  </span>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </span>
                <span className="flex w-full gap-3 justify-center flex-col">
                  <span className="flex w-full gap-3 items-end justify-center">
                    <Select
                      isDisabled = {getsubcategory.length == 0}
                      labelPlacement="outside"
                      label="Product Sub Category"
                      placeholder="Select an Category"
                      className="max-w-xs"
                      {...register("subCategory")}
                    >
                      {getsubcategory.map(({id , name}) => (
                        <SelectItem key={id}>{name}</SelectItem>
                      ))}
                    </Select>
                    <Button color="secondary" onPress={()=>{setsubCategorymodal(!subcategorymodel)}}>Add</Button>
                  </span>
                  {errors.subCategory && (
                    <p className="text-red-500">{errors.subCategory.message}</p>
                  )}
                </span>
              </CardBody>
            </Card>
          </span>
        </div>
      </form>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
      >
        <form onSubmit={SubmitCategory}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Category
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    value={categoryData.category}
                    onChange={(e) => handleCategoryChange(e, "category")}
                    label="Category"
                    placeholder="Category"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" type="submit">
                    Add Category
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
      <Modal
        backdrop="blur"
        isOpen={subcategorymodel}
        placement="auto"
        onOpenChange={setsubCategorymodal}
      >
        <form onSubmit={SubmitSubCategory}>
          <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  Add Sub Category
                </ModalHeader>
                <ModalBody>
                <Select
                  labelPlacement="outside"
                  label="Product Category"
                  placeholder="Select an Category"
                  className="max-w-xs"
                  value={subCategoryData.category}
                  onChange={(e:any) => handleSubCategoryChange(e , "category")}
                >
                  {getcategory.map(({id, name}) => (
                    <SelectItem key={id}>{name}</SelectItem>
                  ))}
                </Select>                  
                  <Input
                    autoFocus
                    value={subCategoryData.subcategory}
                    onChange={(e) => handleSubCategoryChange(e, "subcategory")}
                    label="Sub Category"
                    placeholder="Sub Category"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" type="submit">
                    Add Category
                  </Button>
                </ModalFooter>
          </ModalContent>
        </form>
      </Modal>    
    </>
  );
};

export default AddProduct;

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import GlobalInput from "@/components/global/input";
import Image from "next/image";
import React, { useRef } from "react";
import { toast } from "sonner";
import DynamicForm from "@/constants/formhandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { useAddCategoryMutation } from "@/lib/store/Service/api";

interface Category {
  category: string;
  image: File | null;
  imagePreview: string | null;
}

const AddCategory = ({token, refetch}:{token:string, refetch?:any}) => {
  const [addcategory] = useAddCategoryMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    formData: categoryData,
    setFormData: setCategoryData,
    // errors: categoryErrors,
    handleInputChange: handleCategoryChange,
  } = DynamicForm<Category>({
    category: "",
    image: null,
    imagePreview: null,
  });

  const validateFile = (file: File): boolean => {
    const isValidSize = file.size <= 50 * 1024 * 1024;
    const isValidType = file.type === "image/png";
    return isValidSize && isValidType;
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

  const SubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!categoryData.category) {
      toast.error("Category name is required");
      return;
    }

    if (!categoryData.image) {
      toast.error("Category image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryData.category);
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }
    try {
      const res = await addcategory({ formData, token });
      if (res.data) {
        toast.success("Category Added");
        refetch();
      } else {
        if (res.error) {
          const errorData = res.error as FetchBaseQueryError;
          if (
            errorData.data &&
            typeof errorData.data === "object" &&
            "name" in errorData.data
          ) {
            const message = (errorData.data as any).name[0];
            toast.error(message || "Something went wrong");
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-2">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <GlobalInput
              value={categoryData.category}
              onChange={(e: any) => handleCategoryChange(e.target.value, "category")}
              className="dark:bg-neutral-900"
              label="Category"
              placeholder="Category"
            />
            <div className="flex flex-col gap-3">
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/png"
                onChange={handleCategoryImageChange}
                ref={fileInputRef}
              />
              <Button
                type="button"
                className="w-full min-h-40 h-auto flex justify-center items-center dark:bg-neutral-900 p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                {categoryData.imagePreview ? (
                  <Image
                    src={categoryData.imagePreview!}
                    width={800}
                    height={800}
                    className="w-full object-contain"
                    alt="Uploaded"
                  />
                ) : (
                  "Click or Drop here"
                )}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button color="secondary" type="button" onClick={(e:any)=>SubmitCategory(e)}>
              Add Category
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;

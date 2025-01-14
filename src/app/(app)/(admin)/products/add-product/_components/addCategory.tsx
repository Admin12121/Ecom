import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GlobalInput from "@/components/global/input";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import DynamicForm from "@/constants/formhandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { useAddCategoryMutation } from "@/lib/store/Service/api";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  category: string;
  image: File | null;
  imagePreview: string | null;
}

interface GetSubCategory {
  id: string;
  name: string;
  category: number;
}

interface GetCategory {
  id: string;
  name: string;
  categoryslug: string;
  subcategories: GetSubCategory[];
}

interface Props {
  token: string;
  refetch?: any;
  setValue: any;
  selectedCategory: any;
  getcategory: GetCategory[];
  errors: any;
}

const AddCategory = ({
  token,
  refetch,
  setValue,
  selectedCategory,
  getcategory,
  errors,
}: Props) => {
  const [addcategory] = useAddCategoryMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formData: categoryData,
    setFormData: setCategoryData,
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
  const [open, setOpen] = useState<boolean>(false);
  return (
    <span className="flex w-full gap-3 justify-center flex-col">
      <span className="flex w-full gap-3 items-end justify-center">
        <span className="flex-col w-full space-y-2">
          <Label>Category</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                role="combobox"
                aria-expanded={open}
                className={cn("rounded-lg w-full justify-between dark:bg-neutral-900 px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20", open && "ring-2 ring-offset-2 ring-offset-default-100 dark:ring-offset-black ring-neutral-700")}
              >
                {!selectedCategory
                  ? "Select a Category"
                  : getcategory.find(
                      (cat) => cat.id.toString() == selectedCategory.toString()
                    )?.name}
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-muted-foreground/80"
                  aria-hidden="true"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0 rounded-xl mt-1 border-none overflow-hidden"
              align="start"
            >
              <Command className="dark:bg-neutral-900">
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {getcategory.map(({ id, name }) => (
                      <CommandItem
                        key={id}
                        value={id}
                        onSelect={(value: any) => {
                          setValue("category", Number(id));
                          setOpen(false);
                        }}
                        className="rounded-lg"
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </span>
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
                  onChange={(e: any) =>
                    handleCategoryChange(e.target.value, "category")
                  }
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
                <Button
                  color="secondary"
                  type="button"
                  onClick={(e: any) => SubmitCategory(e)}
                >
                  Add Category
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </span>
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}
    </span>
  );
};

export default AddCategory;

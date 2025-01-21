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
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GlobalInput from "@/components/global/input";
import React, { useState } from "react";
import { toast } from "sonner";
import DynamicForm from "@/constants/formhandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import {
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetCategoryQuery,
} from "@/lib/store/Service/api";
import Spinner from "@/components/ui/spinner";

interface subCategory {
  category: number;
  name: string;
}

interface GetCategory {
  id: string;
  name: string;
  categoryslug: string;
}

interface GetSubCategory {
  id: string;
  name: string;
  category: number;
}

interface Props {
  token: string;
  setValue: any;
  selectedCategory?: any;
  selectedSubCategory: any;
  errors: any;
}

const AddSubCategory = ({
  token,
  setValue,
  selectedCategory,
  selectedSubCategory,
  errors,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [cat, setCat] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [categoryname, setCategoryName] = useState<string>("");
  const [addsubcategory] = useAddSubCategoryMutation();
  const { data, isLoading, refetch } = useGetSubCategoryQuery(
    { category: selectedCategory, name: name },
    { skip: !open }
  );
  const { data:categoryData, isLoading:categoryLoading } = useGetCategoryQuery({name:categoryname},{skip:!cat});
  

  const {
    formData: subCategoryData,
    handleInputChange: handleSubCategoryChange,
  } = DynamicForm<subCategory>({
    category: 0,
    name: "",
  });

  const SubmitSubCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addsubcategory({ formData: subCategoryData, token });
      if (res.data) {
        toast.success("Subcategory Added");
        refetch();
      } else {
        if (res.error) {
          const errorData = res.error as FetchBaseQueryError;
          if (errorData.data && typeof errorData.data === "object") {
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
  };
  return (
    <span className="flex w-full gap-3 justify-center flex-col">
      <span className="flex w-full gap-3 items-end justify-center">
        <span className="flex-col w-full space-y-2">
          <Label>Sub Category</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "rounded-lg w-full justify-between dark:bg-neutral-900 px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
                  open &&
                    "ring-2 ring-offset-2 ring-offset-default-100 dark:ring-offset-black ring-neutral-700",
                  !selectedCategory && "cursor-not-allowed"
                )}
                disabled={!selectedCategory}
              >
                {!selectedSubCategory
                  ? "Select a Sub Category"
                  : data?.results.find(
                      (cat:GetSubCategory) =>
                        cat.id.toString() == selectedSubCategory.toString()
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
                <CommandInput placeholder="Search subcategory..." onValueChange={(value)=>setName(value)} value={name}/>
                <CommandList>
                  <CommandEmpty>No subcategory found.</CommandEmpty>
                  <CommandGroup>
                    {isLoading && <Spinner/>}
                    {data?.results.map(({ id, name }:GetSubCategory) => (
                      <CommandItem
                        key={id}
                        value={id}
                        onSelect={(value: any) => {
                          setValue("subCategory", Number(id));
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
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle>Add SubCategory</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-2">
              <Popover open={cat} onOpenChange={setCat}>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "rounded-lg w-full justify-between dark:bg-neutral-900 px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
                      open &&
                        "ring-2 ring-offset-2 ring-offset-default-100 dark:ring-offset-black ring-neutral-700"
                    )}
                  >
                    {subCategoryData.category === 0
                      ? "Select a Category"
                      : categoryData?.results.find(
                          (cat:GetCategory) => cat.id == subCategoryData.category.toString()
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
                    <CommandInput placeholder="Search category..." onValueChange={(value)=>setCategoryName(value)} value={categoryname}/>
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryLoading && <Spinner/>}
                        {categoryData?.results.map(({ id, name }:GetCategory) => (
                          <CommandItem
                            key={id}
                            value={id}
                            className="rounded-lg"
                            onSelect={() => {
                              handleSubCategoryChange(id, "category");
                              setCat(false);
                            }}
                          >
                            {name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <GlobalInput
                value={subCategoryData.name}
                onChange={(e: any) =>
                  handleSubCategoryChange(e.target.value, "name")
                }
                label="Sub Category"
                placeholder="Sub Category"
                className="dark:bg-neutral-900"
              />
            </div>
            <DialogFooter>
              <Button
                color="secondary"
                type="button"
                onClick={(e: any) => SubmitSubCategory(e)}
              >
                Add Sub Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </span>
      {errors.subCategory && (
        <p className="text-red-500">{errors.subCategory.message}</p>
      )}
    </span>
  );
};

export default AddSubCategory;

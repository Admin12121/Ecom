import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import GlobalInput from "@/components/global/input";
import React from "react";
import { toast } from "sonner";
import DynamicForm from "@/constants/formhandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { useAddSubCategoryMutation } from "@/lib/store/Service/api";

interface subCategory {
  category: number;
  name: string;
}

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

const AddSubCategory = ({
  getcategory,
  token,
  refetch,
}: {
  getcategory: GetCategory[];
  token: string;
  refetch: any;
}) => {
  const [addsubcategory] = useAddSubCategoryMutation();

  const {
    formData: subCategoryData,
    // setFormData: setSubCategoryData,
    // errors: subCategoryErrors,
    handleInputChange: handleSubCategoryChange,
  } = DynamicForm<subCategory>({
    category: 0,
    name: "",
  });

  const SubmitSubCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addsubcategory({ formData:subCategoryData, token });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Select
            onValueChange={(value: string) => {
              handleSubCategoryChange(value, "category");
            }}
          >
            <SelectTrigger className="dark:bg-[#171717]">
              <SelectValue placeholder="Select a Category">
                {subCategoryData.category === 0
                  ? "Select a Category"
                  : getcategory.find(
                      (cat) => cat.id == subCategoryData.category.toString()
                    )?.name}
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
  );
};

export default AddSubCategory;

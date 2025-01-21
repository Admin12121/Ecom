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
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  useAddCategoryMutation,
  useGetCategoryQuery,
} from "@/lib/store/Service/api";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";

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

interface GetCategory {
  id: string;
  name: string;
  categoryslug: string;
  subcategories: GetSubCategory[];
}

interface Props {
  token: string;
  setValue: any;
  selectedCategory: any;
  errors: any;
}

const CategorySchema = z.object({
  name: z.string().min(2, { message: "Category name is required" }),
});

type CategorySchemaFormValues = z.infer<typeof CategorySchema>;
const defaultFormValues: CategorySchemaFormValues = {
  name: "",
};

const AddCategory = ({
  token,
  setValue,
  selectedCategory,
  errors,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [addcategory] = useAddCategoryMutation();
  const [ name, setName ] = useState<string>("");
  const { data, isLoading, refetch } = useGetCategoryQuery({name},{skip: !open});

  const form = useForm<CategorySchemaFormValues>({
    resolver: zodResolver(CategorySchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });
  const { reset } = form;

  const onSubmit = useCallback(async (data: CategorySchemaFormValues) => {
    const { error, data: res } = await addcategory({
      formData: data,
      token: token,
    });
    if (error && "data" in error) {
      const errorData = error?.data || {};
      const errorMessages = Object.values(errorData).flat().join(", ");
      const formattedMessage = errorMessages || "An unknown error occurred";
      toast.error(`${formattedMessage}`);
      return;
    }
    if (res) {
      toast.success("Category Added");
      refetch();
      reset();
    }
  }, []);

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
                className={cn(
                  "rounded-lg w-full justify-between dark:bg-neutral-900 px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
                  open &&
                    "ring-2 ring-offset-2 ring-offset-default-100 dark:ring-offset-black ring-neutral-700"
                )}
              >
                {!selectedCategory
                  ? "Select a Category"
                  : data?.results.find(
                      (cat:GetCategory) => cat.id.toString() == selectedCategory.toString()
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
                <CommandInput placeholder="Search category..." onValueChange={(value)=>setName(value)} value={name}/>
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {isLoading && <Spinner/>}
                    {data?.results.map(
                      ({ id, name }:GetCategory) => (
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
                      )
                    )}
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
              <Form {...form}>
                <form className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="dark:bg-neutral-900 bg-white mt-5"
                            placeholder="Enter Category"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button
                  color="secondary"
                  type="button"
                  onClick={() => onSubmit(form.getValues())}
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

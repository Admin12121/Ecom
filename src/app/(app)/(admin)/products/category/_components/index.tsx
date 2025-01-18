"use client";

import React, { useCallback } from "react";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  useCategoryViewQuery,
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useUpgradeSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "@/lib/store/Service/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import EditableText from "./editabletext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CategorySchema = z.object({
  name: z.string().min(2, { message: "Category name is required" }),
});

const SubCategorySchema = z.object({
  category: z.string(),
  name: z.string().min(2, { message: "SubCategory name is required" }),
});

const UpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "SubCategory name is required" }),
});

type CategorySchemaFormValues = z.infer<typeof CategorySchema>;
type SubCategorySchemaFormValues = z.infer<typeof SubCategorySchema>;
type UpdateSchemaFormValues = z.infer<typeof UpdateSchema>;

const defaultFormValues: CategorySchemaFormValues = {
  name: "",
};

interface Subcategory {
  id: number;
  name: string;
  category: number;
}

interface Category {
  id: number;
  name: string;
  categoryslug: string;
  subcategories: Subcategory[];
}

const Category = () => {
  const { accessToken } = useAuthUser();
  const { data, refetch } = useCategoryViewQuery({});
  const [addcategory] = useAddCategoryMutation();
  const [addsubcategory] = useAddSubCategoryMutation();
  const [updateSubCategory] = useUpgradeSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const form = useForm<CategorySchemaFormValues>({
    resolver: zodResolver(CategorySchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const subcategoryform = useForm<SubCategorySchemaFormValues>({
    resolver: zodResolver(SubCategorySchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      name: "",
    },
  });

  const updateform = useForm<UpdateSchemaFormValues>({
    resolver: zodResolver(UpdateSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const { reset } = form;
  const { reset: resetSubCategory } = subcategoryform;

  const onSubmit = useCallback(async (data: CategorySchemaFormValues) => {
    const { error, data: res } = await addcategory({
      formData: data,
      token: accessToken,
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

  const handleCatetgoryUpgrade = useCallback(
    async (data: UpdateSchemaFormValues) => {
      console.log(data);
    },
    []
  );

  const onSubmitSubCategory = useCallback(
    async (data: SubCategorySchemaFormValues) => {
      const { error, data: res } = await addsubcategory({
        formData: data,
        token: accessToken,
      });
      if (error && "data" in error) {
        const errorData = error?.data || {};
        const errorMessages = Object.values(errorData).flat().join(", ");
        const formattedMessage = errorMessages || "An unknown error occurred";
        toast.error(`${formattedMessage}`);
        return;
      }
      if (res) {
        toast.success("SubCategory Added");
        refetch();
        subcategoryform.setValue("name", "");
      }
    },
    []
  );

  const handleSubCategoryUpgrade = useCallback(
    async (data: UpdateSchemaFormValues) => {
      const { error, data: res } = await updateSubCategory({
        formData: data,
        id: data.id,
        token: accessToken,
      });
      if (error && "data" in error) {
        const errorData = error?.data || {};
        const errorMessages = Object.values(errorData).flat().join(", ");
        const formattedMessage = errorMessages || "An unknown error occurred";
        toast.error(`${formattedMessage}`);
        return;
      }
      if (res) {
        toast.success("Updated");
        refetch();
      }
    },
    []
  );

  const handleSubCategoryDelete = useCallback(async (data: any) => {
    const { error, data: res } = await deleteSubCategory({
      id: data.id,
      token: accessToken,
    });
    if (error && "data" in error) {
      const errorData = error?.data || {};
      const errorMessages = Object.values(errorData).flat().join(", ");
      const formattedMessage = errorMessages || "An unknown error occurred";
      toast.error(`${formattedMessage}`);
      return;
    }

    toast.success("Deleted");
    refetch();
  }, []);

  return (
    <main className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2 ">
      <span className="flex justify-between items-center">
        <h1 className="text-2xl">Category</h1>
      </span>
      <Accordion type="single" collapsible className="space-y-1 w-full">
        <AccordionItem
          value="add-redeem-code"
          className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 px-2 transition-all "
        >
          <AccordionTrigger
            icon={<ChevronDown className="w-4 h-4" />}
            className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]"
          >
            <span>Add Catetgory</span>
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full px-3"
              >
                <Separator className="my-4" />
                <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-neutral-900 bg-white"
                            placeholder="Enter Category"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
                <Button>Add</Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        {data &&
          data.map((category: Category) => (
            <AccordionItem
              key={category.id}
              value={category.categoryslug}
              className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 px-2 transition-all "
            >
              <AccordionTrigger
                icon={<ChevronDown className="w-4 h-4" />}
                className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]"
                onClick={() => {
                  resetSubCategory();
                  subcategoryform.setValue("category", category.id.toString());
                }}
              >
                {category.name}
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <p className="mb-3">Sub Category</p>
                {category.subcategories.map((subcategory: Subcategory) => (
                  <EditableText
                    key={subcategory.id}
                    initialText={subcategory.name}
                    initialId={subcategory.id}
                    subcategoryupdateform={updateform}
                    handleSubCategoryDelete={handleSubCategoryDelete}
                    onUpdate={handleSubCategoryUpgrade}
                  />
                ))}
                <span className="flex gap-2">
                  <Form {...subcategoryform}>
                    <form
                      onSubmit={subcategoryform.handleSubmit(
                        onSubmitSubCategory
                      )}
                      className="flex gap-2"
                    >
                      <FormField
                        control={subcategoryform.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-auto bg-white dark:bg-neutral-900"
                                placeholder="Enter Sub Category Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button>Add Sub Category</Button>{" "}
                    </form>
                  </Form>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant={"secondary"}
                        onClick={() => {
                          updateform.setValue("name", category.name);
                          updateform.setValue("id", category.id.toString());
                        }}
                      >
                        Edit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <Form {...updateform}>
                            <form
                              onSubmit={updateform.handleSubmit(
                                handleCatetgoryUpgrade
                              )}
                              className="flex gap-2"
                            >
                              <FormField
                                control={updateform.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="w-auto bg-white dark:bg-neutral-900"
                                        placeholder="Enter Sub Category Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </span>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </main>
  );
};

export default Category;

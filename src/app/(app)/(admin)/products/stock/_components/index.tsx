"use client";

import React, { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useGetStocksQuery,
  useVariantUpdateMutation,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, TrendingUp, Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn, delay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface NotifyUser {
  email: string;
  user: string;
}

interface LowStockVariant {
  id: number;
  size: string | null;
  price: string;
  notify_users: NotifyUser[];
  stock: number;
  discount: number;
}

interface Product {
  id: number;
  product_name: string;
  description: string;
  category: number;
  subcategory: number;
  image: string;
  low_stock_variants: LowStockVariant[];
  productslug: string;
}

const FormSchema = z.object({
  variants: z.array(
    z.object({
      id: z.number(),
      variant_id: z.number(),
      stock: z.number(),
    })
  ),
});

type FormData = z.infer<typeof FormSchema>;

const Stocks = () => {
  const { accessToken } = useAuthUser();
  const { data, refetch } = useGetStocksQuery(
    { token: accessToken },
    { skip: !accessToken }
  );

  const [updateProduct] = useVariantUpdateMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { control } = form;

  const { fields, replace } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = useCallback(
    async (variantId: number, stock: number) => {
      const data = {
        id: variantId,
        stock: stock,
      };
      const toastId = toast.loading(
        `Updating stock for variant ${variantId} to ${stock}`,
        {
          position: "top-center",
        }
      );
      if (stock >= 0) {
        await delay(500);
        const res = await updateProduct({
          token: accessToken,
          actualData: data,
        });
        if (res.data) {
          toast.success("Stock updated successfully", {
            id: toastId,
            position: "top-center",
          });
          refetch();
        } else {
          toast.error("Failed to update stock", {
            id: toastId,
            position: "top-center",
          });
        }
      } else {
        toast.error("Stock must be 0 or greater", {
          id: toastId,
          position: "top-center",
        });
      }
    },
    [accessToken, updateProduct]
  );

  useEffect(() => {
    if (data) {
      const allVariants = data.results.flatMap(
        (product: Product) => product.low_stock_variants
      );
      if (allVariants.length > 0) {
        replace(
          allVariants.map((variant: LowStockVariant) => ({
            id: variant.id,
            variant_id: variant.id,
            stock: variant.stock,
          }))
        );
      }
    }
  }, [data, replace]);

  return (
    <main className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <h1 className="text-2xl">Stocks</h1>
      <Accordion type="single" collapsible className="space-y-1 w-full">
        {data?.results.map((product: Product) => (
          <AccordionItem
            key={product.id}
            value={`product-${product.id}`}
            className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 pr-3 transition-all "
          >
            <AccordionTrigger
              icon={<ChevronDown className="w-4 h-4" />}
              className="relative text-left hover:no-underline p-0 w-full md:min-w-[450px]"
            >
              <span className=" flex flex-row gap-2 p-1 rounded-lg w-full">
                <Image
                  src={product.image}
                  alt="product"
                  width={70}
                  height={70}
                  className="rounded-md w-20 h-20 object-cover p-1 px-3 bg-white dark:bg-neutral-800 "
                />
                <span className="flex flex-col gap-2 items-start">
                  <p className="text-sm">{product.product_name}</p>
                  <Badge
                    variant={"danger"}
                    className="border-none gap-1 text-orange-500 max-w-[95px]"
                  >
                    <span
                      className={cn(
                        "animate-ping absolute inline-flex h-2 w-2  rounded-full ",
                        "bg-orange-500"
                      )}
                    ></span>
                    <span
                      className={cn(
                        "inline-flex h-2 w-2 right-0 top-0 rounded-full ",
                        "bg-orange-500"
                      )}
                    ></span>
                    Low Stock
                  </Badge>
                  {product.low_stock_variants.reduce(
                    (acc, variant) => acc + variant.notify_users.length,
                    0
                  ) >= 1 && (
                    <Badge
                      variant={"success"}
                      className="relative border-none gap-1 text-green-500 max-w-[120px] pl-1"
                    >
                      <TrendingUp className="w-4 h-4 stroke-green-700" />
                      In Demand
                    </Badge>
                  )}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Separator className="my-2" />
              <div className="flex flex-col px-2">
                {product.low_stock_variants.map((variant) => (
                  <Form key={variant.id} {...form}>
                    <form
                      onSubmit={form.handleSubmit((formData) => {
                        const updatedStock = formData.variants.find(
                          (v) => v.id === variant.id
                        )?.stock;
                        if (updatedStock !== undefined) {
                          onSubmit(variant.id, updatedStock);
                        }
                      })}
                      className="w-2/3 mb-2"
                    >
                      <FormField
                        control={form.control}
                        name={`variants.${fields.findIndex(
                          (f) => f.variant_id === variant.id
                        )}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Current Stock{" "}
                              {variant.size && `of ${variant.size} cm`}
                            </FormLabel>
                            <div className="flex flex-row gap-2">
                              <Button
                                type="button"
                                variant={"secondary"}
                                className="px-3"
                                disabled={field.value <= 0}
                                onClick={() =>
                                  field.onChange(Math.max(0, field.value - 1))
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <FormControl className="flex flex-row gap-2">
                                <Input
                                  className="dark:bg-neutral-900 bg-white max-w-[70px]"
                                  placeholder="Enter Stock"
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(
                                      Math.max(0, Number(e.target.value))
                                    )
                                  }
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant={"secondary"}
                                className="px-3"
                                onClick={() => field.onChange(field.value + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button type="submit" className="px-3">
                                Save
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                ))}
                {product.low_stock_variants.reduce(
                  (acc, variant) => acc + variant.notify_users.length,
                  0
                ) >= 1 && (
                  <span>
                    <p className="text-sm text-neutral-200">
                      Users requested for this product
                    </p>
                    <p className="text-sm text-neutral-500">
                      {product.low_stock_variants
                        .reduce<string[]>(
                          (acc, variant) =>
                            acc.concat(
                              variant.notify_users.map((user) => user.email)
                            ),
                          []
                        )
                        .join(", ")}
                    </p>
                  </span>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default Stocks;

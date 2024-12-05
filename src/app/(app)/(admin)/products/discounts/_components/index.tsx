"use client";

import { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, ChevronDown, MapPinned, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthUser } from "@/hooks/use-auth-user";
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
import {
  useAddRedeemCodeMutation,
  useUpdateRedeemCodeMutation,
  useDeleteRedeemCodeMutation,
  useRedeemCodeViewQuery,
} from "@/lib/store/Service/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { delay } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const RedeemCodeSchema = z.object({
  name: z.string().min(2, { message: "name must not be empty" }),
  code: z.string().min(2, { message: "code must not be empty" }),
  type: z.string(),
  discount: z.number().min(1, { message: "must not be empty" }),
  minimum: z.number().min(1, { message: "must not be empty" }),
  limit: z.number().min(1, { message: "must not be empty" }),
  used: z.number(),
  valid_until: z.string().min(2, { message: "must not be empty" }),
  is_active: z.boolean(),
});

interface RedeemCode {
  id: number;
  name: string;
  code: string;
  type: string;
  discount: number;
  minimum: number;
  limit: number;
  used: number;
  valid_until: string;
  is_active: boolean;
}

type RedeemCodeFormValues = z.infer<typeof RedeemCodeSchema>;

const ReedemCode = () => {
  const { accessToken } = useAuthUser();
  const { data, refetch } = useRedeemCodeViewQuery(
    { token: accessToken },
    { skip: !accessToken }
  );
  const [addRedeemCode, { isLoading }] = useAddRedeemCodeMutation();
  const [updateRedeemCode, { isLoading: Updataing }] =
    useUpdateRedeemCodeMutation();
  const [deleteRedeemCode, { isLoading: Deleting }] =
    useDeleteRedeemCodeMutation();

  const form = useForm<RedeemCodeFormValues>({
    resolver: zodResolver(RedeemCodeSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const updateform = useForm<RedeemCodeFormValues>({
    resolver: zodResolver(RedeemCodeSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      data.results.forEach((redeemCode: RedeemCode) => {
        updateform.reset(redeemCode);
      });
    }
  }, [data]);

  const onSubmit = useCallback(async (data: RedeemCodeFormValues) => {
    if ("id" in data) {
      const toastId = toast.loading("Updating...");
      await delay(500);
      const res = await updateRedeemCode({ data, token: accessToken });
      if ("data" in res) {
        refetch();
        toast.success("Updated successfully", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } else {
      const toastId = toast.loading("Adding...");
      await delay(500);
      const res = await addRedeemCode({ data, token: accessToken });
      if ("data" in res) {
        refetch();
        toast.success("Added successfully", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    }
  }, []);

  const onDelete = useCallback(async (id: number) => {
    const toastId = toast.loading("Deleting...");
    await delay(500);
    const res = await deleteRedeemCode({ id, token: accessToken });
    if ("data" in res) {
      refetch();
      toast.success("Deleted successfully", {
        id: toastId,
        position: "top-center",
      });
    } else {
      toast.error("Something went wrong", {
        id: toastId,
        position: "top-center",
      });
    }
  }, []);

  return (
    <section className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <h1 className="text-2xl">Discounts</h1>
      <Accordion type="single" collapsible className="space-y-1 w-full">
        {data &&
          data.results.map((redeemCode: RedeemCode) => (
            <AccordionItem
              key={redeemCode.id}
              value={`redeem-${redeemCode.id}`}
              className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 px-2 transition-all "
            >
              <AccordionTrigger
                icon={<ChevronDown className="w-4 h-4" />}
                className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]"
              >
                <span className="flex justify-between flex-col">
                  <h1>{redeemCode.name}</h1>
                  <p>
                    {redeemCode.used} / {redeemCode.limit}
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Form {...updateform}>
                  <form
                    onSubmit={updateform.handleSubmit(onSubmit)}
                    className="space-y-4 w-full px-3"
                  >
                    <Separator className="my-4" />
                    <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormField
                        control={updateform.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateform.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Code"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                    <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormField
                        control={updateform.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <SelectTrigger className="dark:bg-neutral-900 bg-white">
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">
                                    Percentage
                                  </SelectItem>
                                  <SelectItem value="amount">
                                    Fixed Amount
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateform.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Discount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                    <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormField
                        control={updateform.control}
                        name="minimum"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Minimum"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateform.control}
                        name="limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Limit</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Limit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                    <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormField
                        control={updateform.control}
                        name="valid_until"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valid Until</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:bg-neutral-900 bg-white"
                                placeholder="Enter Valid Until"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                    {/* <FormField
                      control={updateform.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormLabel>Active</FormLabel>
                          <FormControl>
                            <Switch {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    /> */}
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          ))}
        <AccordionItem value="add-redeem-code" className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 px-2 transition-all ">
          <AccordionTrigger icon={<ChevronDown className="w-4 h-4" />} className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]">
            <span>Add Redeem Code</span>
          </AccordionTrigger>
          <AccordionContent>
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
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger className="dark:bg-neutral-900 bg-white">
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percentage">
                                  Percentage
                                </SelectItem>
                                <SelectItem value="amount">
                                  Fixed Amount
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Discount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="minimum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Minimum"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="limit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limit</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="valid_until"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid Until</FormLabel>
                          <FormControl>
                            <Input
                              className="dark:bg-neutral-900 bg-white"
                              placeholder="Enter Valid Until"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  {/* <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                  <Button type="submit" disabled={isLoading} loading={isLoading}>
                    Add
                  </Button>
                </form>
              </Form>
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ReedemCode;

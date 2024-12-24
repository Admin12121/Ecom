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
import { ChevronDown } from "lucide-react";
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
import { cn, delay } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

const RedeemCodeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "name must not be empty" }),
  code: z.string().min(2, { message: "code must not be empty" }),
  type: z.string(),
  discount: z.string().min(1, { message: "must not be empty" }),
  minimum: z.number().min(1, { message: "must not be empty" }),
  limit: z.number().min(1, { message: "must not be empty" }),
  used: z.number().optional(),
  valid_until: z.string().min(2, { message: "must not be empty" }),
  is_active: z.boolean(),
});

interface RedeemCode {
  id: number;
  name: string;
  code: string;
  type: string;
  discount: string;
  minimum: number;
  limit: number;
  used: number;
  valid_until: string;
  is_active: boolean;
}

type RedeemCodeFormValues = z.infer<typeof RedeemCodeSchema>;

const defaultFormValues: RedeemCodeFormValues = {
  id: undefined,
  name: "",
  code: "",
  type: "",
  discount: "",
  minimum: 0,
  limit: 0,
  used: undefined,
  valid_until: "",
  is_active: false,
};

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
    defaultValues: defaultFormValues,
  });

  const updateform = useForm<RedeemCodeFormValues>({
    resolver: zodResolver(RedeemCodeSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (data) {
      data.results.forEach((redeemCode: RedeemCode) => {
        updateform.reset(redeemCode);
      });
    }
  }, [data]);

  const onSubmit = useCallback(async (data: RedeemCodeFormValues) => {
    if ("id" in data && data.id) {
      const toastId = toast.loading("Updating...", { position: "top-center" });
      await delay(500);
      const res = await updateRedeemCode({
        actualData: data,
        token: accessToken,
      });
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
      const toastId = toast.loading("Adding...", { position: "top-center" });
      await delay(500);
      const res = await addRedeemCode({ actualData: data, token: accessToken });
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

  const handleActive = useCallback(async (id: number, value: boolean) => {
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    const actualData = {
      id: id,
      is_active: value,
    };
    const res = await updateRedeemCode({
      actualData,
      token: accessToken,
    });
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
    <main className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <h1 className="text-2xl">Discounts</h1>
      <Accordion type="single" collapsible className="space-y-1 w-full">
        <AccordionItem
          value="add-redeem-code"
          className="rounded-lg shadow-none bg-neutral-100 dark:bg-neutral-950 px-2 transition-all "
        >
          <AccordionTrigger
            icon={<ChevronDown className="w-4 h-4" />}
            className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]"
          >
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
                            <Select
                              {...field}
                              onValueChange={(value) => field.onChange(value)}
                            >
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
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
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
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Add
                  </Button>
                </form>
              </Form>
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
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
                <span className="flex w-full justify-between items-center">
                  <span className="flex justify-between flex-col ">
                    <h1>{redeemCode.name}</h1>
                    <span className="flex items-center gap-1">
                      <p className="text-sm dark:text-neutral-300 font-normal">
                        {redeemCode.used} / {redeemCode.limit} used
                      </p>
                    </span>
                  </span>
                  <span className="flex gap-1 flex-col">
                    <Badge
                      variant={redeemCode.is_active ? "success" : "danger"}
                      className="border-none gap-1"
                    >
                      <span
                        className={cn(
                          "animate-ping absolute inline-flex h-2 w-2  rounded-full ",
                          redeemCode.is_active
                            ? "bg-green-500"
                            : "bg-orange-500"
                        )}
                      ></span>
                      <span
                        className={cn(
                          "inline-flex h-2 w-2 right-0 top-0 rounded-full ",
                          redeemCode.is_active
                            ? "bg-green-500"
                            : "bg-orange-500"
                        )}
                      ></span>
                      {redeemCode.is_active ? "Active" : "InActive"}
                    </Badge>
                    {new Date(redeemCode.valid_until) < new Date() && (
                      <Badge variant="danger" className="border-none  gap-1">
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
                        Expired
                      </Badge>
                    )}
                  </span>
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
                              <Select
                                {...field}
                                onValueChange={(value) => field.onChange(value)}
                              >
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
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
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
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
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
                    <span className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={Updataing}
                        loading={Updataing}
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleActive(redeemCode.id, !redeemCode.is_active)
                        }
                        disabled={Updataing}
                        loading={Updataing}
                      >
                        {redeemCode.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            disabled={Deleting}
                            loading={Deleting}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete variant data and remove it from
                              our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(redeemCode.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </span>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </main>
  );
};

export default ReedemCode;

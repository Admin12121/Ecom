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
import { MapPinned, Trash } from "lucide-react";
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
  useShippingMutation,
  useGetshippingQuery,
  useUpdateshippingMutation,
  useDeleteshippingMutation,
} from "@/lib/store/Service/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { delay } from "@/lib/utils";
const AddressSchema = z.object({
  address: z.string().min(2, { message: "address must not be empty" }),
  country: z.string().min(2, { message: "must not be empty" }),
  city: z.string().min(2, { message: "must not be empty" }),
  zipcode: z.string().min(2, { message: "must not be empty" }),
  default: z.boolean(),
});

const SecondaryAddressSchema = z.object({
  id: z.number().min(1, { message: "Id is required" }),
  address: z.string().min(2, { message: "address must not be empty" }),
  country: z.string().min(2, { message: "must not be empty" }),
  city: z.string().min(2, { message: "must not be empty" }),
  zipcode: z.string().min(2, { message: "must not be empty" }),
  default: z.boolean(),
});

interface Address {
  id: number;
  address: string;
  country: string;
  city: string;
  zipcode: string;
  default: boolean;
}

type AddressFormValues = z.infer<typeof AddressSchema>;
type udateAddressFormValues = z.infer<typeof SecondaryAddressSchema>;

const Shipping = () => {
  const { accessToken } = useAuthUser();
  const { data, refetch } = useGetshippingQuery(
    { token: accessToken },
    { skip: !accessToken }
  );
  const [addShipping, { isLoading }] = useShippingMutation();
  const [removeShipping] = useDeleteshippingMutation();
  const [updateShipping, { isLoading: Updataing }] =
    useUpdateshippingMutation();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      country: "",
      city: "",
      zipcode: "",
      default: false,
    },
  });

  const updateform = useForm<udateAddressFormValues>({
    resolver: zodResolver(SecondaryAddressSchema),
    mode: "onChange",
    defaultValues: {
      id: 0,
      address: "",
      country: "",
      city: "",
      zipcode: "",
      default: false,
    },
  });

  useEffect(() => {
    if (data) {
      data.results.forEach((addressData: Address) => {
        updateform.reset(addressData);
      });
    }
  }, [data, updateform]);

  const onSubmit = useCallback(
    async (data: AddressFormValues | udateAddressFormValues) => {
      const actualData = { ...data };
      if ("id" in actualData) {
        const res = await updateShipping({ actualData, token: accessToken });
        if (res.data) {
          refetch();
          toast.success("Address Updated", {
            action: {
              label: "X",
              onClick: () => toast.dismiss(),
            },
          });
        } else {
          console.log(res.error);
        }
      } else {
        const res = await addShipping({ actualData, token: accessToken });
        if (res.data) {
          refetch();
          toast.success("New Shipping Address Added", {
            action: {
              label: "X",
              onClick: () => toast.dismiss(),
            },
          });
          form.reset();
        } else {
          console.log(res.error);
        }
      }
    },
    []
  );

  const onDelete = useCallback(async (id: number) => {
    const toastId = toast.loading("Deleting Shipping Address...", {
      position: "top-center",
    });
    await delay(500);
    const res = await removeShipping({ id, token: accessToken });
    if (res.data) {
      refetch();
      toast.success("Shipping Address Removed", {
        id: toastId,
        position: "top-center",
      });
    } else {
      toast.error("Something went wrong!", {
        id: toastId,
        position: "top-center",
      });
    }
  }, []);

  return (
    <section className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex items-center flex-col gap-2">
      <h1 className="text-2xl">Shipping address</h1>
      <Accordion type="single" collapsible className="space-y-1 w-full">
        <AccordionItem
          value="Add Shipping Address"
          className="rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all "
        >
          <AccordionTrigger className="text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]">
            <p className="flex items-center gap-3">
              <MapPinned className="w-4 h-4" />
              Add Shipping address
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex w-full ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full px-1"
              >
                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="default"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">
                        Set as default address
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="custom" type="submit" loading={isLoading}>
                  Save
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        {data &&
          data.results.map((addressData: Address) => (
            <AccordionItem
              key={addressData.id}
              value={`address-${addressData.id}`}
              className="rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all "
            >
              <AccordionTrigger icon={(<></>)} className="relative text-left hover:no-underline pl-2 py-3 w-full md:min-w-[450px]">
                <span className="flex flex-col">
                  <h1 className="flex items-center gap-3">
                    {addressData.default
                      ? "Default address"
                      : "Secondary address"}
                  </h1>
                  <p className="text-zinc-500">{addressData.address}</p>
                  <p className="text-zinc-500">
                    {addressData.zipcode}, {addressData.city},{" "}
                    {addressData.country}
                  </p>
                </span>
                <span
                  onClick={() => {
                    onDelete(addressData.id);
                  }}
                  className="absolute right-2 p-2 bg-neutral-200 dark:bg-neutral-600 rounded-md cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex w-full ">
                <Form {...updateform}>
                  <form
                    onSubmit={updateform.handleSubmit(onSubmit)}
                    className="space-y-4 w-full px-1"
                  >
                    <Separator className="my-4" />
                    <FormField
                      control={updateform.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateform.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <FormField
                        control={updateform.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateform.control}
                        name="zipcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Zip code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={updateform.control}
                      name="default"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">
                            Set as default address
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant="custom" type="submit" loading={Updataing}>
                      Update
                    </Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </section>
  );
};

export default Shipping;

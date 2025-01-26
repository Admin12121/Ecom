"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";

const SecondaryAddressSchema = z.object({
  id: z.number().min(1, { message: "Id is required" }),
  address: z.string().min(2, { message: "address must not be empty" }),
  country: z.string().min(2, { message: "must not be empty" }),
  city: z.string().min(2, { message: "must not be empty" }),
  zipcode: z.string().min(2, { message: "must not be empty" }),
  phone: z.string().max(160).min(4),
  default: z.boolean(),
});

type udateAddressFormValues = z.infer<typeof SecondaryAddressSchema>;

interface Address {
    id: number;
    address: string;
    country: string;
    city: string;
    phone: string;
    zipcode: string;
    default: boolean;
  }
  

interface ShippingProps {
  Updataing: boolean;
  data: Address;
  onSubmit: (data: udateAddressFormValues) => void;
}

const ShippingForm = ({ onSubmit, Updataing, data }: ShippingProps) => {
  const updateform = useForm<udateAddressFormValues>({
    resolver: zodResolver(SecondaryAddressSchema),
    mode: "onChange",
    defaultValues: data,
  });

  return (
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormLabel className="!mt-0">Set as default address</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="custom" type="submit" loading={Updataing}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ShippingForm;

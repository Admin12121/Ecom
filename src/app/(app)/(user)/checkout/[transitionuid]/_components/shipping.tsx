import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useShippingMutation } from "@/lib/store/Service/api";

const AddressSchema = z.object({
  address: z.string().min(2, { message: "address must not be empty" }),
  country: z.string().min(2, { message: "must not be empty" }),
  city: z.string().min(2, { message: "must not be empty" }),
  zipcode: z.string().min(2, { message: "must not be empty" }),
  default: z.boolean(),
});

type AddressFormValues = z.infer<typeof AddressSchema>;

const Shipping = ({ accessToken, refetch }: { accessToken?: string, refetch:any }) => {
  const [addShipping, { isLoading }] = useShippingMutation();

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
  const onSubmit = useCallback(async (data: AddressFormValues) => {
    const actualData = { ...data };

    const res = await addShipping({ actualData, token: accessToken });
    if (res.data) {
      toast.success("New Shipping Address Added", {
        action: {
          label: "X",
          onClick: () => toast.dismiss(),
        },
      });
      form.reset();
      refetch()
    } else {
      console.log(res.error);
    }
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full relative z-50">Add Shipping address</Button>
      </DialogTrigger>
      <DialogContent className="w-[95dvw] rounded-md md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Shipping address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full px-1"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input className="dark:bg-neutral-800" placeholder="Enter Address" {...field} />
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
                    <Input className="dark:bg-neutral-800" placeholder="Enter Country" {...field} />
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
                      <Input className="dark:bg-neutral-800" placeholder="Enter City" {...field} />
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
                      <Input className="dark:bg-neutral-800" placeholder="Enter Zip code" {...field} />
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
      </DialogContent>
    </Dialog>
  );
};

export default Shipping;

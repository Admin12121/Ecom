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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
type RedeemCodeFormValues = z.infer<typeof RedeemCodeSchema>;

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

export const RedeemCodeForm = ({
  data,
  Updataing,
}: {
  data: any;
  Updataing: any;
}) => {
  const updateform = useForm<RedeemCodeFormValues>({
    resolver: zodResolver(RedeemCodeSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });
  useEffect(() => {
    if (data) {
      updateform.reset(data);
    }
  }, [data]);
  const onSubmit = useCallback(async (data: RedeemCodeFormValues) => {
    // if ("id" in data && data.id) {
    //   const toastId = toast.loading("Updating...", { position: "top-center" });
    //   await delay(500);
    //   const res = await updateRedeemCode({
    //     actualData: data,
    //     token: accessToken,
    //   });
    //   if ("data" in res) {
    //     refetch();
    //     toast.success("Updated successfully", {
    //       id: toastId,
    //       position: "top-center",
    //     });
    //   } else {
    //     toast.error("Something went wrong", {
    //       id: toastId,
    //       position: "top-center",
    //     });
    //   }
    // } else {
    //   const toastId = toast.loading("Adding...", { position: "top-center" });
    //   await delay(500);
    //   const res = await addRedeemCode({ actualData: data, token: accessToken });
    //   if ("data" in res) {
    //     refetch();
    //     toast.success("Added successfully", {
    //       id: toastId,
    //       position: "top-center",
    //     });
    //   } else {
    //     toast.error("Something went wrong", {
    //       id: toastId,
    //       position: "top-center",
    //     });
    //   }
    // }
  }, []);
  return (
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
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="dark:bg-neutral-900 bg-white">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="amount">Fixed Amount</SelectItem>
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
          <Button type="submit" disabled={Updataing} loading={Updataing}>
            Update
          </Button>
          {/* <Button
            type="button"
            variant="outline"
            onClick={() => handleActive(redeemCode.id, !redeemCode.is_active)}
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  variant data and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(redeemCode.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </span>
      </form>
    </Form>
  );
};

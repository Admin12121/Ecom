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
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import DeleteModel from "@/components/global/delete-model";

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

interface Props {
  onSubmit: (data: RedeemCodeFormValues) => void;
  handleActive: (id: number, active: boolean) => void;
  onDelete: (id: number) => void;
  Updataing: boolean;
  Deleting: boolean;
  data: RedeemCode;
}

export const RedeemCodeForm = ({
  data,
  onSubmit,
  Updataing,
  handleActive,
  onDelete,
  Deleting,
}: Props) => {
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
                    onValueChange={(value) => {
                      if (value !== field.value) {
                        field.onChange(value);
                      }
                    }}
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
          <Button
            type="button"
            variant="outline"
            onClick={() => handleActive(data.id, !data.is_active)}
            disabled={Updataing}
            loading={Updataing}
          >
            {data.is_active ? "Deactivate" : "Activate"}
          </Button>
          <DeleteModel PROJECT_NAME={data.name} handleDelete={() => onDelete(data.id)} title="Redeem Code"/>
        </span>
      </form>
    </Form>
  );
};

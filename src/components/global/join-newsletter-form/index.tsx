"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { emailSchema, type EmailSchema } from "@/types/notification";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostnewsletterMutation } from "@/lib/store/Service/api";
import { delay } from "@/lib/utils";

interface ErrorResponse {
  data?: {
    errors?: Record<string, string[]>;
  };
}

export function JoinNewsletterForm() {
  const unknownError = "An unknown error occurred. Please try again later.";
  const [loading, setLoading] = React.useState(false);
  const [postnewsletter] = usePostnewsletterMutation();

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: EmailSchema) {
    try {
      setLoading(true);
      await delay(500);
      const res = await postnewsletter({ actualData: data });
      if (res.error && "data" in res.error) {
        const errorData: Record<string, string[]> =
          (res.error as ErrorResponse).data?.errors || {};
        const errorMessages = Object.values(errorData).flat().join(", ");
        const formattedMessage = errorMessages || "An unknown error occurred";
        toast.error(formattedMessage);
        return;
      }
      if (res.data) {
        toast.success("You have been subscribed to our newsletter.");
        form.reset();
      }
    } catch (err) {
      toast.error(unknownError);
    } finally{
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative space-y-0">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="skate@gmail.com"
                  className="pr-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button
                className="absolute right-[3.5px] top-[4px] z-20 size-7"
                size="icon"
                disabled={loading}
                loading={loading}
              >
                <PaperPlaneIcon className="size-3" aria-hidden="true" />
                <span className="sr-only">Join newsletter</span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

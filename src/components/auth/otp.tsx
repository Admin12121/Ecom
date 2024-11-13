"use client";

import Cardwrapper from "./cardwrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema } from "../../schemas";
import * as z from "zod";
import { Button } from "../ui/button";
import { FormError } from "../form-message/form-error";
import { FormSuccess } from "../form-message/form-success";
import React, { useState, useEffect } from "react";
import useApi from "@/lib/useApi";
import { usePathname, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormField,
} from "../ui/form";

export function InputOTPWithSeparator() {
  const pathname = usePathname();
  const router = useRouter();
  const pathParts = pathname.split("/");
  const uid = pathParts[3];
  const { data, error, isLoading, fetchData } = useApi<any>();
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
      uid: uid,
    },
  });

  const onSubmit = async (values: z.infer<typeof OtpSchema>) => {
    const payload = { otp: values.otp, uid: values.uid };
    try {
      await fetchData({
        url: `/api/auth/reset-password/${uid}`,
        method: "POST",
        data: payload,
      });
    } catch (e) {
      console.error("Submission error:", e);
    }
  };

  useEffect(() => {
    if (data) {
      setSuccess("OTP Verified Successfully");
      setTimeout(() => {
        setSuccess("Redirecting ...");
      }, 2000);      
      setTimeout(() => {
        router.push(data.redirectUrl);
      }, 4000);
    }
  }, [data]);

  return (
    <Cardwrapper
      title="OTP Verification"
      headerLabel="Enter OTP"
      backButtonLabel="Back to Reset Password"
      backButtonHref="/auth/reset-password"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 w-full flex justify-center items-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <InputOTP
                  maxLength={5}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4].map((index) => (
                      <React.Fragment key={index}>
                        <InputOTPGroup>
                          <InputOTPSlot index={index} />
                        </InputOTPGroup>
                        {index < 4 && <InputOTPSeparator />}
                      </React.Fragment>
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            className="w-full !mt-3"
          >
            Verify OTP
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
}

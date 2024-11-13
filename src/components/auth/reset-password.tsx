"use client";

import Cardwrapper from "./cardwrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "../../schemas";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-message/form-error";
import { FormSuccess } from "../form-message/form-success";
import { useState, useEffect } from "react";
import useApi from '@/lib/useApi';

const ResetPasswordForm = () => {
    const { data, error, isLoading, fetchData } = useApi<any>(); 
    const [success, setSuccess] = useState<string>("");
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
        email: "",
      },
    });
  
    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
      fetchData({
        url: '/api/auth/reset-password',
        method: 'POST',
        data: values
      });
    };
  
    useEffect(()=>{
      if(data){
        setSuccess("Reset Password Email Sent Successfully");
        if(data.redirectUrl){
          window.location.href = data.redirectUrl;
        }
      }
    },[data])
  
  return (
    <Cardwrapper
      title="Password"
      headerLabel="Forgot your Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="email"
                      placeholder="john@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isLoading} loading={isLoading} type="submit" className="w-full !mt-3">
            Send reset email
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  )
}

export default ResetPasswordForm;
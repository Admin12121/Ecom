"use client";

import Cardwrapper from "./cardwrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "../../schemas";
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
import { usePathname, useRouter } from "next/navigation";
import useApi from '@/lib/useApi';

const PasswordForm = () => {
    const pathname = usePathname();
    const router = useRouter();
    const pathParts = pathname.split("/");
    const uid = pathParts[3];
    const token = pathParts[4];
    const { data, error, isLoading, fetchData } = useApi<any>(); 
    const [success, setSuccess] = useState<string>("");
    const form = useForm<z.infer<typeof PasswordSchema>>({
      resolver: zodResolver(PasswordSchema),
      defaultValues: {
        uid: uid,
        token: token,
        password: "",
      },
    });
  
    const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
      fetchData({
        url: `/api/auth/reset-password/${uid}`,
        method: 'PATCH',
        data: values
      });
    };
  
    useEffect(()=>{
      if(data){
        setSuccess("Password Reset Successfully");
        setTimeout(() => {
            setSuccess("Redirecting ...");
          }, 2000);      
          setTimeout(() => {
            router.push(data.redirectUrl);
          }, 4000);
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="password"
                      placeholder="new Password"
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
            Reset Password
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  )
}

export default PasswordForm;
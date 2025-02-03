"use client";

import Cardwrapper from "./cardwrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import LoginError from "./login-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-message/form-error";
import { FormSuccess } from "../form-message/form-success";
import { useState, useEffect } from "react";
import Link from "next/link";
import useApi from "@/lib/useApi";
import { useRouter } from "nextjs-toploader/app";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useAuthUser } from "@/hooks/use-auth-user";

const Login = () => {
  const router = useRouter();
  const { update } = useAuthUser();
  const { data, error, isLoading, fetchData } = useApi<any>();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string>("");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    fetchData({
      url: "/api/auth/login",
      method: "POST",
      data: values,
    });
  };

  useEffect(() => {
    if (data) {
      setSuccess("Login Successfull");
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
        update();
      }
    }
  }, [data]);

  if (errorParam) {
    return <LoginError errorParam={errorParam} />;
  }

  return (
    <Cardwrapper
      title="Welcome back!"
      headerLabel="Please enter your details to continue"
      backButtonLabel="Dont have an account?"
      backButton="Create account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-normal">Email address</Label>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="email"
                      placeholder="vicky@gmail.com"
                      className="dark:bg-muted"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-normal">Password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="password"
                      placeholder="***********"
                      autoComplete="off"
                      className="dark:bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Link
            href="/auth/reset-password"
            className="!mt-2 dark:text-themeTextGray text-xs underline dark:hover:text-themeTextWhite transition duration-500 flex justify-end w-full font-light"
          >
            Forgot Password?
          </Link>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            className={cn("w-full !mt-2 fancy-button")}
          >
            Login
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
};

export default Login;

"use client";

import React, { useEffect, useState } from "react";
import Cardwrapper from "./cardwrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../schemas";
import * as z from "zod";
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
import useApi from "@/lib/useApi";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { delay } from "@/lib/utils";

const RegisterForm = () => {
  const router = useRouter();
  const { data, error, isLoading, fetchData } = useApi<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const { username, ...rest } = values;
    const [first_name, ...lastnameParts] = username.trim().split(/\s+/);
    const last_name = lastnameParts.join(" ");
    const randomSymbols = "!@#$%^&*";
    const randomSymbol =
      randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
    const uniqueUsername = `${randomSymbol}${username
      .replace(/\s+/g, "")
      .toLowerCase()}${Math.floor(Math.random() * 10000)}`;

    const updatedValues = {
      ...rest,
      first_name,
      last_name,
      username: uniqueUsername,
    };
 
    fetchData({
      url: "/api/auth/registration",
      method: "POST",
      data: updatedValues,
    });
  };

  useEffect(() => {
    if (data && data.success) {
      form.reset();
      delay(1000);
      router.push('/auth/login');
      toast.success('Activation link has been sent to your email');
    }
  },[data])

  return (
    <Cardwrapper
      title="Create account"
      headerLabel="Please enter your details to create an account"
      backButtonLabel="Already have an account?"
      backButton="Sign in"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-normal">User Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="text"
                      placeholder="Vicky Tajpuriya"
                      className="dark:bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-normal">Email Address</Label>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="email"
                      placeholder="vikcy@gmail.com"
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
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isLoading}
                        type={isVisible ? "text" : "password"}
                        placeholder="***********"
                        autoComplete="off"
                        className="dark:bg-muted"
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                      >
                        {isVisible ? (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={data?.message} />
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            className="w-full fancy-button"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
};

export default RegisterForm;

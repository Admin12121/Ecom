import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, SignUpSchema } from "@/schemas";
// import { login } from "@/actions/login";
// import { signUp } from "@/actions/register"
import { z } from "zod";

export const useAuthSignIn = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onAuthenticateUser = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    // const response = await login(data);
    setIsPending(false);
    // if (response?.error) {
    //   setError(response.error);
    // } else {
    //   setSuccess(response?.success || "Login successful!");
    // }
  };

  return {
    isPending,
    onAuthenticateUser: form.handleSubmit(onAuthenticateUser),
    register: form.register,
    errors: form.formState.errors,
    error: error,
    success: success
  };
};

export const useAuthSignUp = () => {
  const [verifying, setVerifying] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onGenerateCode = async (email: string, password: string) => {
    setVerifying(true);
  };

  const onInitiateUserRegistration = form.handleSubmit(async (data: z.infer<typeof SignUpSchema>) => {
    setCreating(true);
    // const response = await signUp(data);
    setCreating(false);
    // if (response.error) {
    //   console.error(response.error);
    // } else {
    //   setCode(response.code!);
    //   setVerifying(true);
    // }
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues: form.getValues,
  };
};
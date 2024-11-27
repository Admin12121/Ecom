"use client";

import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Next_CONSTANTS } from "@/constants";
import { useAuthSignIn } from "@/hooks/authentication";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/forms/Form-error";
import { FormSuccess } from "@/components/forms/Form-success";
import Link from "next/link";

const SignInForm = () => {
  const { isPending, onAuthenticateUser, register, errors , error, success} = useAuthSignIn();

  return (
    <form className="flex flex-col gap-3 mt-5" onSubmit={onAuthenticateUser}>
      {Next_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <FormError message={error}/>
      <FormSuccess message={success}/>
      <div className="flex py-2 px-1 justify-between">
        <span className="flex items-center gap-2">
          <Checkbox color="secondary" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-themeTextGray"
          >
            Remember me
          </label>
        </span>

        <Link href="#" className="text-sm text-themeTextGray hover:text-white transition duration-300">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="rounded-md border-2 border-neutral-800" disabled={isPending} loading={isPending}>
        <Loader loading={isPending}>Sign In</Loader>
      </Button>
    </form>
  );
};

export default SignInForm;

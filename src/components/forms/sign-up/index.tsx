"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Next_CONSTANTS } from "@/constants";
import { useAuthSignUp } from "@/hooks/authentication";
import { Checkbox } from "@/components/ui/checkbox";
import { Google } from "@/icons";
import Github from "@/icons/github"
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import Link from "next/link";

const OtpInput = dynamic(
  () => import("@/components/global/otp-input").then((component) => component.default),
  { ssr: false }
);

const SocialButtons = () => (
  <span className="w-full flex gap-5 items-center justify-center my-5">
    {[Google, Github].map((Icon, index) => (
      <Button key={index} variant="default" size="lg" className="w-full bg-white text-gray-900 px-4 py-2 rounded-md flex items-center space-x-2 shadow hover:shadow-lg transition">
        <Icon />
      </Button>
    ))}
  </span>
);

const TermsSection = () => (
  <div className="flex py-2 px-1 justify-between">
    <span className="flex items-center gap-2 justify-center">
      <Checkbox color="secondary" />
      <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-themeTextGray">
        Accept <Link href="/" className="text-gray-300">Terms</Link> and <Link href="/" className="text-gray-300">Conditions</Link>
      </label>
    </span>
  </div>
);

const SignUpForm = () => {
  const { register, errors, verifying, creating, onGenerateCode, onInitiateUserRegistration, code, setCode, getValues } = useAuthSignUp();

  return (
    <>
      {!verifying && <>
        <SocialButtons />
        <div className="my-10 w-full relative">
          <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">OR CONTINUE WITH</div>
          <Separator orientation="horizontal" className="bg-themeGray" />
        </div>
      </>}
      <form onSubmit={onInitiateUserRegistration} className="flex flex-col gap-3 mt-10">
        {verifying ? (
          <div className="flex justify-center mb-5">
            <OtpInput otp={code} setOtp={setCode} />
          </div>
        ) : (
          Next_CONSTANTS.signUpForm.map((field) => (
            <FormGenerator {...field} key={field.id} register={register} errors={errors} />
          ))
        )}
        {!verifying && <TermsSection />}
        <Button type="submit" className="rounded-md border-2 border-neutral-800 h-10" onClick={!verifying ? () => onGenerateCode(getValues("email"), getValues("password")) : undefined}>
          <Loader loading={verifying ? creating : false}>{verifying ? "Sign Up with Email" : "Generate Code"}</Loader>
        </Button>
      </form>
      {!verifying && <div className="mt-5 w-full relative flex items-center justify-center gap-1">
        <p className="text-center text-themeTextGray text-sm">Already have an account?</p>
        <Link href="/auth/sign-in" className="cursor-pointer text-sm">Sign In</Link>
      </div>}
    </>
  );
};

export default SignUpForm;
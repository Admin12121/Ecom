import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export const dynamic = "force-static";

type ButtonVariant = "default" | "outline" | "link" | "active" | "custom" | "destructive" | "secondary" | "ghost";

interface SupportOption {
  title: string;
  description: string;
  link?: string;
  buttonLabel: string;
  buttonVariant: ButtonVariant;
  buttonClass?: string;
}

const supportOptions: SupportOption[] = [
  {
    title: "FAQ",
    description: "Your question can be already answered.",
    link: "/faq",
    buttonLabel: "Go to FAQ page",
    buttonVariant: "default",
  },
  {
    title: "Chat",
    description: "Speak to a satisfactory representative.",
    link: "/contacts/chat",
    buttonLabel: "Chat with us",
    buttonVariant: "default",
  },
  {
    title: "General contact",
    description: "Speak to one of our agents.",
    link: "/faq",
    buttonLabel: "Send email",
    buttonVariant: "outline",
    buttonClass: "border-gray-300 text-gray-700 hover:bg-gray-50",
  },
  {
    title: "Call us",
    description: "Speak to one of our agents.",
    link: "/faq",
    buttonLabel: "Call us",
    buttonVariant: "outline",
    buttonClass: "border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

const SupportCard = ({ title, description, link, buttonLabel, buttonVariant, buttonClass }: SupportOption) => (
  <Card className="bg-white p-3 rounded-xl border shadow-sm w-full flex flex-col justify-between h-full">
    <div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300 mb-10">{description}</p>
    </div>
    {link ? (
      <Link href={link} className="mt-auto">
        <Button variant={buttonVariant}>{buttonLabel}</Button>
      </Link>
    ) : (
      <Button variant={buttonVariant} className={`${buttonClass} mt-auto`}>{buttonLabel}</Button>
    )}
  </Card>
);

const Page = () => {
  return (
    <main className="pt-3 w-full px-5 lg:px-14 flex gap-3 flex-col pb-10 max-w-[95rem] items-center h-full min-h-[calc(100dvh_-_11dvh)]">
      <div className="h-full flex flex-col gap-24 items-center justify-center w-full mt-32">
        <h1 className="text-[50px] font-semibold">How can we help you?</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 w-full">
          {supportOptions.map((option, index) => (
            <SupportCard key={index} {...option} />
          ))}
        </div>
        <div className="flex gap-5 items-center justify-start w-full mt-10">
          <h1 className="text-3xl">Continue shopping</h1>
        </div>
      </div>
    </main>
  );
};

export default Page;

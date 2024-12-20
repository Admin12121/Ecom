import React from "react";
import PolicyAccordion from "./_components";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <main className="pt-3 w-full px-5 lg:px-14 flex gap-3 flex-col pb-10 max-w-[95rem] items-center  h-[calc(100dvh_-_11dvh)] overflow-y-auto">
      <h1 className="text-3xl">Privacy Policy</h1>
      <p className="text-lg max-w-[50rem] text-neutral-700 dark:text-neutral-300">
        <span className="text-neutral-950 dark:text-white">Nepal Heritage Handicraft</span>{" "}
        recognizes the importance of your personal information and privacy. This
        Privacy Policy sets out how Nepal Heritage Handicraft processes, uses
        and protects information that it collects from its customers, visitors
        and users (collectively, the &quot;Customer&quot;, &quot;you&quot; or
        &quot;your&quot;) through its website with a homepage located at{" "}
        <Link href={"/"} className="text-neutral-950 dark:text-white">www.nepalheritagehandicraft.com</Link>{" "}
        (the &quot;Site&quot;), its products and services that are offered via
        the Site, its related social media platforms, and through
        Customers&apos; interactions with{" "}
        <span className="text-neutral-950 dark:text-white">Nepal Heritage Handicraft</span> (the
        Site, products, services, and social media pages, collectively, the
        &quot;Services&quot;). Here you may find why and how Nepal Heritage
        Handicraft collects that information, how it uses that information, and
        to whom and in what capacity it shares that information. By accessing
        the Services, using features of the Services, and/or submitting
        information to{" "}
        <span className="text-neutral-950 dark:text-white">Nepal Heritage Handicraft</span>, you
        agree to this <span className="text-neutral-950 dark:text-white">Privacy Policy</span>.
      </p>
      <PolicyAccordion />
    </main>
  );
};

export default PrivacyPolicy;

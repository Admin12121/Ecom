import React from "react";
import { Shell } from "@/components/global/shell";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { JoinNewsletterForm } from "@/components/global/join-newsletter-form";
import Image from "next/image";

const Footer = () => {
  return (
    <Shell className="max-w-[95rem]">
      <div className="flex gap-10 items-center lg:flex-row flex-col">
        <span className="flex flex-col gap-4 rounded-lg border border-primary/10 bg-primary/10 p-4 text-2xl lg:max-w-[443px] justify-between w-full">
          <div>
            <p className="text-2xl/normal font-semibold">
              Free gift with 1st order
            </p>
            <p className="text-xl">Join our newsletter to claim it</p>
          </div>
          <JoinNewsletterForm />
        </span>
        <Image src="/footer.png" width={400} height={100} alt="store" className="border border-primary/10 bg-primary/10 w-full h-[150px] rounded-lg object-left object-contain opacity-90"/>
      </div>
      <section className="flex flex-col gap-10 justify-between lg:flex-row lg:gap-20">
        <section className=" lg:w-[500px]">
          <Link href="/" className="flex w-fit items-center space-x-2">
            <span className="text-2xl font-semibold">{siteConfig.title}</span>
            <span className="sr-only">Home</span>
          </Link>
        </section>
        <section className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-3">
          {siteConfig.footerNav.map((item) => (
            <div key={item.title} className="space-y-3">
              <h4 className="text-base font-medium">{item.title}</h4>
              <ul className="space-y-2.5">
                {item.items.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link?.external ? "_blank" : undefined}
                      rel={link?.external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </section>
    </Shell>
  );
};

export default Footer;

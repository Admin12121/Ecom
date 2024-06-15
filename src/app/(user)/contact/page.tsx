"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Input,
  Image,
  Textarea,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/Navbar/AcmeLogo";

const Category = () => {
  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}>
      <div className="w-full min-h-[100vh] h-full dark:bg-black justify-center items-center flex bg-white bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="absolute inset-0 w-full h-[120vh] bg-black flex items-center justify-center [mask-image:radial-gradient(800px_450px_at_top,transparent_50%,white)]"></div>
        <div className="absolute max-w-screen-xl px-4 mx-auto mt-8 sm:mt-12 sm:px-6 md:mt-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="text-sm font-semibold tracking-wide text-gray-500 uppercase sm:text-base lg:text-sm xl:text-base">
                Contact Us
              </div>
              <h2 className="mt-1 text-4xl font-extrabold leading-10 tracking-tight text-white sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                We Are Here for You
              </h2>
              <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Do you want to place a special custom order for a statue for
                your Vajrayana practice? Look no further. We are dedicated to
                ensuring you receive the perfect statue tailored to your needs.
              </p>
              <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Feel free to message us, and we will get back to you promptly.
                We are here to help and look forward to assisting you in finding
                the right statue.
              </p>
            </div>
            <div className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative justify-center  w-full lg:flex">
                <Card className="max-w-[600px] bg-content1/[0.6] backdrop-blur-[2px]">
                  <CardHeader className="flex gap-3">
                    <AcmeLogo/>
                    {/* <Image
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                      width={40}
                    /> */}
                    <div className="flex flex-col">
                      <p className="text-md">Contact Us</p>
                      {/* <p className="text-small text-default-500">nextui.org</p> */}
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-2 ">
                    <span className="flex gap-2">
                      <Input type="text" label="Name" />
                      <Input type="email" label="Email" />
                    </span>
                    <Textarea
                      label="Your Message"
                      classNames={{
                        input: "resize-y min-h-[150px] w-full",
                      }}
                    />
                  </CardBody>
                  <CardFooter>
                    <Button color="default">Send Message</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Category;

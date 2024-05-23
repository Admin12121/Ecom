"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import {Card, CardHeader, Input, CardBody, Checkbox,  CardFooter, Button, Link, Divider , Image} from "@nextui-org/react";
import { AcmeLogo } from "../components/Navbar/AcmeLogo";

const Signup = () => {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-[100vw] h-[100vh] relative">
        {/* <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
          />
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center [mask-image:radial-gradient(600px_350px_at_top,transparent_20%,white)]">
            <form action="" className="w-[40%] h-[50vh] relative">
            </form>
        </div>

      </div>
      <div className="wrapper absolute ">
        <Card className="min-w-[400px] p-2" >
            <CardHeader className="flex gap-3">
                <AcmeLogo/>
                <div className="flex flex-col">
                <p className="text-md">Ecom</p>
                {/* <p className="text-small text-denfault-500">nextui.org</p> */}
                </div>
            </CardHeader>
            <CardBody className="gap-5">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="f_name" label="First Name" />
                    <Input type="l_name" label="Last Name" />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="email" label="Email" />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="number" label="Phone" />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="password" label="Password" />
                    <Input type="password" label="Confirm Password" />
                </div>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Accept term and conditions
                  </Checkbox>
                  {/* <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link> */}
                </div>
            </CardBody>
            <CardFooter  className="flex flex-col gap-5">
                <Button color="secondary" className="w-full" >
                    Sign up
                </Button>  
                {/* <Divider className="my-4" />
                <Button color="default" className="w-full">
                  Google
                </Button>
                <Button color="default" className="w-full">
                  Facebook
                </Button> */}
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
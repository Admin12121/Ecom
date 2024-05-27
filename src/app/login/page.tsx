"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import { AcmeLogo } from "../components/Navbar/AcmeLogo";
import FormTab from "./Form";
import { ReactLenis, useLenis } from 'lenis/react'
const Signup = () => {

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-[100vw] h-[100vh] relative">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
            />
          <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center [mask-image:radial-gradient(600px_350px_at_top,transparent_20%,white)]"></div>
        </div>
        <div className="wrapper absolute ">
          <div className="flex flex-col w-full min-w-[480px] min-h-[550px] ">
            <FormTab/>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Signup;
// <Card className="min-w-[400px] p-2" >
//     <CardHeader className="flex gap-3">
//         <AcmeLogo/>
//         <div className="flex flex-col">
//         <p className="text-md">Ecom</p>
//         {/* <p className="text-small text-denfault-500">nextui.org</p> */}
//         </div>
//     </CardHeader>
//     <CardBody className="gap-5">
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <Input type="f_name" label="First Name" />
//             <Input type="l_name" label="Last Name" />
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <Input type="email" label="Email" />
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <Input type="number" label="Phone" />
//         </div>
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <Input type="password" label="Password" />
//             <Input type="password" label="Confirm Password" />
//         </div>
//         <div className="flex py-2 px-1 justify-between">
//           <Checkbox
//             classNames={{
//               label: "text-small",
//             }}
//           >
//             Accept term and conditions
//           </Checkbox>
//           {/* <Link color="primary" href="#" size="sm">
//             Forgot password?
//           </Link> */}
//         </div>
//     </CardBody>
//     <CardFooter  className="flex flex-col gap-5">
//         <Button color="secondary" className="w-full" >
//             Sign up
//         </Button>
//         {/* <Divider className="my-4" />
//         <Button color="default" className="w-full">
//           Google
//         </Button>
//         <Button color="default" className="w-full">
//           Facebook
//         </Button> */}
//     </CardFooter>
// </Card>

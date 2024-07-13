"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import { ReactLenis, useLenis } from 'lenis/react'
import dynamic from 'next/dynamic';

// Import FormTab component dynamically
const FormTab = dynamic(() => import('./Form'), { ssr: false });
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
          <div className="flex flex-col w-full min-w-[480px] min-h-[550px] max-sm:min-w-[400px]">
            <FormTab/>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Signup;

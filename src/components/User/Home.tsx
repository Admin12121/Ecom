"use client"
import dynamic from "next/dynamic";
// import { ReactLenis } from 'lenis/react'
import { useCart } from '@/context/CartState';
import {LocalSpinner} from "@/components/Skleton/Skleton";

const Login = dynamic(() => import("@/components/User/LoginModel/Login"), {ssr: false});
const HomePage = dynamic(() => import("@/components/Home/Home"),{
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      <LocalSpinner />
    </div>
  ),
  ssr: false,
});

export default function Home() {
  const { isOpen, onOpenChange } = useCart();
  return (
    <>
    {/* <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}> */}
        <HomePage/>
        <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    {/* </ReactLenis> */}
    </>
  );
}
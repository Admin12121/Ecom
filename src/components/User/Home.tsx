"use client"
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from 'lenis/react'
import { useCart } from '@/context/CartState';
import LocalSkeleton from "@/components/Skleton/Skleton";

const Login = dynamic(() => import("@/components/User/LoginModel/Login"), {ssr: false});
const HomePage = dynamic(() => import("@/components/Home/Home"),{
  loading: () => (
    <div className="w-[100vw] h-[100vh] p-5 flex flex-col items-center justify-center gap-3">
      <LocalSkeleton className="rounded-lg w-full h-[70vh] w-full rounded-xl bg-default-300">
      </LocalSkeleton>
      <div className="w-full flex gap-3">
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-200"></LocalSkeleton>
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-200"></LocalSkeleton>
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-300"></LocalSkeleton>
      </div>
    </div>
  ),
  ssr: false,
});

export default function Home() {
  const { isOpen, onOpenChange } = useCart();
  return (
    <>
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
        <HomePage/>
        <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    </ReactLenis>
    </>
  );
}
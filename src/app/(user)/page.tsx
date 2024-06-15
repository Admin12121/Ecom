"use client"
// import HomePage from "./Home/page";
import Curve from "@/components/Animation/Animation";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from 'lenis/react'
import { Login } from "@/components/Login/Login";
import { useCart } from '@/context/CartState';
const HomePage = dynamic(() => import("./Home/page"), {
  ssr: false,  // Disable server-side rendering
});
export default function Home() {
  const { isOpen, onOpenChange } = useCart();
  return (
    <>
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <Curve backgroundColor={"#000"}>
        <HomePage/>
        <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
      </Curve>
    </ReactLenis>
    </>
  );
}
"use client"
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from 'lenis/react'
import { useCart } from '@/context/CartState';

const Login = dynamic(() => import("@/components/User/Login/Login"), {ssr: false});
const HomePage = dynamic(() => import("@/components/Home/Home"), {ssr: false});

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
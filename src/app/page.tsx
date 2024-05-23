"use client"

import HomePage from "./Home/page";1
import { useEffect } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <HomePage/>
    </ReactLenis>
    </>
  );
}

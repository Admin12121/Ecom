"use client"
import HomePage from "./Home/page";
import { ReactLenis, useLenis } from 'lenis/react'


export default function Home() {

  return (
    <>
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <HomePage/>
    </ReactLenis>
    </>
  );
}
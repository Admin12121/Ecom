"use client"
// import HomePage from "./Home/page";
import Curve from "./components/Animation/page";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from 'lenis/react'
const HomePage = dynamic(() => import("./Home/page"), {
  ssr: false,  // Disable server-side rendering
});
export default function Home() {

  return (
    <>
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <Curve backgroundColor={"#000"}>
        <HomePage/>
      </Curve>
    </ReactLenis>
    </>
  );
}
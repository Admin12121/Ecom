"use client";
import { ReactLenis, useLenis } from "lenis/react";
import dynamic from 'next/dynamic'

const BentoGridSecondDemo = dynamic(() => import('./utils/profile'), { ssr: false })

const Settings = () => {
  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
          <span className="relative w-[75%] overflow-hidden  p-3">
            <BentoGridSecondDemo />
          </span>
      </ReactLenis>
    </>
  );
};

export default Settings;

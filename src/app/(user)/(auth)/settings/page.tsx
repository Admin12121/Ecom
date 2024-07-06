"use client";
import {
  Listbox,
  ListboxItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { ReactLenis, useLenis } from "lenis/react";
import { BentoGridSecondDemo } from "./utils/profile";

const Profile = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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

export default Profile;

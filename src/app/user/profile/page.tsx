"use client";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { ReactLenis, useLenis } from "lenis/react";
import { useRef, useState } from "react";
const Profile = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}
      >
        <section className="p-5 flex min-h-[100vh]">
          <span className="w-[25%]">
            <Accordion variant="splitted">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Manage Account"
              >
                <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem key="new">New file</ListboxItem>
                  <ListboxItem key="copy">Copy link</ListboxItem>
                  <ListboxItem key="edit">Edit file</ListboxItem>
                  <ListboxItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete file
                  </ListboxItem>
                </Listbox>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Accordion 2"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Accordion 3"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </span>
          <span
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[75%] overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8"
          >
            {/* <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
            }}
          /> */}
          </span>
        </section>
      </ReactLenis>
    </>
  );
};

export default Profile;

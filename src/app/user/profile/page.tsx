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
        <section className="p-5 flex min-h-[100vh]">
          <span className="w-[25%]">
            <Accordion variant="splitted">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Manage Account"
              >
                <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem key="new">My Profile</ListboxItem>
                  <ListboxItem key="copy">Address Book</ListboxItem>
                  <ListboxItem key="edit">My Payment Option</ListboxItem>
                </Listbox>
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="My Orders">
                <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem key="new">My Orders</ListboxItem>
                  <ListboxItem key="copy">My Cancellations</ListboxItem>
                </Listbox>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="My Reviews"
              >
                <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem key="new">My Reviews</ListboxItem>
                </Listbox>
              </AccordionItem>
            </Accordion>
          </span>
          <span className="relative w-[75%] overflow-hidden  p-3">
            <BentoGridSecondDemo />
          </span>
        </section>
      </ReactLenis>
    </>
  );
};

export default Profile;

"use client";
import {
  Listbox,
  ListboxItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function UserSidebar() {
  const router = useRouter();
  return (
    <>
      <span className="w-[25%]">
        <Accordion variant="splitted" defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Manage Account"
          >
            <Listbox aria-label="Actions" onAction={(key) => router.push(`/${key}`)}>
              <ListboxItem key="settings">Home</ListboxItem>
              <ListboxItem key="profile">My Profile</ListboxItem>
              <ListboxItem key="addresh">Address Book</ListboxItem>
              <ListboxItem key="payment-option">My Payment Option</ListboxItem>
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
            title="My Reviews and Wishlist"
          >
            <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
              <ListboxItem key="new">My Reviews</ListboxItem>
              <ListboxItem key="new">My Wishlist</ListboxItem>
            </Listbox>
          </AccordionItem>
        </Accordion>
      </span>
    </>
  );
}

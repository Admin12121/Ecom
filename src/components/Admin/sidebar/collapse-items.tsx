"use client";
import React, { useState } from "react";
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from 'next/link'

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[];
  href?: string[];
}

export const CollapseItems = ({ icon, items, title, href }: Props) => {

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12 flex gap-1 flex-col justify-end">
            {items.map((item, index) => (
               <Link key={index} href={href && href[index] ? href[index] : ""}>
                <span
                  key={index}
                  className="w-full flex h-[35px] rounded-md items-center pl-3 text-default-500 hover:text-default-900 hover:bg-default-100 transition-colors"
                >
                  {item}
                </span>
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

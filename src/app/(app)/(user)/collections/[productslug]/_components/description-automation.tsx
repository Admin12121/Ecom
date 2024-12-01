"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Ruler, Atom, ChevronDown  } from "lucide-react";

type ParsedContent = Record<string, string | Record<string, string>>;

const getIconForTitle = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("size") || lowerTitle.includes("weight")) {
    return <Ruler className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />;
  }
  if (lowerTitle.includes("composition") || lowerTitle.includes("component")) {
    return <Atom className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />;
  }
  return null;
};

type AccordionItemProps = {
  value: string;
  title: string;
  content: Record<string, string>;
};

const DesItems: React.FC<AccordionItemProps> = ({ value, title, content }) => (
  <AccordionItem
    key={Math.random()}
    value={value}
    className="rounded-lg shadow-none bg-white dark:bg-neutral-900 transition-all w-full"
  >
    <AccordionTrigger icon={<ChevronDown className="w-4 h-4 right-2 relative"/>} className="text-left hover:no-underline p-0 w-full lg:min-w-[450px] bg-white dark:bg-neutral-900/50 rounded-lg">
      <div className="flex w-full rounded-lg p-1 flex-col">
        <div className="w-full p-2 flex justify-between items-center rounded-lg">
          <h1 className="flex gap-1 items-center">
            {getIconForTitle(title)}
            {title}
          </h1>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent className="p-3">
      <div className="flex items-center justify-between w-full h-full">
        <span className="flex flex-col gap-1">
          {Object.keys(content).map((key) => (
            <h1 key={Math.random()}>{key}</h1>
          ))}
        </span>
        <span className="flex flex-col items-end gap-1">
          {Object.values(content).map((value, index) => (
            <p key={Math.random()}>{value}</p>
          ))}
        </span>
      </div>
    </AccordionContent>
  </AccordionItem>
);

export const renderUI = (data: ParsedContent) => {
  return (
    <div className="flex gap-1 flex-col">
      <Accordion type="single" collapsible className="space-y-1 w-full">
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === "string") {
            return (
              <div
                key={Math.random()}
                className="p-2 text-sm text-neutral-700 dark:text-neutral-400"
              >
                <h1>{value}</h1>
              </div>
            );
          } else if (typeof value === "object") {
            return (
              <DesItems
                key={Math.random()}
                value={key}
                title={key}
                content={value as Record<string, string>}
              />
            );
          }
          return null;
        })}
      </Accordion>
    </div>
  );
};

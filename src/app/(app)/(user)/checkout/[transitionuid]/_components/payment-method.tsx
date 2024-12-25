import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PaymentMethod = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    "item-0"
  );

  const items = [
    {
      title: "Esewa",
      content: (
        <div className="p-5 flex items-center gap-4 justify-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-270.8 371 102 52"
            className="w-[200px]"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"
            ></path>
            <circle cx="-255.5" cy="376.5" r="1.5" fill="currentColor"></circle>
            <circle cx="-250.5" cy="376.5" r="1.5" fill="currentColor"></circle>
            <circle cx="-245.5" cy="376.5" r="1.5" fill="currentColor"></circle>
          </svg>
          <div>
            <p className="text-center">
              After clicking "Pay with Esewa", you will be redirected to Esewa
              to complete your purchase securely.
            </p>
          </div>
        </div>
      ),
    },
    { title: "Credit / Debit Card", content: <div>PayPal Content</div> }
  ];

  const handleAccordionChange = (value: string) => {
    setSelectedValue(value === selectedValue ? undefined : value);
  };

  return (
    <RadioGroup value={selectedValue} onValueChange={handleAccordionChange}>
      <Accordion
        type="single"
        collapsible
        value={selectedValue}
        onValueChange={handleAccordionChange}
        className="w-full space-y-2"
      >
        {items.map((item, index) => {
          const value = `item-${index}`;
          return (
            <AccordionItem
              key={index}
              value={value}
              className="overflow-hidden border bg-background rounded-lg"
            >
              <AccordionTrigger
                icon={<></>}
                className="px-4 py-3 text-[15px] leading-6 hover:no-underline"
              >
                <span className="flex items-center gap-3">
                  <RadioGroupItem value={value} />
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="bg-neutral-100">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </RadioGroup>
  );
};

export default PaymentMethod;

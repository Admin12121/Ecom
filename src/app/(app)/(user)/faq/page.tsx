
import React from "react";
import FAQAccordion from "./_compoents";

export const dynamic = "force-static";

const FaQ = () => {
  return (
    <main className="pt-3 w-full px-5 lg:px-14 flex gap-3 flex-col pb-10 max-w-[95rem] items-center h-full min-h-[calc(100dvh_-_11dvh)]">
      <h1 className="text-start max-w-[50rem] mt-10 text-3xl w-full">
        How can we help you?
      </h1>
      <p className="text-lg max-w-[50rem] text-neutral-700 dark:text-neutral-300">
        We are looking forward to helping you out. Please choose the topic and
        check the most frequently asked questions about it. Below, you&apos;ll
        find answers to the questions we get most asked.
      </p>
      <FAQAccordion/>
    </main>
  );
};

export default FaQ;

import React from "react";
import TermsofConditionsAccordion from "./_components";

const Termsofservice = () => {
  return (
    <main className="pt-3 w-full px-5 lg:px-14 flex gap-3 flex-col pb-10 max-w-[95rem] items-center h-[calc(100dvh_-_11dvh)] overflow-y-auto">
      <h1 className="text-3xl">Terms of service</h1>
      <span className="text-start">
        <p className="text-lg max-w-[50rem] text-neutral-950 dark:text-neutral-300">
          Terms &amp; Conditions Nepal Heritage Handicraft{" "}
        </p>
        <p className="text-lg max-w-[50rem] text-neutral-700 dark:text-neutral-300">
          Please read these Terms &amp; Conditions (&quot;Terms &amp;
          Conditions&quot; or &quot;T&amp;C&quot;) carefully before using our
          online store available at nepalheritagehandicraft.com (the &quot;Site&quot;). If you
          do not agree with these Terms &amp; Conditions, please do not complete
          a purchase or engage in any other activity in our Site. By visiting
          our Site or completing a purchase, you agree to be bound by these
          Terms &amp; Conditions.
        </p>
      </span>
      <TermsofConditionsAccordion />
    </main>
  );
};

export default Termsofservice;

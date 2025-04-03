import React from "react";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const About = () => {
  return (
    <main className="pt-3 w-full px-5 lg:px-14 flex gap-3 flex-col pb-10 max-w-[95rem] items-center h-full min-h-[calc(100dvh_-_11dvh)]">
      <h1 className="text-[80px] mt-10">{siteConfig.title}</h1>
    </main>
  );
};

export default About;

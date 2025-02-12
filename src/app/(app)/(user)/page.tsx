import React from "react";
import dynamic from "next/dynamic";
import { readFileSync } from 'fs';
import path from 'path';
const LandingPage = dynamic(() => import("./_componets"));

async function getSiteConfig() {
  const filePath = path.join(process.cwd(), 'src/app/(app)/(user)/siteconfig.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}


const Page = async () => {
  const siteConfig = await getSiteConfig();
  return (
    <main className="h-full max-w-[95rem] w-full">
      <LandingPage siteConfig={siteConfig}/>
    </main>
  );
};

export default Page;

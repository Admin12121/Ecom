import React from "react";
import dynamic from "next/dynamic";
import { readFileSync } from 'fs';
import { cookies } from 'next/headers'
import path from 'path';

const LandingPage = dynamic(() => import("./_componets"));

async function getSiteConfig() {
  const filePath = path.join(process.cwd(), 'src/app/(app)/(user)/siteconfig.json');
  return JSON.parse(readFileSync(filePath, 'utf8'));
}


const Page = async () => {
  const siteConfig = await getSiteConfig();
  const cookieStore = await cookies();
  const animationCookie = cookieStore.get('showAnimation');
  const userCookie = animationCookie?.value === "false";

  return (
    <main className="h-full max-w-[95rem] w-full">
      <LandingPage siteConfig={siteConfig} userCookie={userCookie}/>
    </main>
  );
};

export default Page;

import React from "react";
import dynamic from "next/dynamic";
import { readFileSync } from 'fs';
import path from 'path';
const LandingPage = dynamic(() => import("./_componets"));

// async function getSiteConfig() {
//   const filePath = path.join(process.cwd(), 'src/app/(app)/(user)/siteconfig.json');
//   const fileContents = readFileSync(filePath, 'utf8');
//   return JSON.parse(fileContents);
// }


const Page = async () => {
  const siteConfig = siteData;
  // const siteConfig = await getSiteConfig();
  return (
    <main className="h-full max-w-[95rem] w-full">
      {/* <LandingPage siteConfig={siteConfig}/> */}
    </main>
  );
};

export default Page;


const siteData = {
  "slider": [
    {
      "image": "https://i.pinimg.com/736x/57/7f/8a/577f8ae0cc1a6c225129c86a5d9b5cdd.jpg",
      "href": ""
    },
    {
      "image": "https://i.pinimg.com/736x/24/1e/52/241e521caa67fb5ec8a2a269f9030e39.jpg",
      "href": ""
    },
    {
      "image": "https://i.pinimg.com/736x/3c/33/0f/3c330f9be98c050e9521b30d0a688d4d.jpg",
      "href": ""
    },
    {
      "image": "https://i.pinimg.com/736x/62/14/9e/62149eedf853b28b6d8802c61602984c.jpg",
      "href": ""
    }
  ],
  "events": [
    {
      "title": "Winter Sale",
      "description": "30% off on all winter items",
      "color": ""
    },
    {
      "title": "Free Delivery",
      "description": "Get free delivery on all orders",
      "color": ""
    }
  ],
  "messages": {
    "message": "",
    "date": ""
  }
}
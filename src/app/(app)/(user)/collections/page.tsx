import React from "react";
import dynamic from "next/dynamic";
import { readFileSync } from 'fs';
import path from 'path';

const Products = dynamic(() => import("./_components"));

async function getSiteConfig() {
  const filePath = path.join(process.cwd(), 'src/app/(app)/(user)/siteconfig.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Page() {
  const siteConfig = await getSiteConfig();        
  return <Products siteConfig={siteConfig.filters}/>;
}

import React from "react";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("./_components"));

export default async function Page() {
  return <Products />;
}

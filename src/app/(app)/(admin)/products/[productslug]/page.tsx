import React from "react";
import dynamic from "next/dynamic";

const ProductObject = dynamic(() => import("./_components"));

export default async function Page({
  params,
}: {
  params: Promise<{ productslug: string }>;
}) {
  const slug = (await params).productslug;
  return <ProductObject productslug={slug}/>;
}

import React from "react";
import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("./_components"));

export default async function Page({
  params,
}: {
  params: Promise<{ transitionuid: string }>;
}) {
  const uid = (await params).transitionuid;
  return <Checkout params={uid} />;
}

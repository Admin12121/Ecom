import React from "react";
import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("./_components"));

export default function Page({
  params,
}: {
  params: { transitionuid: string };
}) {
  return <Checkout params={params} />;
}

import React from "react";
import OrderRetrieve from "./_components";

export default async function Page({
  params,
}: {
  params: Promise<{ transitionuid: string }>;
}) {
  const transactionuid = (await params).transitionuid;
  return <OrderRetrieve transactionuid={transactionuid} />;
}

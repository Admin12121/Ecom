import React from "react";
import dynamic from "next/dynamic";
import LocalSkeleton from "@/components/Skleton/Skleton";

const Home = dynamic(() => import("@/components/User/Home"), {
  loading: () => (
    <div className="w-[100vw] h-[100vh] p-5 flex flex-col items-center justify-center gap-3">
      <LocalSkeleton className="w-full h-[70vh] rounded-xl bg-default-300">
      </LocalSkeleton>
      <div className="w-full flex gap-3">
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-200"></LocalSkeleton>
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-200"></LocalSkeleton>
        <LocalSkeleton className="h-52 w-[35%] rounded-lg bg-default-300"></LocalSkeleton>
      </div>
    </div>
  ),
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}

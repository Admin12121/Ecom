import React from 'react';
import dynamic from 'next/dynamic'
import {LocalSpinner} from "@/components/Skleton/Skleton";

const Checkout = dynamic(() => import('./_components/Checkout'), { loading: () => (
  <div className="w-screen h-screen p-5 flex items-center justify-center">
    <LocalSpinner/>
  </div>
), ssr: false })

export default function Page({params}:{params:{transitionuid:string}}) {
  return (
    <Checkout params={params}/>
  );
}

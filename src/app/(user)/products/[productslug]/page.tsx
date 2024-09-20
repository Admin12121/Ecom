import React from 'react';
import dynamic from 'next/dynamic'
import {LocalSpinner} from "@/components/Skleton/Skleton";

const Product_Slug = dynamic(() => import('@/components/User/Products/Product_Slug'), { loading: () => (
  <div className="w-screen h-screen p-5 flex items-center justify-center">
    <LocalSpinner/>
  </div>
), ssr: false })

export default function Page() {
  return (
    <Product_Slug />
  );
}

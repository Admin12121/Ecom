import React from 'react';
import dynamic from 'next/dynamic'
import LocalSkeleton from "@/components/Skleton/Skleton";

const Product_Slug = dynamic(() => import('@/components/User/Products/Product_Slug'), { loading: () => (
  <div className="w-[100vw] h-[100vh] p-5 flex items-center justify-center gap-3">
    <LocalSkeleton className="w-[70%] h-full rounded-xl bg-default-300"></LocalSkeleton>    
    <LocalSkeleton className="w-[30%] h-full rounded-xl bg-default-300"></LocalSkeleton>    
  </div>
), ssr: false })

export default function Page() {
  return (
    <Product_Slug />
  );
}

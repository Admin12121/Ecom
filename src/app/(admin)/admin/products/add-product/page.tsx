import React from 'react';
import dynamic from 'next/dynamic'

const AddProduct = dynamic(() => import('@/components/Admin/products/add-product/AddProduct'), { ssr: false })

const Page = () => {
   return <AddProduct />;
};

export default Page;

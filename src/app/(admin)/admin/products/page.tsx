import React from 'react';
import dynamic from 'next/dynamic'

const Product = dynamic(() => import('@/components/Admin/products/Product'), { ssr: false })

const Page = () => {
   return <Product />;
};

export default Page;

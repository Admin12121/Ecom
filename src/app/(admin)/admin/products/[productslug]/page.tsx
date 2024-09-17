import React from 'react';
import dynamic from 'next/dynamic'

const UpdateProduct = dynamic(() => import('@/components/Admin/products/update-product/dataHandler'), { ssr: false })

const Page = async ({params}:{params:{productslug:string}}) => {
   return <UpdateProduct productslug={params.productslug} />;
};

export default Page;

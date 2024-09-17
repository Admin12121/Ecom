"use client"
import React from 'react';
import dynamic from 'next/dynamic'

import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { Spinner } from '@nextui-org/react';

const UpdateProduct = dynamic(() => import('@/components/Admin/products/update-product/updateProduct'), { ssr: false })

const DataHandler = ({ productslug }: { productslug: string }) => {
  const { data , isLoading } = useProductsViewQuery({ productslug }, { skip: !productslug });
  return (
    <>
      {isLoading ? 
       <div className='w-full h-full flex items-center justify-center'>
            <Spinner/>
       </div>
      : <UpdateProduct productData={data} />}
    </>
  );
};

export default DataHandler;

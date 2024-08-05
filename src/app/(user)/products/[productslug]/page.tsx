import React from 'react';
import dynamic from 'next/dynamic'

const Product_Slug = dynamic(() => import('@/components/User/Products/Product_Slug'), { ssr: false })

export default function Page() {
  return (
    <Product_Slug />
  );
}

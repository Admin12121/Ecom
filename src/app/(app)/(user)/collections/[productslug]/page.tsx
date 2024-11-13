import React from 'react';
import dynamic from 'next/dynamic'

const Product_Slug = dynamic(() => import('./_components'))

export default function Page() {
  return (
    <Product_Slug />
  );
}

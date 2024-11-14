import React from 'react';
import dynamic from 'next/dynamic'

const ProductObject = dynamic(() => import('./_components'))

export default function Page() {
  return (
    <ProductObject />
  );
}
